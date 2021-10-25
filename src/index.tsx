import React from "react";
import ReactDOM from "react-dom";
import CityWeather from "./components/CityWeather";
import "./assets/styles/styles.css";


const rootElement = document.getElementById("root");
ReactDOM.render(<CityWeather 
    city = "timmins" 
    weatherStatus = ""
    temperature = ""
    weekDay = ""
/>, rootElement);