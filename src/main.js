import React from "react";
import ReactDom from "react-dom";
import WeatherWidget from "./components/WeatherWidget";

function App() {
  const tag = document.getElementsByTagName("weather-widget")[0];
  if (tag) {
    ReactDom.render(<WeatherWidget/>, tag);
  } else {
    console.warn("No <weather-widget/> tag found");
  }
}

App();
