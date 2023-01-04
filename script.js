
var address = document.querySelector("#address");
var results = document.querySelector("#results");

function showAddress() {
    results.innerHTML = ''
    if (addressArr.length > 0) {
        addressArr.forEach(element => {
            results.innerHTML += "<div class='results'>" + element.display_name
                + "<br> Lat: " + element.lat
                + " Lng: " + element.lon
                + "</div>"
        });
    }
    else {
        results.innerHTML = "<p style='color:red'>Not Found !</p>"
    }
}

function findAddress() {
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&city=" + address.value
    fetch(url).then(response => response.json()).then(data => addressArr = data)
    .then(show => showAddress()).catch(err => console.log(err))

    setTimeout(() => {
        updateMap([addressArr[0].lon, addressArr[0].lat])
    }, 800)
}


navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true })

function successCallback(position) {
    updateMap([position.coords.longitude, position.coords.latitude])
}

function errorCallback() {
    updateMap([35.9239, 31.9515])
}

mapboxgl.accessToken = 'pk.eyJ1IjoibWJzOTkiLCJhIjoiY2xjZnN6aDBtMG1iODNzbjBxOXdtaHBuOCJ9.q710FQa4Un8azwGQOp9MDg';

function updateMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 10
    });

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)
}

