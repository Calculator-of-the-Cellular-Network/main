export const uk = {
  title: 'Калькулятор базових параметрів Стільникової Мережі',
  hover: 'Розроблено в рамках теми магістерської роботи Гавриш В.А. УЖНУ',
  inputs: {
    frequencyMin: 'Мін. F (МГц)',
    frequencyMax: 'Макс. F (МГц)',
    channelWidth: 'Ширина каналу (МГц)',
    networkType: 'Тип мережі',
    subscribers: 'Кількість абонентів',
    activity: 'Активність абонента (Ерл)',
    blockingProbability: 'Ймовірність блокування',
    protectionRatio: 'Захисне відношення (дБ)',
    deteriorationTime: 'Час погіршення (%)',
    coverageArea: 'Площа покриття (км²)',
    sensitivity: 'Чутливість МС (дБм)',
    bsGain: 'Підсилення антени БС (дБ)',
    bsHeight: 'Висота БС (м)'
  },
  tooltips: {
    frequencyMin: 'Нижня межа смуги частот, виділеної для користування',
    frequencyMax: 'Верхня межа смуги частот, виділеної для користування',
    channelWidth: 'Смуга частот виділена на один канал',
    networkType: 'na – число абонентів, що одночасно займають один канал (для аналогових систем = 1, для систем другого покоління і вище = 8)',
    subscribers: 'Кількість абонентів що має обслуговуватися мережею',
    activity: 'Активність одного абонента в годину найбільшого навантаження',
    blockingProbability: 'Припустима імовірність блокування виклику',
    protectionRatio: 'Необхідне захисне відношення для приймачів ММЗ',
    deteriorationTime: 'Відсоток часу протягом якого допускається погіршення захисного відношення сигнал/шум',
    coverageArea: 'Площа що повинна бути покрита ММЗ',
    sensitivity: 'Чутливість у дБ·Вт приймача МС',
    bsGain: 'Коефіцієнт підсилення антени БС',
    bsHeight: 'Пропонована висота розміщення антен базової станції'
  },
  results: {
    title: 'Результати розрахунків',
    clusterSize: 'Оптимальна розмірність кластера',
    sectors: 'Секторів в стільнику',
    baseStations: 'Необхідна кількість БС',
    radius: 'Радіус БС',
    transmitterPower: 'Потужність передавача БС',
    units: {
      radius: 'км',
      power: {
        dbw: 'дБ·Вт',
        watts: 'Вт'
      }
    }
  },
  schematic: {
    title: 'Схема базової станції',
    scale: 'Масштаб: 1 клітинка = 1 км',
    coverage: 'Радіус покриття',
    stations: 'Базові станції'
  },
  buttons: {
    calculate: 'Розрахувати параметри',
    downloadAlgorithm: 'Завантажити опис алгоритму'
  },
  errors: {
    frequency: 'Неправильний діапазон частот. Максимальна частота має бути більшою за мінімальну',
    channelWidth: 'Завелика ширина каналу для заданого діапазону частот',
    calculation: 'Помилка розрахунку',
    negativeRoot: 'Під коренем опинилося від\'ємне число. Спробуйте збільшити значення ймовірності блокування виклику чи час погіршення'
  },
  downloads: {
    algorithmUrl: '/algorithm-uk.pdf'
  }
};