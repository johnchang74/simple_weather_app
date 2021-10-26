import Axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudRain, faCloudShowersHeavy, faPooStorm, faSmog, faSnowflake, faSun, faWind } from '@fortawesome/free-solid-svg-icons'
import { CityWeatherObject } from '../interfaces/CityWeatherObject';
import { CityLocation } from '../assets/data/CityLocation';
import { WeatherDateIndex } from '../assets/data/WeatherDateIndex';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface CityWeatherStatus {
    selectedCity: string;
    weatherToday: CityWeatherObject;
    weatherAfterOneDay: CityWeatherObject;
    weatherAfterTwoDay: CityWeatherObject;
    weatherAfterThreeDay: CityWeatherObject;
    weatherAfterFourDay: CityWeatherObject;
    showError: boolean;
    screenWidth: number;
}

class CityWeather extends Component<CityWeatherObject, CityWeatherStatus> {
    constructor(props: CityWeatherObject) {
        super(props);
        this.state = {
            selectedCity: props.city,
            weatherToday: {} as CityWeatherObject,
            weatherAfterOneDay: {} as CityWeatherObject,
            weatherAfterTwoDay: {} as CityWeatherObject,
            weatherAfterThreeDay: {} as CityWeatherObject,
            weatherAfterFourDay: {} as CityWeatherObject,
            showError: false,
            screenWidth: 0 as number
        };
    }

    componentDidMount() {
        let widthValue = document.documentElement.clientWidth;
        this.setState({ screenWidth: widthValue });
        this.clickCity(this.state.selectedCity);
    }

    selectCity = (cityName: string) => {
        this.setState({
            selectedCity: cityName
        })
    }

