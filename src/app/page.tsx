"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { parseISO } from "date-fns";
import Image from "next/image";
import { format } from "date-fns";
import { useQuery } from "react-query";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
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
        `https://api.openweathermap.org/data/2.5/forecast?q=lille&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }

    /* fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    ).then(res =>  res.json()) */
    // Because we're using axios, we don't need to use fetch and to convert it into json
  );

  console.log("data", data?.city.name);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            {/* DATE */}
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                {format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")}
              </p>
            </h2>
            <Container className=" gap-10 px-6 items-center">
              <div className=" flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
            </Container>
          </div>
        </section>
        {/* 7 day forecast data */}
        <section></section>
      </main>
    </div>
  );
}
