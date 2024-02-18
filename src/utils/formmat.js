export const getCelsius = (temperature) => Math.round((temperature - 32) * 5 / 9);

export const getHour = (curHour) => {
  return new Date(curHour).toLocaleTimeString(
    'ko-KR',
    {
      hour: '2-digit'
    }
  );
}

export const getWeekDay = (time) => {
  new Date(time).toLocaleDateString(
    'ko-KR',
    {
      weekday: 'long'
    }
  );
}