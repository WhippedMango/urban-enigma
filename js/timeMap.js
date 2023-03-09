const timeURL = 'https://api.ipgeolocation.io/timezone?apiKey=be163e3ca300447d9db41a4e9738d40b';

let locat;

async function gotData() {
    const timeAPI = await fetch(timeURL);
    const datum = await timeAPI.json();
    const { date_time, timezone } = datum;
    const truncated = date_time.slice(11, 16);
    document.getElementById('currentTime').textContent = truncated;
    document.getElementById('timeZone').textContent = timezone;
}

gotData();

setInterval(gotData, 60000);

const map = L.map('map').setView([54, -2], 4);

const att =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tile = L.tileLayer(tileURL, { att });
tile.addTo(map);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    locat = [position.coords.latitude, position.coords.longitude];
    const marker = L.marker(locat).addTo(map);
    const location = marker.bindPopup('<b>You are here!</b><br>Latitude: ' + locat[0] + '<br>Longitude: ' + locat[1]).openPopup();
}