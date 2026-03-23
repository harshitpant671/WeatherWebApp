// Weather API Key: http://api.weatherapi.com/v1/current.json?key=1f3c49e7fef340dc88961756262303&q=Mumbai&aqi=no

const tempValue = document.querySelector('#temp-value');
const locationField = document.querySelector('.location');
const dateTimeField = document.querySelector('.date-time');
const conditionText = document.querySelector('.condition-text');
const weatherIcon = document.querySelector('#weather-icon');
const bgContainer = document.querySelector('#bg-container');
const searchField = document.querySelector(".search_area");
const form = document.querySelector("#weather-form");

// Asset mapping based on weathe

const weatherAssets = {
    'Sunny': { bg: 'assets/sunny.png', icon: 'assets/icon_sunny.png' },
    'Clear': { bg: 'assets/sunny.png', icon: 'assets/icon_sunny.png' },
    'Partly cloudy': { bg: 'assets/cloudy.png', icon: 'assets/icon_cloudy.png' },
    'Cloudy': { bg: 'assets/cloudy.png', icon: 'assets/icon_cloudy.png' },
    'Overcast': { bg: 'assets/cloudy.png', icon: 'assets/icon_cloudy.png' },
    'Mist': { bg: 'assets/cloudy.png', icon: 'assets/icon_cloudy.png' },
    'Patchy rain possible': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' },
    'Light rain': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' },
    'Moderate rain': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' },
    'Heavy rain': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' },
    'Rain': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' },
    'Thunderstorm': { bg: 'assets/rainy.png', icon: 'assets/icon_rainy.png' } // Fallback to rainy bg for now
};

const fetchResults = async (targetLocation) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=1f3c49e7fef340dc88961756262303&q=${targetLocation}&aqi=no`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        
        const location = data.location.name;
        const time = data.location.localtime;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const apiIcon = data.current.condition.icon;

        updateDetails(temp, time, location, condition, apiIcon);
    } catch (error) {
        console.error(error);
        alert('Could not find weather data for that location.');
    }
}

function searchLocation(e) {
    e.preventDefault();
    const target = searchField.value;
    if (target) {
        fetchResults(target);
    }
}

form.addEventListener('submit', searchLocation);

function updateDetails(temp, localtime, location, condition, apiIcon) {
    const splitDate = localtime.split(" ")[0];
    const splitTime = localtime.split(" ")[1];
    const currentDay = getDayName(new Date(splitDate).getDay());

    // Update Text Data
    tempValue.innerText = Math.round(temp);
    locationField.innerText = location;
    dateTimeField.innerText = `${splitDate} | ${currentDay}`;
    conditionText.innerText = condition;

    // Update Background and Icon
    const assets = weatherAssets[condition] || { bg: null, icon: apiIcon };
    
    if (assets.bg) {
        bgContainer.style.backgroundImage = `url('${assets.bg}')`;
    }
    
    // If it's a custom icon, use it. Otherwise, use the API icon (ensuring it's https).
    if (assets.icon.startsWith('assets/')) {
        weatherIcon.src = assets.icon;
    } else {
        weatherIcon.src = apiIcon.startsWith('//') ? `https:${apiIcon}` : apiIcon;
    }
}

function getDayName(number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[number] || "";
}

// Initial Fetch
fetchResults("Lucknow");
