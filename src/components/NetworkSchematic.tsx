import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface NetworkSchematicProps {
  results: {
    clusterSize: number;
    sectors: number;
    baseStations: number;
    radius: number;
  };
}

export function NetworkSchematic({ results }: NetworkSchematicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useTranslation();

  // Функція зміни розміру канвасу
  const resizeCanvas = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Встановлюємо розміри канвасу відповідно до контейнера
    const containerWidth = container.clientWidth;
    const aspectRatio = 16 / 9;
    const height = containerWidth / aspectRatio;

    canvas.width = containerWidth;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawScene(ctx);
    }
  };

  // Функція малювання схеми
  const drawScene = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    
    // Очищаємо канвас темним фоном
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Розраховуємо центр канвасу
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Налаштовуємо сітку на основі радіусу БС
    const pixelsPerKm = Math.min(canvas.width, canvas.height) / (results.radius * 4);
    const gridSize = pixelsPerKm;

    // Малюємо сітку, вирівняну по центру гексагона
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;

    // Розраховуємо зміщення сітки від центру
    const offsetX = centerX % gridSize;
    const offsetY = centerY % gridSize;

    // Малюємо вертикальні лінії сітки
    for (let x = offsetX; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Малюємо горизонтальні лінії сітки
    for (let y = offsetY; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Розраховуємо розмір гексагона на основі радіусу БС
    const size = results.radius * pixelsPerKm;

    // Розраховуємо кути гексагона
    const corners = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6; // Поворот на -30 градусів для вирівнювання
      corners.push({
        x: centerX + size * Math.cos(angle),
        y: centerY + size * Math.sin(angle)
      });
    }

    // Малюємо гексагон
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < 6; i++) {
      ctx.lineTo(corners[i].x, corners[i].y);
    }
    ctx.closePath();
    
    ctx.fillStyle = '#1e3a8a';
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Малюємо коло радіусу покриття
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, 2 * Math.PI);
    ctx.strokeStyle = '#3b82f680';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Малюємо сектори, якщо потрібно
    if (results.sectors > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 0.8;

      if (results.sectors === 3) {
        for (let i = 0; i < 3; i++) {
          const angle = (2 * Math.PI * i) / 3 - Math.PI / 6;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + size * 0.8 * Math.cos(angle),
            centerY + size * 0.8 * Math.sin(angle)
          );
          ctx.stroke();
        }
      } else if (results.sectors === 6) {
        corners.forEach(corner => {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + (corner.x - centerX) * 0.8,
            centerY + (corner.y - centerY) * 0.8
          );
          ctx.stroke();
        });
      }
    }

    // Малюємо центральну точку (розташування БС)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#60a5fa';
    ctx.fill();

    // Додаємо інформацію про масштаб
    const fontSize = Math.max(12, canvas.width / 50);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'left';
    ctx.fillText(t('schematic.scale'), 10, canvas.height - fontSize);
    ctx.fillText(`${t('schematic.coverage')}: ${results.radius.toFixed(2)} km`, 10, canvas.height - fontSize * 2.5);
  };

  // Ефект для обробки зміни розміру вікна
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [results, t]);

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        {t('schematic.title')}
      </h2>
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="w-full border border-gray-700 rounded-lg"
        />
      </div>
    </div>
  );
}