import { erf } from 'mathjs';

interface InputData {
  frequencyRange: string;
  channelWidth: number;
  networkType: string;
  subscribers: number;
  activity: number;
  blockingProbability: number;
  protectionRatio: number;
  deteriorationTime: number;
  coverageArea: number;
  sensitivity: number;
  bsGain: number;
  bsHeight: number;
}

interface Results {
  clusterSize: number;
  sectors: number;
  baseStations: number;
  radius: number;
  transmitterPower: number;
}

function dBWToWatts(dBW: number): number {
  return Math.pow(10, dBW / 10);
}

function calculateA(n0: number, P_block: number): number {
  if (P_block <= 2 / (Math.PI * n0)) {
    const innerTerm = Math.pow(P_block * Math.sqrt((Math.PI * n0) / 2), 1 / n0);
    if (innerTerm > 1) {
      throw new Error("errors.negativeRoot");
    }
    return n0 * (1 - Math.sqrt(1 - innerTerm));
  } else {
    const logTerm = P_block * Math.sqrt((Math.PI * n0) / 2);
    if (logTerm <= 0) {
      throw new Error("errors.negativeRoot");
    }
    return n0 + Math.sqrt(Math.PI / 2 + 2 * n0 * Math.log(logTerm)) - Math.sqrt(Math.PI / 2);
  }
}

function normalPDF(x: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

function integrate(func: (x: number) => number, start: number, end: number, step = 0.001): number {
  let area = 0;
  for (let x = start; x < Math.min(end, 10); x += step) {
    area += func(x) * step;
  }
  return area;
}

function survivalFunction(x1: number): number {
  const step = 0.008;
  const infinity = 10;
  return integrate(normalPDF, x1, infinity, step);
}

function klusterSize(M: number, N: number, alfa: number, P_safty: number, P_t: number): number {
  const K = N;
  const q = Math.sqrt(3 * K);
  const gama = 0.1 * Math.log(10);
  
  let beta_sum = 0;
  let a_e_2 = 0;
  let beta1 = 0, beta2 = 0, beta3 = 0, beta4 = 0, beta5 = 0, beta6 = 0;

  if (M === 1) {
    beta1 = Math.pow(q - 1, -4);
    beta2 = beta1;
    beta3 = Math.pow(q, -4);
    beta4 = beta3;
    beta5 = Math.pow(q + 1, -4);
    beta6 = beta5;
    beta_sum = beta1 + beta2 + beta3 + beta4 + beta5 + beta6;
    a_e_2 = (1 / Math.pow(gama, 2)) * Math.log(1 + (Math.exp(Math.pow(gama, 2) * Math.pow(alfa, 2)) - 1) * 
      ((Math.pow(beta1, 2) + Math.pow(beta2, 2) + Math.pow(beta3, 2) + Math.pow(beta4, 2) + Math.pow(beta5, 2) + Math.pow(beta6, 2)) / Math.pow(beta_sum, 2)));
  } else if (M === 3) {
    beta1 = Math.pow(q + 1, -4);
    beta2 = Math.pow(q, -4);
    beta_sum = beta1 + beta2;
    a_e_2 = (1 / Math.pow(gama, 2)) * Math.log(1 + (Math.exp(Math.pow(gama, 2) * Math.pow(alfa, 2)) - 1) * 
      ((Math.pow(beta1, 2) + Math.pow(beta2, 2)) / Math.pow(beta_sum, 2)));
  } else if (M === 6) {
    beta_sum = Math.pow(q + 1, -4);
    a_e_2 = (1 / Math.pow(gama, 2)) * Math.log(1 + (Math.exp(Math.pow(gama, 2) * Math.pow(alfa, 2)) - 1));
  }

  const beta_e = beta_sum * Math.exp((Math.pow(gama, 2) / 2) * (Math.pow(alfa, 2) - a_e_2));
  const a_p_2 = Math.pow(alfa, 2) + a_e_2;
  const a_p = Math.sqrt(a_p_2);
  const x1 = (10 * Math.log10(1 / beta_e) - P_safty) / a_p;

  const P_t_now = survivalFunction(x1);
  return P_t_now * 100;
}

export function calculateParameters(data: InputData): Results {
  try {
    const [fMin, fMax] = data.frequencyRange.split('-').map(Number);
    if (isNaN(fMin) || isNaN(fMax) || fMax <= fMin) {
      throw new Error('errors.frequency');
    }

    const alfa = 10;

    const nK = (fMax - fMin) / data.channelWidth;

    const possibleConfigs = [];
    [1, 3, 6].forEach(M => {
      [1, 3, 6].forEach(N => {
        const Pn = klusterSize(M, N, alfa, data.protectionRatio, data.deteriorationTime);
        possibleConfigs.push({ Pn, M, N });
      });
    });

    const closest = possibleConfigs.reduce((prev, curr) => 
      Math.abs(curr.Pn - data.deteriorationTime) < Math.abs(prev.Pn - data.deteriorationTime) ? curr : prev
    );

    const { M: sectors, N: clusterSize } = closest;

    const nS = Math.floor(nK / (sectors * clusterSize));
    if (nS === 0) {
      throw new Error('errors.channelWidth');
    }

    const nA = data.networkType === 'LTE' ? 8 : data.networkType === 'VMT' ? 1 : Number(data.networkType);

    const n0 = nA * nS;
    const A = calculateA(n0, data.blockingProbability);

    const nBS = Math.floor(A / data.activity);

    const baseStations = Math.ceil(data.subscribers / nBS);
    if (isNaN(baseStations)) {
      throw new Error("errors.negativeRoot");
    }
    const radius = parseFloat(Math.sqrt(data.coverageArea / (Math.PI * baseStations)).toFixed(2));

    const roundedFMin = Math.ceil(fMin / 100) * 100;
    const roundedFMax = Math.floor(fMax / 100) * 100;
    const fRound = Math.abs(fMin - roundedFMin) < Math.abs(fMax - roundedFMax) ? roundedFMin : roundedFMax;

    const transmitterPower = parseFloat(
      (data.sensitivity - data.bsGain + 70 + 26.16 * Math.log10(fRound) - 13.821 * Math.log10(data.bsHeight) + (45 - 6.55 * Math.log10(data.bsHeight)) * Math.log10(radius)).toFixed(2)
    );

    return {
      clusterSize,
      sectors,
      baseStations,
      radius,
      transmitterPower
    };
  } catch (error) {
    throw error;
  }
}

export { dBWToWatts };