import React, {Component} from 'react';
import '../App.css';

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {temp: 0, desc: '', icon: '', loading: true}
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Melbourne,AU&units=Metric&APIkey=0013c08b32b019ca368c57f469a8cf8b')
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                temp: responseData.main.temp,
                desc: responseData.weather[0].description,
                icon: responseData.weather[0].icon,
                loading: false

            })
        })
        .catch(err => console.error(err));
    }

    render() {
        const imgSrc = `http://openweathermap.org/img/w/${this.state.icon}.png`;

        if (this.state.loading){
            return <p>Loading</p>
        }
        else {
            return (
                <div className="App">
                    <p>Temperature: {this.state.temp} °C</p>
                    <p>Description: {this.state.desc}</p>
                    <img src={imgSrc} alt="Weather icon" />    
                </div>
            );
        }
        
    }
}

export default WeatherApp;