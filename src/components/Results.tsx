import React from 'react';
import { useTranslation } from 'react-i18next';
import { dBWToWatts } from '../utils/calculations';

interface ResultsProps {
  results: {
    clusterSize: number;
    sectors: number;
    baseStations: number;
    radius: number;
    transmitterPower: number;
  };
}

export function Results({ results }: ResultsProps) {
  const { t } = useTranslation();

  const formatNumber = (value: number): string => {
    if (isNaN(value) || value === undefined) return '0';
    return value.toFixed(2);
  };

  const powerInWatts = dBWToWatts(results.transmitterPower);

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-xl border border-gray-700">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4">
        {t('results.title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gray-700 p-3 sm:p-4 rounded-md shadow border border-gray-600">
          <div className="text-xs sm:text-sm text-gray-400">{t('results.clusterSize')}</div>
          <div className="text-base sm:text-lg font-semibold text-gray-200">{parseInt(results.clusterSize)}</div>
        </div>
        
        <div className="bg-gray-700 p-3 sm:p-4 rounded-md shadow border border-gray-600">
          <div className="text-xs sm:text-sm text-gray-400">{t('results.sectors')}</div>
          <div className="text-base sm:text-lg font-semibold text-gray-200">{parseInt(results.sectors)}</div>
        </div>
        
        <div className="bg-gray-700 p-3 sm:p-4 rounded-md shadow border border-gray-600">
          <div className="text-xs sm:text-sm text-gray-400">{t('results.baseStations')}</div>
          <div className="text-base sm:text-lg font-semibold text-gray-200">{parseInt(results.baseStations)}</div>
        </div>
        
        <div className="bg-gray-700 p-3 sm:p-4 rounded-md shadow border border-gray-600">
          <div className="text-xs sm:text-sm text-gray-400">{t('results.radius')}</div>
          <div className="text-base sm:text-lg font-semibold text-gray-200">
            {formatNumber(results.radius)} {t('results.units.radius')}
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 sm:p-4 rounded-md shadow border border-gray-600 col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="text-xs sm:text-sm text-gray-400">{t('results.transmitterPower')}</div>
          <div className="text-base sm:text-lg font-semibold text-gray-200 flex items-baseline gap-2">
            <span>{formatNumber(results.transmitterPower)} {t('results.units.power.dbw')}</span>
            <span className="text-sm text-gray-400">{formatNumber(powerInWatts)} {t('results.units.power.watts')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}