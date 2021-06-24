let mymap = L.map("mapid").setView([0, 0], 5);
let api_url = "";
let accessToken =
  "pk.eyJ1IjoiZmFyYXotbW9iaW4xNyIsImEiOiJja3E3eWRzb2YwMTYwMndxb2h3dG80YnB4In0.fmREqwohrwqPKnSsb8aaSQ";
let input = document.querySelector("#input");
let ipshow = document.querySelector("#ipshow");
let locate = document.querySelector("#location");
let timezone = document.querySelector("#timezone");
let isp = document.querySelector("#isp");
const second = document.querySelector(".second");
const button = document.querySelector(".submit");

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${accessToken}`,
  }
).addTo(mymap);
var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [30],
});
// creating pointer
let marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

async function getData(api_url) {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  ipshow.textContent = data.ip;
  locate.textContent = data.location.country;
  timezone.textContent = data.location.timezone;
  isp.textContent = data.isp;
  marker.setLatLng([data.location.lat, data.location.lng]);
}

button.addEventListener("click", () => {
  if (input.value.startsWith("www")) {
    api_url = `https://geo.ipify.org/api/v1?apiKey=at_eeP9EERbEMmbR89MGoy4W7JmaLJPR&domain=${input.value}`;
    getData(api_url);
  } else {
    api_url = `https://geo.ipify.org/api/v1?apiKey=at_eeP9EERbEMmbR89MGoy4W7JmaLJPR&ipAddress=${input.value}`;
    getData(api_url);
  }
});
