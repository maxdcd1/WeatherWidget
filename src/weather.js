import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
  mode: "&units=metric",
  lang: "&lang=pl",
};

export default class WeatherWidget extends React.Component {
  static propTypes = {
    city: PropTypes.string,
    api: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      city: props.city,
      weather: {},
      temperatureOffset: 0
    };
  }

  componentDidMount() {
    this.updateWeatherData();
    this.interval = setInterval(() => this.updateWeatherData(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateWeatherData() {
    const apiUrl = `${api.base}weather?q=${this.state.city}&APPID=${api.key}${api.mode}${api.lang}`;
    this.state.temperatureOffset = Math.random();
    axios.get(apiUrl).then((res) => {
      const weather = res.data;
      this.setState({
        weather: weather,
      });
      console.log(`temperature offset ${this.state.temperatureOffset} for city ${this.state.city}`)
      console.log("fetched data");
    });

    //noApi debug
    /*
    this.setState({ weather: {
      coord:{lon:13.4105,lat:52.5244},
      weather:[{id:800,main:"Clear",description:"clear sky",icon:"01n"}],
      base:"stations",
      main:{temp:21.4,feels_like:290.93,temp_min:288.69,temp_max:293.7,pressure:1009,
        humidity:63},
      visibility:10000,wind:{speed:2.68,deg:225,gust:2.68},
      clouds:{all:0},
      dt:1654632960,
      sys:{
        type:2,id:2011538,country:"DE",sunrise:1654569935,sunset:1654629904
      },
      timezone:7200,id:2950159,name:this.state.city,cod:200
      }
    }
    );
    */
  }

  openWeatherLink(cityId) {
    window.open(`https://openweathermap.org/city/${cityId}`); 
  }

  render() {
    return (
      <div className="mainDiv">
        {typeof this.state.weather.main != "undefined" ? (
          <div className="outside-link" onClick={() => this.openWeatherLink(this.state.weather.id)}>
            <div className="location-box">
              <div className="location">
                {this.state.weather.name}, {this.state.weather.sys.country}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {/*Math.round*/(this.state.weather.main.temp + this.state.temperatureOffset).toFixed(1)}°c
              </div>
              <div className="weather">
                {this.state.weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
