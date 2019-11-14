import * as Constants from '../constants/';
import axios from 'axios';

class ForecastService {
  static async getCitiesWeather() {
    let citiesForecastData = [];
    let citiesData = [];
    const citiesWeather = Constants.TARGETCITIES.map(async (city) => {
      if (this.getCityForecastData(city)) citiesForecastData.push(await this.getCityForecastData(city))
      if (citiesForecastData.length === Constants.TARGETCITIES.length) {
        return this.getNormalizedCities(citiesForecastData);
      }
    });
    //Await and get data from API
    if (await Promise.all(citiesWeather)) {
      const citiesWeatherData = await Promise.all(citiesWeather);
      if (citiesWeatherData.length > 0) {
        citiesWeatherData.map((data) => {
          if (data) citiesData = data;
        });
      }
    }
    //Return ordered list by name
    return citiesData.sort((a, b) => a.name.localeCompare(b.name))
  }

  static async getCityWeather(cityName) {
    const city = Constants.TARGETCITIES.filter(city => city.name === cityName);
    return await this.getCityForecastData(city[0]);
  }

  static async getCityForecastData(city) {
    try {
      const apiurl = 'https://api.openweathermap.org/data/2.5/weather?';
      const call = apiurl + 'lat=' + city.latitude + '&lon=' + city.longitude + '&appid=' + Constants.APIKEY;
      const response = await axios.get(call);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static getNormalizedCities(citiesForecastData) {
    let cleanCitiesForecast = [];
    citiesForecastData.map((dataCity) => {
      if (dataCity.weather) {
        let cityObject = {
          name: dataCity.name,
          id: dataCity.id,
          weather: {
            main: "",
            description: "",
            icon: "10d"
          }
        };
        dataCity.weather.map((weather) => {
          cityObject.weather.main = weather.main;
          cityObject.weather.description = weather.description;
          cityObject.weather.icon = weather.icon;
        });
        cleanCitiesForecast.push(cityObject);
      }
    })
    return cleanCitiesForecast;
  }

  static getTemperatureAsCelsius(temp) {
    return Math.round(temp - 273.15);
  }
}

export default ForecastService;
