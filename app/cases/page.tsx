import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Кейсы',
  description: 'Будущие аналитические кейсы Дарьи Елагиной: SQL, BI и Data Quality.',
})

const plannedCases = [
  [
    'Data Quality',
    'Очистка и нормализация денежных значений',
    'Проверка форматов, обработка пропусков и подготовка текстовых значений к аналитике.',
  ],
  [
    'Аналитическое расследование',
    'Почему показатели в BI и источнике не сходятся',
    'Путь от дашборда через датасет и SQL к ошибке в JOIN, агрегации или исходных данных.',
  ],
  [
    'SQL',
    'Дедупликация и контроль качества данных',
    'Поиск повторов, выбор актуальной записи и прозрачные проверки результата.',
  ],
  [
    'BI / DataLens',
    'Проектирование аналитического дашборда',
    'Выбор KPI, структура представления и интерактивные фильтры для многоэтапного процесса.',
  ],
  [
    'SQL',
    'Расчёт SLA с помощью оконных функций',
    'Восстановление последовательности событий и расчёт длительности этапов процесса.',
  ],
  [
    'Data Quality',
    'Расследование ошибок JOIN и агрегации',
    'Как обнаружить размножение строк и локализовать причину искажения метрики.',
  ],
]

export default function CasesPage() {
  return (
    <div className="py-10 sm:py-16">
      <header className="mb-12 max-w-3xl space-y-4">
        <p className="text-primary-600 dark:text-primary-400 font-mono text-sm font-semibold tracking-widest uppercase">
          В разработке
        </p>
        <h1 className="font-pixel-grid text-4xl font-bold tracking-tight sm:text-5xl">Кейсы</h1>
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
          Здесь будут появляться обезличенные примеры реальных аналитических задач. Коммерческие
          данные не публикуются, а учебные и синтетические примеры будут явно отмечены.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {plannedCases.map(([area, title, description]) => (
          <article
            key={title}
            className="rounded-xl border border-gray-200 p-6 dark:border-gray-700"
          >
            <p className="text-primary-600 dark:text-primary-400 mb-3 text-sm font-semibold">
              {area}
            </p>
            <h2 className="mb-3 text-xl font-semibold">{title}</h2>
            <p className="leading-7 text-gray-600 dark:text-gray-400">{description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
