"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
//https://api.openweathermap.org/data/2.5/forecast?q=&pune&appid=c2b84193fe521c38dada6f68da0ef9de&cnt=56

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: CityInfo;
}

interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }

    /* fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    ).then(res =>  res.json()) */
    // Because we're using axios, we don't need to use fetch and to convert it into json
  );

  console.log("data", data?.city.name);

  if (isLoading) return (
  <div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce">Loading...</p>
    </div>);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main></main>
    </div>
  );
}
