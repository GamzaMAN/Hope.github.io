const weather = document.querySelector("#js-weather"),
	weatherInfo = weather.querySelector("h2");

const API_KEY = "05952e30d0365e0104d3d6498cf38337";
const COORDS = "coords";

function getWeather(latitude, longitude){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
	).then(function(response){
		return response.json();
	}).then(function(json){
		const curTemp = json.main.temp;
		const curPlace = json.name;

		weatherInfo.innerText = `${curTemp}℃ @ ${json.name}`;
	});

}

function coordsResponseOK(position){
	const curPosition = {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude
	}; 

	storeLocalStorage(COORDS, JSON.stringify(curPosition));
	getWeather(position.coords.latitude, position.coords.longitude);
}

function coordsResponseError(error){
	console.log(error);
}

function requestCoords(){
	navigator.geolocation.getCurrentPosition(coordsResponseOK, coordsResponseError);
}

function storeLocalStorage(key, value){
	localStorage.setItem(key, value);
}

function loadLocalStorage(){
	const loadedCoords = localStorage.getItem(COORDS);

	if (loadedCoords === null){
		requestCoords();
	}else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function init(){
	loadLocalStorage();
}

init();