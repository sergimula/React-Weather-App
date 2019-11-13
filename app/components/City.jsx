import React from 'react';
import ForecastService from "../services/ForecastService.js";
import { CityDetail, DetailCityTitle, CityWeather } from "../styles/custom.js";

class City extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      load: false,
      cityWeatherData: null,
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    await this.setStateAsync({
      load: true,
      cityWeatherData: await ForecastService.getCityWeather(params.name),
    });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    return (
      <CityDetail>
        {this.state.load ? (
          this.state.cityWeatherData ? (
              <div key={this.state.cityWeatherData.name}>
                <DetailCityTitle>{this.state.cityWeatherData.name}</DetailCityTitle>
                <CityWeather>
                  <p>Actual temperature:
                  {Math.round(this.state.cityWeatherData.main.temp - 273.15)}ºC</p>
                  <p>Maximum temperature: 
                  {Math.round(this.state.cityWeatherData.main.temp_max - 273.15)}ºC</p>
                  <p>Minimum temperature:
                  {Math.round(this.state.cityWeatherData.main.temp_min - 273.15)}ºC</p>
                </CityWeather>
              </div>
          ) : (
            <h1>Can't load city weather</h1>
          )
          ) : (
            <h2>Loading weather...</h2>
          )
        }
      </CityDetail>
    );
  }
}

export default City;
