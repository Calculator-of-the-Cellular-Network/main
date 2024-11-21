import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  step?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  tooltip?: string;
}

export function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  step,
  placeholder,
  min,
  max,
  tooltip
}: InputProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="form-control relative">
      <div className="flex items-center gap-2 mb-1">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {tooltip && (
          <button
            ref={buttonRef}
            type="button"
            className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
            onClick={() => setShowTooltip(!showTooltip)}
            aria-label="Show help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        placeholder={placeholder}
        min={min}
        max={max}
        className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-3"
      />
      {tooltip && showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute left-0 top-full mt-1 w-64 bg-gray-900 text-gray-300 text-xs rounded-md p-2 shadow-lg border border-gray-700 z-10"
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}