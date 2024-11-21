import React, { useState } from 'react';
import { calculateParameters } from '../utils/calculations';
import { Input } from './Input';
import { Results } from './Results';
import { NetworkSchematic } from './NetworkSchematic';
import { useTranslation } from 'react-i18next';
import { FileDown } from 'lucide-react';

interface FormData {
  frequencyMin: number;
  frequencyMax: number;
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

export function Calculator() {
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    frequencyMin: 880,
    frequencyMax: 915,
    channelWidth: 0.1,
    networkType: 'LTE',
    subscribers: 25000,
    activity: 0.025,
    blockingProbability: 0.1,
    protectionRatio: 9,
    deteriorationTime: 10,
    coverageArea: 10,
    sensitivity: -90,
    bsGain: 2,
    bsHeight: 30
  });

  const [results, setResults] = useState<null | ReturnType<typeof calculateParameters>>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'networkType' ? value : Number(value) || 0
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const calculatedResults = calculateParameters({
        ...formData,
        frequencyRange: `${formData.frequencyMin}-${formData.frequencyMax}`
      });
      setResults(calculatedResults);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message.startsWith('errors.') ? t(err.message) : err.message;
        setError(errorMessage);
      } else {
        setError(t('errors.calculation'));
      }
      setResults(null);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = t('downloads.algorithmUrl');
    link.download = i18n.language === 'uk' ? 'algorithm-uk.pdf' : 'algorithm-en.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('inputs.frequencyMin')}
                  name="frequencyMin"
                  type="number"
                  value={formData.frequencyMin}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  tooltip={t('tooltips.frequencyMin')}
                />
                <Input
                  label={t('inputs.frequencyMax')}
                  name="frequencyMax"
                  type="number"
                  value={formData.frequencyMax}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  tooltip={t('tooltips.frequencyMax')}
                />
              </div>
            </div>
            
            <Input
              label={t('inputs.channelWidth')}
              name="channelWidth"
              type="number"
              value={formData.channelWidth}
              onChange={handleChange}
              min="0"
              step="0.1"
              tooltip={t('tooltips.channelWidth')}
            />
            
            <div className="form-control">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {t('inputs.networkType')}
              </label>
              <select
                name="networkType"
                value={formData.networkType}
                onChange={handleChange}
                className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10"
              >
                <option value="LTE">LTE</option>
                <option value="VMT">VMT</option>
              </select>
            </div>

            <Input
              label={t('inputs.subscribers')}
              name="subscribers"
              type="number"
              value={formData.subscribers}
              onChange={handleChange}
              min="0"
              tooltip={t('tooltips.subscribers')}
            />
            
            <Input
              label={t('inputs.activity')}
              name="activity"
              type="number"
              value={formData.activity}
              onChange={handleChange}
              step="0.001"
              tooltip={t('tooltips.activity')}
            />
            
            <Input
              label={t('inputs.blockingProbability')}
              name="blockingProbability"
              type="number"
              value={formData.blockingProbability}
              onChange={handleChange}
              step="0.01"
              tooltip={t('tooltips.blockingProbability')}
            />
            
            <Input
              label={t('inputs.protectionRatio')}
              name="protectionRatio"
              type="number"
              value={formData.protectionRatio}
              onChange={handleChange}
              min="0"
              tooltip={t('tooltips.protectionRatio')}
            />
            
            <Input
              label={t('inputs.deteriorationTime')}
              name="deteriorationTime"
              type="number"
              value={formData.deteriorationTime}
              onChange={handleChange}
              min="0"
              max="100"
              tooltip={t('tooltips.deteriorationTime')}
            />
            
            <Input
              label={t('inputs.coverageArea')}
              name="coverageArea"
              type="number"
              value={formData.coverageArea}
              onChange={handleChange}
              tooltip={t('tooltips.coverageArea')}
            />
            
            <Input
              label={t('inputs.sensitivity')}
              name="sensitivity"
              type="number"
              value={formData.sensitivity}
              onChange={handleChange}
              tooltip={t('tooltips.sensitivity')}
            />
            
            <Input
              label={t('inputs.bsGain')}
              name="bsGain"
              type="number"
              value={formData.bsGain}
              onChange={handleChange}
              tooltip={t('tooltips.bsGain')}
            />
            
            <Input
              label={t('inputs.bsHeight')}
              name="bsHeight"
              type="number"
              value={formData.bsHeight}
              onChange={handleChange}
              min="0"
              tooltip={t('tooltips.bsHeight')}
            />
          </div>

          {error && (
            <div className="text-red-400 bg-red-900/50 p-3 sm:p-4 rounded-md border border-red-700 text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors text-sm sm:text-base"
            >
              {t('buttons.calculate')}
            </button>
          </div>
        </form>
      </div>

      {results && (
        <>
          <Results results={results} />
          <NetworkSchematic results={results} />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              <FileDown className="w-4 h-4" />
              {t('buttons.downloadAlgorithm')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}