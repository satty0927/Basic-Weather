import React from 'react';
import axios from 'axios';
import './App.css';
import sunny from './images/img1.jpg';
import rainy from './images/img2.jpg';
import cloudy from './images/img3.jpg';
import foggy from './images/img4.jpg';
import thunder from './images/img5.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: "block",
      inputValue: "",
      primaryTileDisplay: "none",
      weatherData: {
        city: "",
        country: "",
        feelsLike: "",
        humidity: "",
        temperature: "",
        sunrise: "",
        sunset: "",
        weatherMain: "",
        weatherDescription: "",
        windDegree: "",
        windSpeed: ""
      }
    }
    this.getLocation = this.getLocation.bind(this);
  }

  handleInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  async fetchWeather() {
    var headers = { "x-rapidapi-key": "3f1cea67aemshec2b28f4251d4fbp117755jsnf6e9fc5a48b6" };
    var url = `https://community-open-weather-map.p.rapidapi.com/weather?q=${this.state.inputValue}&units=metric`;
    await axios.get(url, { headers }).then((res) => {
      var resData = JSON.parse(JSON.stringify(res["data"]));
      console.log();
      this.setState({
        country: resData.sys.country,
        feelsLike: resData.main.feels_like,
        humidity: resData.main.humidity,
        temperature: resData.main.temp,
        city: resData.name,
        sunrise: new Date(resData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(resData.sys.sunset * 1000).toLocaleTimeString(),
        weatherMain: resData.weather[0].main,
        weatherDescription: resData.weather[0].description,
        windDegree: resData.wind.deg,
        windSpeed: resData.wind.speed
      });
    })
  }

  async getLocation() {
    console.log(this.state.inputValue);
    await this.fetchWeather();
    this.setState({ inputValue: "", modalDisplay: "none", primaryTileDisplay: "block" });
  }

  render() {
    var pointer;
    switch (this.state.weatherMain) {
      case "Clouds": pointer = `url(${cloudy})`;
        break;
      case "Rain": pointer = `url(${rainy})`;
        break;
      case "Haze": pointer = `url(${foggy})`;
        break;
      case "Clear": pointer = `url(${sunny})`;
        break;
      default: pointer = null;
    }
    document.body.style.backgroundImage = pointer;
    return (<div>
      <link
        href="https://fonts.googleapis.com/css?family=Courgette"
        rel="stylesheet"
        type="text/css"
      />
      <div id="modal" style={{ display: this.state.modalDisplay }}>
        <br />
        <span>Hi,</span>
        <p>Wanna know what the whether is today?</p>
        <input type="text" onChange={e => this.handleInput(e)} value={this.state.inputValue}></input><br />
        <button onClick={this.getLocation}> Let's do this! </button>
      </div>
      <div id="primaryTile" style={{ display: this.state.primaryTileDisplay }}>
        <span id="welcomeText"
        >Hey! Welcome to <b>{this.state.city}</b>, <b>{this.state.country}.</b></span
        ><br />
        <span>Today we can expect a {this.state.weatherDescription} {this.state.weatherMain} weather. And it cannot get any better!</span>
        <p>
          Though our officials say it a {this.state.temperature} C, but feels more like a {this.state.feelsLike} C as
          of now!
      <br />
          <span>Along with a humidity of : {this.state.humidity}</span>
        </p>
        <p>Wind speeds at just around {this.state.windSpeed} km/ph in {this.state.windDegree} degrees of direction</p>
        <p>
          Sunrise is expected to be at : {this.state.sunrise}<br />
      Sunset is expected to be at : {this.state.sunset}
        </p>
      </div>
    </div>)
  }
}

export default App;
