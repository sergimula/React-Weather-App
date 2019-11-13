import * as Constants from '../constants/';
import axios from 'axios';

class ForecastService {
  static async getCitiesWeather() {
    let citiesForecastData = [];
    let citiesData = [];
    const citiesWeather = Constants.TARGETCITIES.map(async (city) => {
      if (this.getCityForecastData(city)) citiesForecastData.push(await this.getCityForecastData(city))
      if(citiesForecastData.length === Constants.TARGETCITIES.length) {
        return this.getNormalizedCities(citiesForecastData);
      }
    });
    //Await and get data from API
    if(await Promise.all(citiesWeather)) {
      const citiesWeatherData = await Promise.all(citiesWeather);
      if(citiesWeatherData.length > 0) {
        citiesWeatherData.map((data) => {
          if(data) citiesData = data;
        });
      }
    }
    return citiesData;
  }

  static async getCityForecastData(city) {
    try {
      let call = 'https://api.openweathermap.org/data/2.5/weather?lat=' + city.latitude + '&lon=' + city.longitude + '&appid=' + Constants.APIKEY;
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
}

export default ForecastService;
