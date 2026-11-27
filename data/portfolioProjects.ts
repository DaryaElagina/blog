import projectProfiles from './projectProfiles'

const portfolioProjects = [
  ...projectProfiles.map(({ id, title, summary }) => ({ id, title, description: summary })),
  {
    id: 'hackathons',
    title: 'Хакатоны',
    description:
      'Пять лет участия с командой в «Лидерах цифровой трансформации»: задачи, опыт и результаты.',
  },
  {
    id: 'guides',
    title: 'Практические руководства',
    description: 'Заметки и будущие пошаговые материалы о работе с данными и создании дашбордов.',
  },
]

export default portfolioProjects
