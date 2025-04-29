# Игра "Найди пару"

Игра на тренировку памяти, в которой нужно находить пары одинаковых карточек.

## О проекте

Проект полностью разработан за 5 часов с использованием Cursor IDE и Claude 3.7 Sonnet.

### Функциональность

- Игровое поле размером 4x4 или 6x6
- Анимация переворачивания карточек
- Подсчет количества ходов и затраченного времени
- Сохранение результатов для зарегистрированных пользователей
- Адаптивный дизайн, работающий на мобильных устройствах

- ![image](https://github.com/user-attachments/assets/6f250d07-fd40-4d3a-a2df-a75f3bea1012)

![image](https://github.com/user-attachments/assets/f84490df-34c9-44e4-8044-63bce6f4b12e)

![image](https://github.com/user-attachments/assets/d94a59c8-523c-4632-a0c4-d4b9e81ba1d0)


### Технологии

#### Фронтенд
- React с TypeScript
- Tailwind CSS для стилизации
- Axios для HTTP-запросов

#### Бэкенд
- Node.js
- Express
- MongoDB для хранения данных
- JWT аутентификация

## Как играть

1. Выберите размер игрового поля (4x4 или 6x6)
2. Нажмите "Start Game"
3. Переворачивайте карточки, нажимая на них
4. Найдите все пары с минимальным количеством ходов и за минимальное время
5. Чтобы сохранить результат, необходимо авторизоваться

## Дальнейшие планы развития

- Добавление уровней сложности
- Таблица рекордов
- Расширенная статистика игрока
- Темная тема оформления

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/                # Source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── contexts/       # Context providers
│       ├── hooks/          # Custom hooks
│       ├── services/       # API service functions
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
│
├── server/                 # Backend Node.js/Express application
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
│
└── README.md               # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies for both client and server
3. Set up environment variables
4. Start the development servers

## Deployment

The application can be deployed to Render following the instructions in the deployment documentation.
