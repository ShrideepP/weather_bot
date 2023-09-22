# Weather Bot

## Project Overview

This project is a Telegram bot that allows users to subscribe to daily weather updates. Additionally, it features an admin panel with login functionality for managing bot settings, including API keys, and user accounts. Some additional features include dark/light mode, subscriber search, pagination, and secure JWT authentication for the admin login.

## Screenshots

![Screenshot 1](/screenshots/admin.png)
_Admin Panel of Weather Bot_

![Screenshot 2](/screenshots/chat.png)
_Chat with Weather Bot_

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
2. [Usage](#usage)
   - [Running the Bot](#running-the-bot)
   - [Admin Panel](#admin-panel)
3. [Features](#features)
4. [Dependencies](#dependencies)
5. [Contributing](#contributing)
6. [License](#license)

## Getting Started

### Prerequisites

Before running the Telegram bot, make sure you have the following installed:

- Node.js
- MongoDB
- OpenWeatherMap API Key (get it from [Official Website](https://openweathermap.org/))
- Telegram Bot Token (get it from [Telegram's BotFather](https://core.telegram.org/bots#botfather))

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/ShrideepP/weather_bot
   cd weather_bot
   ```

2. Install bot dependencies:

   ```bash
   cd bot
   npm install
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

### Configuration

1. Create a .env file in the bot directory and add your configuration settings:

   ```bash
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   OPEN_WEATHER_MAP_API_KEY=your-open-weather-map-api-key
   ```

2. Create a .env file in the server directory and add your configuration settings:

   ```bash
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

3. Create a .env file in the client directory and add your configuration settings:

   ```bash
   VITE_BASE_URL=your-server-uri
   ```

### Usage

#### Running the bot

To start the Telegram bot, run the following command in the bot directory:

```bash
cd bot
npm run dev
```

#### Run the server

To start the Telegram bot, run the following command in the bot directory:

```bash
cd server
npm run dev
```

#### Run the client

To start the Telegram bot, run the following command in the bot directory:

```bash
cd client
npm run dev
```

## Features

- User subscription for daily weather updates
- Admin panel with the following capabilities:
  - Managing bot settings (API keys, etc.)
  - Managing user accounts (blocking, deleting, etc.)
  - Dark and light mode
  - Subscriber search
  - Pagination for subscriber management
  - Secure JWT authentication for admin login

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name.
3. Make your changes and commit them: git commit -m 'Add your feature'.
4. Push your changes to your fork: git push origin feature/your-feature-name.
5. Open a pull request to the main branch of the original repository.

## License

This project is not licensed and is provided for demonstration and educational purposes only. You do not have permission to use, modify, or distribute this code for any other purposes.
