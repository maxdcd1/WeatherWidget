import React, { useState, useEffect } from "react";
import WeatherWidget from "./weather";

function shuffle() {
  const cityList = ["Łódź", "Warsaw", "Berlin", "New York", "London"];
  var randomCities = [];
  var randomIndex = 0;
  var currentIndex = 5;
  var city = "";

  while (randomCities.length < 3) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    city = cityList[randomIndex];
    if (randomCities.indexOf(city) < 0) randomCities.push(cityList[randomIndex]);
  }
  console.log(randomCities);
  return randomCities;
}

function App() {
  const [cities, setCities] = useState(() => {
    return shuffle();
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCities(shuffle());
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);
  
  return (
    <main>
      <WeatherWidget city={cities[0]} />
      <WeatherWidget city={cities[1]} />
      <WeatherWidget city={cities[2]} />
    </main>
  );
}

export default App;