    clickCity = (cityName: string) => {
        let lat = "";
        let lon = "";
        this.selectCity(cityName);
        CityLocation.map((info) => {
            if (info.city === cityName) {
                lat = info.lat;
                lon = info.lon;
            }
        });
        Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=b98dfdcbb97b8108c70756b788b4fd52`).then((res) => {
            if(res.status === 200) {
                let index = 0;
                res.data.daily.map((info: any) => {
                    let d = new Date(info.dt*1000);
                    let dateString = d.toDateString().split(' ');
                    if (index >= 0 && index <= 4) {
                        let tempValue: number = this.convertToFloat(info.temp.day);
                        let tempRounded: number = Number(tempValue.toFixed(0));
                        let weatherINfo: CityWeatherObject = {
                            city: cityName,
                            temperature: tempRounded.toString(),
                            weatherStatus: info.weather[0].main,
                            weekDay: dateString[0]
                        }
                        this.setWeather(index, weatherINfo);
                    }
                    index += 1;
                })
            } else {
                this.setState({
                    showError: true
                })
            }
        }).catch(
            error => {
                this.setState({
                    showError: true
                })
            }
        )
    }

    setWeather = (index: number, weather: CityWeatherObject) => {
        if (index === WeatherDateIndex.currentWeather) {
            this.setState({
                weatherToday: weather
            })
        } else if (index === WeatherDateIndex.weatherAfterOneDay) {
            this.setState({
                weatherAfterOneDay: weather
            })
        } else if (index === WeatherDateIndex.weatherAfterTwoDay) {
            this.setState({
                weatherAfterTwoDay: weather
            })
        } else if (index === WeatherDateIndex.weatherAfterThreeDay) {
            this.setState({
                weatherAfterThreeDay: weather
            })
        } else if (index === WeatherDateIndex.weatherAfterFourDay) {
            this.setState({
                weatherAfterFourDay: weather
            })
        }
    }

    getWeatherIcon = (weatherStatus: string): IconProp => {
        if (weatherStatus === 'Clouds') {
            return faCloud;
        } else if (weatherStatus === 'Clear') {
            return faSun;
        } else if (weatherStatus === 'Rain') {
            return faCloudShowersHeavy;
        } else if (weatherStatus === 'Thunderstorm') {
            return faPooStorm;
        } else if (weatherStatus === 'Drizzle') {
            return faCloudRain;
        } else if (weatherStatus === 'Snow') {
            return faSnowflake;
        } else if (weatherStatus === 'Mist') {
            return faCloudRain;
        } else if (weatherStatus === 'Smoke') {
            return faSmog;
        } else if (weatherStatus === 'Haze') {
            return faSmog;
        } else if (weatherStatus === 'Dust') {
            return faSmog;
        } else if (weatherStatus === 'Fog') {
            return faSmog;
        } else if (weatherStatus === 'Sand') {
            return faSmog;
        } else if (weatherStatus === 'Ash') {
            return faSmog;
        } else if (weatherStatus === 'Squall') {
            return faSnowflake;
        } else if (weatherStatus === 'Tornado') {
            return faWind;
        }
    }

    convertToFloat = (val: string) => {
        var floatValue = +(val);
        return floatValue;
    }

    render() {
        return (
            !this.state.showError
            ?
                <div className="appContainer">
                    <Row>
                        <Col className={ 
                            this.state.selectedCity === 'timmins' ? 'city-selected' : 'city-unselected'
                            } onClick={() => this.clickCity("timmins")}>TIMMINS</Col>
                        <Col className={
                            this.state.selectedCity === 'orlando' ? 'city-selected' : 'city-unselected'
                            } onClick={() => this.clickCity("orlando")}>ORLANDO</Col>
                        <Col className={
                            this.state.selectedCity === 'tokyo' ? 'city-selected' : 'city-unselected'
                            } onClick={() => this.clickCity("tokyo")}>TOKYO</Col>
                    </Row>
                    <Row>
                        {
                            this.state.weatherToday.temperature === undefined || 
                            this.state.weatherToday.weatherStatus === undefined ||
                            this.state.weatherAfterOneDay.weatherStatus === undefined ||
                            this.state.weatherAfterOneDay.temperature === undefined ||
                            this.state.weatherAfterTwoDay.weatherStatus === undefined ||
                            this.state.weatherAfterTwoDay.temperature === undefined ||
                            this.state.weatherAfterThreeDay.weatherStatus === undefined ||
                            this.state.weatherAfterThreeDay.temperature === undefined ||
                            this.state.weatherAfterFourDay.weatherStatus === undefined ||
                            this.state.weatherAfterFourDay.temperature === undefined
                            ?
                                <i className="fas fa-spinner"></i>
                            :
                                <Table className="forecast">
                                    <tr className="today">
                                        <td colSpan={4} className="current">
                                            <div>Today</div>
                                            <Row>
                                                <Col>
                                                    {
                                                        this.state.weatherToday.weatherStatus === 'Clouds'
                                                        ?
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <FontAwesomeIcon 
                                                                    icon={this.getWeatherIcon(this.state.weatherToday.weatherStatus)}
                                                                    color="#cef2e5" 
                                                                    size="3x"
                                                                    border={false}
                                                                    className="current-cloud-status-mobile"
                                                                />
                                                            :
                                                                <FontAwesomeIcon 
                                                                    icon={this.getWeatherIcon(this.state.weatherToday.weatherStatus)}
                                                                    color="#cef2e5" 
                                                                    size="3x"
                                                                    border={false}
                                                                    className="current-cloud-status"
                                                                />
                                                        :
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <FontAwesomeIcon 
                                                                    icon={this.getWeatherIcon(this.state.weatherToday.weatherStatus)}
                                                                    color="#cef2e5" 
                                                                    size="3x"
                                                                    border={false}
                                                                    className="current-status-mobile"
                                                                />
                                                            :
                                                                <FontAwesomeIcon 
                                                                    icon={this.getWeatherIcon(this.state.weatherToday.weatherStatus)}
                                                                    color="#cef2e5" 
                                                                    size="3x"
                                                                    border={false}
                                                                    className="current-status"
                                                                />
                                                    }
                                                </Col>
                                                <Col>
                                                    <div className={ this.state.screenWidth < 400 
                                                                     ? "current-temperature-mobile"
                                                                     : "current-temperature"}>
                                                        {this.state.weatherToday.temperature}
                                                    </div>
                                                    <div className={ this.state.screenWidth < 400
                                                                     ? "weather-desc-mobile"
                                                                     : "weather-desc"}>
                                                        {this.state.weatherToday.weatherStatus}
                                                    </div>
                                                </Col>
                                                <Col>
                                                    {
                                                        this.state.weatherToday.temperature !== undefined &&
                                                        this.state.weatherToday.temperature.length === 1
                                                        ?
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <i className="current-single-celsius-mobile" aria-hidden="true"></i>
                                                            :
                                                                <i className="current-single-celsius" aria-hidden="true"></i>
                                                        :
                                                            this.state.weatherToday.temperature !== undefined &&
                                                            this.state.weatherToday.temperature.length === 2
                                                            ?
                                                                this.state.screenWidth < 400
                                                                ?
                                                                    <i className="current-celsius-mobile" aria-hidden="true"></i>
                                                                :
                                                                    <i className="current-celsius" aria-hidden="true"></i>
                                                            :
                                                                ''
                                                    }
                                                    
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={1} className="weekdays">
                                            <Row>
                                                <div>{this.state.weatherAfterOneDay.weekDay}</div>
                                            </Row>
                                            <Row>
                                                <FontAwesomeIcon 
                                                    icon={this.getWeatherIcon(this.state.weatherAfterOneDay.weatherStatus)}
                                                    color="#cef2e5" 
                                                    size="2x"
                                                    border={false}
                                                    className="forecast-status"
                                                />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        this.state.weatherAfterOneDay.temperature !== undefined &&
                                                        this.state.weatherAfterOneDay.temperature.length === 1
                                                        ?   
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <div className="forecast-single-temperature-mobile">{this.state.weatherAfterOneDay.temperature}</div>
                                                            :
                                                                <div className="forecast-single-temperature">{this.state.weatherAfterOneDay.temperature}</div>
                                                        :
                                                            this.state.weatherAfterOneDay.temperature !== undefined &&
                                                            this.state.weatherAfterOneDay.temperature.length === 2
                                                            ?
                                                                this.state.screenWidth < 400
                                                                ?
                                                                    <div className="forecast-double-temperature-mobile">{this.state.weatherAfterOneDay.temperature}</div>
                                                                :
                                                                    <div className="forecast-double-temperature">{this.state.weatherAfterOneDay.temperature}</div>
                                                            :
                                                                ''
                                                    }
                                                </Col>
                                                <Col>
                                                    <i className={ this.state.screenWidth < 400 ? "forecast-celsius-mobile" : "forecast-celsius"} aria-hidden="true"></i>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td colSpan={1} className="weekdays">
                                            <Row>
                                                <div>{this.state.weatherAfterTwoDay.weekDay}</div>
                                            </Row>
                                            <Row>
                                                <FontAwesomeIcon 
                                                    icon={this.getWeatherIcon(this.state.weatherAfterTwoDay.weatherStatus)}
                                                    color="#cef2e5" 
                                                    size="2x"
                                                    border={false}
                                                    className="forecast-status"
                                                />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        this.state.weatherAfterTwoDay.temperature !== undefined &&
                                                        this.state.weatherAfterTwoDay.temperature.length === 1
                                                        ?   
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <div className="forecast-single-temperature-mobile">{this.state.weatherAfterTwoDay.temperature}</div>
                                                            :
                                                                <div className="forecast-single-temperature">{this.state.weatherAfterTwoDay.temperature}</div>
                                                        :
                                                            this.state.weatherAfterTwoDay.temperature !== undefined &&
                                                            this.state.weatherAfterTwoDay.temperature.length === 2
                                                            ?
                                                                this.state.screenWidth < 400
                                                                ?
                                                                    <div className="forecast-double-temperature-mobile">{this.state.weatherAfterTwoDay.temperature}</div>
                                                                :
                                                                    <div className="forecast-double-temperature">{this.state.weatherAfterTwoDay.temperature}</div>
                                                            :
                                                                ''
                                                    }
                                                </Col>
                                                <Col>
                                                    <i className={ this.state.screenWidth < 400 ? "forecast-celsius-mobile" : "forecast-celsius"} aria-hidden="true"></i>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td colSpan={1} className="weekdays">
                                            <Row>
                                                <div>{this.state.weatherAfterThreeDay.weekDay}</div>
                                            </Row>
                                            <Row>
                                                <FontAwesomeIcon 
                                                    icon={this.getWeatherIcon(this.state.weatherAfterThreeDay.weatherStatus)}
                                                    color="#cef2e5" 
                                                    size="2x"
                                                    border={false}
                                                    className="forecast-status"
                                                />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        this.state.weatherAfterThreeDay.temperature !== undefined &&
                                                        this.state.weatherAfterThreeDay.temperature.length === 1
                                                        ?   
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <div className="forecast-single-temperature-mobile">{this.state.weatherAfterThreeDay.temperature}</div>
                                                            :
                                                                <div className="forecast-single-temperature">{this.state.weatherAfterThreeDay.temperature}</div>
                                                        :
                                                            this.state.weatherAfterThreeDay.temperature !== undefined &&
                                                            this.state.weatherAfterThreeDay.temperature.length === 2
                                                            ?
                                                                this.state.screenWidth < 400
                                                                ?
                                                                    <div className="forecast-double-temperature-mobile">{this.state.weatherAfterThreeDay.temperature}</div>
                                                                :
                                                                    <div className="forecast-double-temperature">{this.state.weatherAfterThreeDay.temperature}</div>
                                                            :
                                                                ''
                                                    }
                                                </Col>
                                                <Col>
                                                    <i className={ this.state.screenWidth < 400 ? "forecast-celsius-mobile" : "forecast-celsius"} aria-hidden="true"></i>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td colSpan={1} className="weekdays">
                                            <Row>
                                                <div>{this.state.weatherAfterFourDay.weekDay}</div>
                                            </Row>
                                            <Row>
                                                <FontAwesomeIcon 
                                                    icon={this.getWeatherIcon(this.state.weatherAfterFourDay.weatherStatus)}
                                                    color="#cef2e5" 
                                                    size="2x"
                                                    border={false}
                                                    className="forecast-status"
                                                />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        this.state.weatherAfterFourDay.temperature !== undefined &&
                                                        this.state.weatherAfterFourDay.temperature.length === 1
                                                        ?   
                                                            this.state.screenWidth < 400
                                                            ?
                                                                <div className="forecast-single-temperature-mobile">{this.state.weatherAfterFourDay.temperature}</div>
                                                            :
                                                                <div className="forecast-single-temperature">{this.state.weatherAfterFourDay.temperature}</div>
                                                        :
                                                            this.state.weatherAfterFourDay.temperature !== undefined &&
                                                            this.state.weatherAfterFourDay.temperature.length === 2
                                                            ?
                                                                this.state.screenWidth < 400
                                                                ?
                                                                    <div className="forecast-double-temperature-mobile">{this.state.weatherAfterFourDay.temperature}</div>
                                                                :
                                                                    <div className="forecast-double-temperature">{this.state.weatherAfterFourDay.temperature}</div>
                                                            :
                                                                ''
                                                    }
                                                </Col>
                                                <Col>
                                                    <i className={ this.state.screenWidth < 400 ? "forecast-celsius-mobile" : "forecast-celsius"} aria-hidden="true"></i>
                                                </Col>
                                            </Row>                                     
                                        </td>
                                    </tr>
                                </Table>
                        } 
                    </Row>
                </div>
            :
                <p>Weather service is down now!</p>      
        )
    }
}
export default CityWeather;