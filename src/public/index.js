const MAPBOX_TOKEN = TU_ACCESS_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-58.7631381, -34.5191772], // starting position [lng, lat]
    zoom: 14, // starting zoom
  });
}

function initSearchForm(callback) {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    mapboxClient.geocodeForward(
      e.target.q.value,
      {
        country: "ar",
        autocomplete: true,
        language: "es",
      },
      function (err, data, res) {
        console.log(data);
        if (!err) callback(data.features);
      }
    );
  });
}

(function () {
  window.map = initMap();
  initSearchForm(function (results) {
    console.log(results);

    const firstResult = results[0];
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);
    fetch(
      "/comercios-cerca-de?lat=" +
        firstResult.geometry.coordinates[1] +
        "&lng=" +
        firstResult.geometry.coordinates[0]
    )
      .then(res => {
        return res.json();
      })
      .then(results => {
        console.log(results);
        for (const comercio of results) {
          const { lat, lng } = comercio._geoloc;
          new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        }
      });
    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
})();
