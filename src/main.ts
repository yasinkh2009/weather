import { createApp } from 'vue';
import './styles/main.css';
import App from './App.vue';
import { weatherData, getWeatherData } from './lib/store/weather';

const app = createApp(App);
app.provide('weatherData', weatherData);
app.provide('getWeatherData', getWeatherData);

app.mount('#app');
