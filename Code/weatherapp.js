const getInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const aniBtn = document.querySelector('#search-button i');
const aniLoca = document.querySelector('.fa-location-dot');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidityText = document.getElementById('humidity-infor');
const windText = document.getElementById('wind-infor');
const container = document.querySelector('.container');
const notFound = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const imageNF = document.querySelector('.not-found img');
const box = document.querySelector('.weather-box');
const infor = document.querySelector('.weather-information');
const windCol = document.querySelector('.wind i');
const humidCol = document.querySelector('.humidity i');


/*Hàm lấy thời gian theo khu vực của thành phố*/
const getTimeByZone = (timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Sử dụng hệ 24h
    }).formatToParts(new Date());
}

/*Lấy giờ từ thời gian*/
const getHourByTime = (timeZone) => {
    const time = getTimeByZone(timeZone);
    const hour = time.find(part => part.type === 'hour');
    return hour.value;
}


/*Tạo hiệu ứng sau khi đổi thành phố*/
const resetAnimation = () => {
    container.style.height = '50px';
    box.style.display = 'none';
    infor.style.display = 'none';
    notFound.style.display = 'none';
}

/*Chỉnh sửa chuỗi Decription*/
const checkDescription = (description) => {
    return description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const showWeather = async () => {
    resetAnimation();
    const input = getInput.value.toLowerCase();
    const APIKey = '1422ebc6278aec4f5666afe9a1c34fed';
    const addressAPIKey = 'AIzaSyCv_MihSMKP0HBLFZztacmhDFtA7CxlLRc';
    const timestamp = Math.floor(Date.now() / 1000);
    try {
        if (input === '') {
            alert('Please enter a city!!!');
            return;
        }
        else {
            const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${APIKey}`);
            const weatherData = await getWeather.json();
            if (weatherData.cod === '404') {
                container.style.height = '450px';
                container.style.margin = '60px';
                imageNF.src = "images/404-not-found.png";
                notFound.style.display = 'block';
                box.style.display = 'none';
                infor.style.display = 'none';
                notFound.classList.add('fade-in');
                return;
            }
            const getAddress = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${addressAPIKey}`);
            const addressData = await getAddress.json();
            const location = addressData.results[0].geometry.location;
            const getDetail = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${addressAPIKey}`);
            const dataDetail = await getDetail.json();
            const getHour = getHourByTime(dataDetail.timeZoneId);
            notFound.style.display = 'none';
            // remove animation
            switch (weatherData.weather[0].main) {
                case 'Clear':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/clear/clear-night.png' : 'images/clear/clear-day.png';
                    break;
                case 'Clouds':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/cloud/cloud-night.png' : 'images/cloud/cloud-day.png';
                    break;
                case 'Rain':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/rain/rain-night.png' : 'images/rain/rain-day.png';
                    break;
                case 'Drizzle':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/drizzle/drizzle-night.png' : 'images/drizzle/drizzle-day.png';
                    break;
                case 'Dush':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/dush_ash_sand/dust-night.png' : 'images/dush_ash_sand/dust-day.png';
                    break;
                case 'Ash':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/dush_ash_sand/dust-night.png' : 'images/dush_ash_sand/dust-day.png';
                    break;
                case 'Sand':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/dush_ash_sand/dust-night.png' : 'images/dush_ash_sand/dust-day.png';
                    break;
                case 'Snow':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/snow/snow-night.png' : 'images/snow/snow-day.png';
                    break;
                case 'Thunderstorm':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/thunder/thunderstorm-night.png' : 'images/thunder/thunderstorm-day.png';
                    break;
                case 'Fog':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/fog_haze_mist_smoke/fog-night.png' : 'images/fog_haze_mist_smoke/fog-day.png';
                    break;
                case 'Mist':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/fog_haze_mist_smoke/fog-night.png' : 'images/fog_haze_mist_smoke/fog-day.png';
                    break;
                case 'Haze':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/fog_haze_mist_smoke/fog-night.png' : 'images/fog_haze_mist_smoke/fog-day.png';
                    break;
                case 'Smoke':
                    image.src = getHour >= 17 || getHour < 6 ? 'images/fog_haze_mist_smoke/fog-night.png' : 'images/fog_haze_mist_smoke/fog-day.png';
                    break;
                case 'Tornado':
                    image.src = 'images/tornado_squall/tornado.png';
                    break;
                case 'Squall':
                    image.src = 'images/tornado_squall/tornado.png';
                    break;
            }
            const temp = Math.round(parseInt(weatherData.main.temp - 273.15));
            const humid = parseInt(weatherData.main.humidity);
            const wind = parseInt(weatherData.wind.speed);
            temperature.innerHTML = `${temp}<span>°C</span>`;
            if (temp < 0) {
                temperature.style.color = 'rgb(24, 20, 109)';
            }
            if (temp >= 0 && temp <= 20) {
                temperature.style.color = 'rgb(19, 145, 36)';
            }
            if (temp > 20 && temp <= 27) {
                temperature.style.color = 'rgb(244, 175, 25)';
            }
            if (temp > 27 && temp <= 35) {
                temperature.style.color = 'rgb(180, 89, 10)';
            }
            if (temp > 35) {
                temperature.style.color = 'rgb(163, 13, 13)';
            }
            description.innerHTML = `${checkDescription(weatherData.weather[0].description)}`;
            humidityText.innerHTML = `${humid}%`;
            if (humid < 30) {
                humidCol.style.color = 'pink';
                humidityText.style.color = 'pink';
            }
            if (humid > 30 && humid <= 70) {
                humidCol.style.color = 'blue';
                humidityText.style.color = 'blue';
            }
            if (humid > 70) {
                humidCol.style.color = 'darkblue';
                humidityText.style.color = 'darkblue';
            }
            windText.innerHTML = `${wind}Km/h`;
            if (wind < 1.6) {
                windCol.style.color = 'rgb(212, 177, 18)';
                windText.style.color = 'rgb(212, 177, 18)';
            }
            if (wind >= 1.6 && wind < 1.9) {
                windCol.style.color = 'rgb(214, 130, 21)';
                windText.style.color = 'rgb(214, 130, 21)';
            }
            if (wind >= 1.9 && wind < 2.1) {
                windCol.style.color = 'rgb(203, 59, 7)';
                windText.style.color = 'rgb(203, 59, 7)';
            }
            if (wind >= 2.1 && wind < 2.2) {
                windCol.style.color = 'rgb(189, 40, 17)';
                windText.style.color = 'rgb(189, 40, 17)';
            }
            if (wind >= 2.2 && wind < 2.4) {
                windCol.style.color = 'rgb(199, 25, 187)';
                windText.style.color = 'rgb(199, 25, 187)';
            }
            if (wind >= 2.4 && wind < 2.6) {
                windCol.style.color = 'rgb(106, 7, 100)';
                windText.style.color = 'rgb(106, 7, 100)';
            }
            if (wind >= 2.6) {
                windCol.style.color = 'rgb(14, 9, 110)';
                windText.style.color = 'rgb(14, 9, 110)';
            }
            container.style.height = '600px';
            container.style.margin = '60px';
            box.classList.add('fade-in');
            infor.classList.add('fade-in');
            box.style.display = '';
            infor.style.display = '';
        }
    }
    catch (err) {
        console.log("Error", err);
    }
}

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    showWeather();
});

getInput.addEventListener('keydown', key => {
    if (key.key === 'Enter') {
        showWeather();
    }
});

searchBtn.addEventListener('pointerover', () => {
    aniBtn.classList.add('fa-beat');
});

searchBtn.addEventListener('pointerout', () => {
    aniBtn.classList.remove('fa-beat');
});

getInput.addEventListener('focusin', () => {
    aniLoca.classList.add('fa-bounce');
});

getInput.addEventListener('focusout', () => {
    aniLoca.classList.remove('fa-bounce');
});