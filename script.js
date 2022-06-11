'use strict';
const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
})

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9ccf74a60ef1cc4faca8f0672b660c50`;
    fetchData(api);
}

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9ccf74a60ef1cc4faca8f0672b660c50`;
    fetchData(api);
}

function fetchData(api){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then((response) =>
      response.json().then((result) => weatherDetails(result))
    );
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        infoTxt.classList.replace("pending", "error");
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if (id >= 200 && id <= 232) {
            wIcon.src = "images/scattered-thunderstorm.png";
        }
        if (id >= 300 && id <= 321) {
          wIcon.src = "images/drizzle.png";
        }
        if (id >= 500 && id <= 531) {
          wIcon.src = "images/raining.png";
        }
        if (id >= 600 && id <= 622) {
          wIcon.src = "images/snowing.png";
        }
        if (id >= 701 && id <= 781) {
          wIcon.src = "images/wind.png";
        }
        if (id >= 801 && id <= 804) {
          wIcon.src = "images/clouds.png";
        }
        console.log(wIcon, id);
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);

    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});