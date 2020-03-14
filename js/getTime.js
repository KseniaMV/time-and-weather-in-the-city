var button = document.querySelectorAll(".get_info");
var city_block = document.querySelectorAll(".city_block");


button.forEach(item => {

    item.addEventListener("click", function (event) {
        "use strict";
        let target = event.target;
        let city_name = target.id; //get name of city 

        let city_area = this.dataset.area; //get area
        let city_id = this.dataset.number; //get id to request weather info

        let city = document.querySelector("." + city_name); //get element -  front part of block
        let city_back = document.querySelector("." + city_name + "Info"); //get element - back of the block

        getInfo(city_name, city_area); //request time
        getWeatherInfo(city_name, city_id); //request weather


        city.style.transform = "rotateY(-180deg)"; //animate rotation to back side
        city_back.style.transform = "rotateY(0)";

        city_back.addEventListener("click", function () { //animate rotation to front side
            city.style.transform = "rotateY(0)";
            city_back.style.transform = "rotateY(180deg)";

        });


    });


});



/*get information about time*/
function getInfo(cityName, area) {
    let url = `http://worldtimeapi.org/api/timezone/${area}/${cityName}`;
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText);
            let h = data.datetime[11] + data.datetime[12];
            let min = data.datetime[14] + data.datetime[15];
            let infoConteiner = document.querySelector("#" + cityName + "Time");
            infoConteiner.className = "time";
            infoConteiner.innerHTML = h + ":" + min;
        } else {
            infoConteiner.innerHTML = "connection error";
        };
        request.onprogress = function (event) {
            let loadList = document.createElement("div");
            loadList.class = "load";
            loadList.innerHTML = `Loaded: ${event.loaded} from ${event.total}`;
            document.body.append(loadList);
        };

    };
};


/*get information about weather (temp and description)*/

function getWeatherInfo(cityName, id) {
    let myId = ' ';                     //YOUR ID HERE
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric` + '&APPID=' + myId;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText);
            let desc = document.querySelector(`.${cityName}Weather`);
            let temp = document.querySelector(`.${cityName}_temp`);
            temp.innerHTML = data.main.temp.toFixed(1) + " C";
            desc.innerHTML = (data.weather[0]['description']);
        } else {
            temp.innerHTML = "connection error";
            desc.innerHTML = "connection error";
        };
        request.onprogress = function (event) {
            let loadList = document.createElement("div");
            loadList.class = "load";
            loadList.innerHTML = `Loaded: ${event.loaded} from ${event.total}`;
            document.body.append(loadList);
        };

    };
};