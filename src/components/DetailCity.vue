<template>
  <article class="flex flex-col items-center flex-1">
    <section 
      v-if="route.query.preview" 
      class="w-full p-4 font-semibold text-center bg-weather-secondary animate-pulse "
    >
      <p class="text-wheather-gray">
        현재 이 도시를 미리보기 중입니다. <br class="sm:hidden"/> 트래킹을 시작하려면 '+' 아이콘을 클릭하세요.
      </p>
    </section>

    <section class="flex flex-col items-center w-full max-w-4xl px-4 pt-14">
      <h2 class="text-5xl font-bold tracking-wider">
        {{ route.params.city }}
      </h2>

      <p class="mt-4 text-xl">
        {{ currentDate }} {{ currentTime }}
      </p>

      <p class="mt-10 text-8xl">
        {{ getCelsius(weatherData.current.temp) }}&#8451;
      </p>

      <div class="text-center">
        <p class="mt-6 text-lg text-yellow-200">
          체감온도
          <span class="font-bold">
            {{ getCelsius(weatherData.current.feels_like) }}&#8451;
          </span>
        </p>

        <p class="capitalize">
          {{ weatherData.current.weather[0].description  }}
        </p>

        <img 
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt="weather icon"
          class="w-[150px] h-auto rounded-sm object-contain"
        />        
      </div>  

      <hr class="w-full mt-12 border border-white border-opacity-10">  
    </section>

    <section class="w-full max-w-4xl px-4 mt-12 max-sm:px-8">
      <h2 class="text-2xl font-semibold">
        시간별 날씨
      </h2>
      <div class="flex gap-10 pb-6 mt-10 overflow-x-auto custom-scroll">
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

    <section class="flex flex-col items-center w-full max-w-4xl px-4 mt-12 max-sm:px-8">
      <h2 class="w-full text-2xl font-semibold">
        주간별 날씨
      </h2>
      <div class="flex flex-col w-full max-w-2xl gap-10 mt-10">
        <div 
          v-for="day in weatherData?.daily" 
          :key="day.dt"
          class="flex items-center w-full "
        >
          <p class="flex-1">
            {{ getWeekDay(day.dt * 1000) }}
          </p>
          <img 
            class="w-[50px] h-[50px] object-cover" 
            :src="`http://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`"
            alt="weather icon"
          />
          <div class="flex justify-end flex-1 gap-6">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
      <hr class="w-full mt-12 border border-white border-opacity-10">  
    </section>    

    <button
      @click="removeCityPage" 
      class="flex items-center gap-2 px-5 py-3 my-12 text-white transition-colors bg-red-500 rounded-full cursor-pointer hover:bg-white text-blackduration-150 hover:text-red-500"
    >
      <font-awesome-icon :icon="['fas', 'trash']" />
      <p class="capitalize">
        remove city
      </p>
    </button>
  </article>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getCelsius, getHour, getWeekDay } from '../utils/formmat';
import axios from 'axios';

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );
 
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

const weatherData = await getWeatherData();

const router = useRouter();
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

const removeCityPage = () => {
  const savedCitiesStorage = JSON.parse(localStorage.getItem('savedCities'));

  const filteredCities = savedCitiesStorage.filter((city) => {
    return city.id !== route.query.id;
  });

  localStorage.setItem('savedCities', JSON.stringify(filteredCities));

  router.push({ name: 'home' });
}

</script>
