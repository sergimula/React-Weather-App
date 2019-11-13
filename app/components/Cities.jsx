import React from 'react';
import * as Constants from '../constants/';
import axios from 'axios';
import { CityList, City, CityTitle, CityWeather } from "../styles/custom.js";
import ForecastService from "../services/ForecastService.js";

class Cities extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      load: false,
      cities: []
    };
  }

  async componentDidMount() {
    await this.setStateAsync({
      load: true,
      cities: await ForecastService.getCitiesWeather()
    })
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    return (
      <CityList>
      {this.state.load ? (
        this.state.cities.length > 0 ? (
          this.state.cities.map((city) => {
            return (
              <City key={city.name}>
                <CityTitle>{city.name}</CityTitle>
                <CityWeather>
                  <img src={"http://openweathermap.org/img/wn/"+city.weather.icon+"@2x.png"} alt={city.weather.main}/>
                  <h3>{city.weather.main}</h3>
                  <p>{city.weather.description}</p>
                </CityWeather>
              </City>
            )
          }, this)
        ) : (
          <h1>Can't load city weather</h1>
        )
        ) : (
          <h2>Loading weather...</h2>
        )
      }
      </CityList>
    )
  }
}

export default Cities;
