const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const axios = require('axios');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const app = express();

const subscriptions = new Set();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the Weather Forecast Bot! Type /subscribe to get weather updates or /unsubscribe to stop receiving updates.');
});

bot.onText(/\/subscribe/, (msg) => {
  const chatId = msg.chat.id;
  subscriptions.add(chatId);
  bot.sendMessage(chatId, 'You are now subscribed to weather updates. Please enter a location (city name) to get weather updates.');
});

bot.onText(/\/unsubscribe/, (msg) => {
  const chatId = msg.chat.id;
  subscriptions.delete(chatId);
  bot.sendMessage(chatId, 'You are unsubscribed from weather updates.');
});

bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const location = msg.text;

  if(subscriptions.has(chatId)) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`);
      const data = response.data;
      const weather = data.weather[0].description;
      const temperature = data.main.temp - 273.15;
      const city = data.name;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
      
      bot.sendMessage(chatId, message);
    } catch (error) {
      bot.sendMessage(chatId, "Oops! something went wrong, maybe the city you entered doesn't exist.");
    };
  };
});

app.listen(3001, () => {
  console.log(`Bot running on PORT: 3001`);
});
