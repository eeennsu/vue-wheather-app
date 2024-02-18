<template>
  <article class="flex flex-col items-center flex-1">
    <section 
      v-if="query.preview" 
      class="w-full p-4 font-semibold text-center bg-weather-secondary animate-pulse "
    >
      <p class="text-wheather-gray">
        현재 이 도시를 미리보기 중입니다. <br class="sm:hidden"/> 트래킹을 시작하려면 '+' 아이콘을 클릭하세요.
      </p>
    </section>

    <section class="flex flex-col items-center w-full max-w-6xl px-4 py-14">
      <h2 class="text-5xl font-bold tracking-wider">
        {{ params.city }}
      </h2>

      <p class="mt-4 text-xl">
        {{ currentDate }} {{ currentTime }}
      </p>

      <p class="mt-10 text-8xl">
        {{ getCelsius(wheatherData?.current.temp) }}&deg;
      </p>

      <div class="text-center">
        <p class="mt-6 text-lg text-yellow-200">
          체감온도
          <span class="font-bold">
            {{ getCelsius(wheatherData?.current.feels_like) }}&deg;
          </span>
        </p>

        <p class="capitalize">
          {{ weatherData?.current?.weather[0].description || 'Lorem30' }}
        </p>

        <img 
          :src="`http://openweathermap.org/img/wn/${weatherData?.current.weather[0].icon}@2x.png`"
          alt="weather icon"
          class="w-[150px] h-auto rounded-sm object-contain"
        />        
      </div>  

      <hr class="w-full mt-12 border border-white border-opacity-10">  
    </section>

    <section class="w-full max-w-6xl px-4">
      <h2 class="text-lg font-[500] px-2 sm:px-8">
        시간별 날씨
      </h2>
      <div class="flex gap-10 overflow-x-auto">
        <div 
          v-for="hour in weatherData?.hourly" 
          :key="hour.dt"
          class="flex flex-col items-center gap-4"
        >
          <p class="whitespace-nowrap text-md">
            {{ getHour(hour.currentTime) }}
          </p>
          <img 
            class="w-auto h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
            alt="weather icon"
          />
          <p class="text-xl">
            {{ getCelsius(hour.temp) }}
          </p>
        </div>
      </div>
      <hr class="w-full mt-12 border border-white border-opacity-10">  
    </section>    

    <section class="w-full max-w-6xl px-4 pt-12">
      <h2 class="text-lg font-[500] px-2 sm:px-8">
        주간별 날씨
      </h2>
      <div class="flex gap-10 overflow-x-auto">
        <div 
          v-for="day in weatherData?.daily" 
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{ getWeekDay(day?.dt * 1000) }}
          </p>
          <img 
            class="w-[50px] h-[50px] object-cover" 
            :src="`http://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`"
            alt="weather icon"
          />
          <div class="flex justify-end flex-1 gap-2">
            <p>H: {{ getCelsius(day.temp.max) }}</p>
            <p>L: {{ getCelsius(day.temp.min) }}</p>
          </div>
        </div>
      </div>
      <hr class="w-full mt-12 border border-white border-opacity-10">  
    </section>    
  </article>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { getCelsius, getHour, getWeekDay } from '../utils/formmat';
import axios from 'axios';

const { params, query } = useRoute();

const getWheatherData = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/onecall',
      params: {
        lat: query.lat,
        lon: query.lng,
        appid: import.meta.env.VITE_WHEATHER_API_KEY,
        units: 'imperial'
      }
    };

    const weatherData = await axios.request(options);

    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;

  } catch (error) {
    console.log(error);
  }
}

const wheatherData = await getWheatherData();

const now = new Date();
const currentDate = now.toLocaleDateString(
  'ko-KR',
  {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }
);

const currentTime = now.toLocaleTimeString(
  'ko-KR',
  {
    hour: '2-digit',
    minute: '2-digit',
  }
);
</script>
