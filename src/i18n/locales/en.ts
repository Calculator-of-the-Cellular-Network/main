export const en = {
  title: 'Calculator of basic parameters of the Cellular Network',
  hover: 'Developed as part of the Master\'s thesis topic by Havrysh V.A., Uzhhorod National University',
  inputs: {
    frequencyMin: 'Min F (MHz)',
    frequencyMax: 'Max F (MHz)',
    channelWidth: 'Channel Width (MHz)',
    networkType: 'Network Type',
    subscribers: 'Number of Subscribers',
    activity: 'Subscriber Activity (Erl)',
    blockingProbability: 'Blocking Probability',
    protectionRatio: 'Protection Ratio (dB)',
    deteriorationTime: 'Deterioration Time (%)',
    coverageArea: 'Coverage Area (km²)',
    sensitivity: 'MS Sensitivity (dBm)',
    bsGain: 'BS Antenna Gain (dB)',
    bsHeight: 'BS Height (m)'
  },
  tooltips: {
    frequencyMin: 'Lower bound of the frequency band allocated for use',
    frequencyMax: 'Upper bound of the frequency band allocated for use',
    channelWidth: 'Frequency band allocated per channel',
    networkType: 'Number of subscribers simultaneously occupying one channel (1 for analog systems, 8 or more for second generation and above)',
    subscribers: 'Number of subscribers to be served by the network',
    activity: 'Activity of one subscriber during the busiest hour',
    blockingProbability: 'Permissible call blocking probability',
    protectionRatio: 'Required protection ratio for MMZ receivers',
    deteriorationTime: 'Percentage of time during which deterioration of the signal-to-noise protection ratio is allowed',
    coverageArea: 'Area to be covered by MMZ',
    sensitivity: 'Sensitivity in dB·W of the MS receiver',
    bsGain: 'BS antenna gain coefficient',
    bsHeight: 'hbs – proposed height of base station antennas'
  },
  results: {
    title: 'Calculation Results',
    clusterSize: 'Optimal Cluster Size',
    sectors: 'Sectors per Cell',
    baseStations: 'Required Base Stations',
    radius: 'BS Radius',
    transmitterPower: 'BS Transmitter Power',
    units: {
      radius: 'km',
      power: {
        dbw: 'dB·W',
        watts: 'W'
      }
    }
  },
  schematic: {
    title: 'Base station Schematic',
    scale: 'Scale: 1 grid = 1 km',
    coverage: 'Coverage Radius',
    stations: 'Base Stations'
  },
  buttons: {
    calculate: 'Calculate Parameters',
    downloadAlgorithm: 'Download Algorithm Description'
  },
  errors: {
    frequency: 'Invalid frequency range. Maximum frequency must be greater than minimum',
    channelWidth: 'Channel width too large for given frequency range',
    calculation: 'Calculation error occurred',
    negativeRoot: 'Negative value under square root. Try increase the blocking probability value or deterioration time'
  },
  downloads: {
    algorithmUrl: './algorithm-en.pdf'
  }
};
