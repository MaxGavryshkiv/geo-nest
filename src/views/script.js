var map = L.map('map').setView([50.44403, 30.521654], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const spinnerRef = document.querySelector('.spinner');
const spinnerTextRef = document.querySelector('.loading_text');
let firstMapPoint = null;
let secondMapPoint = null;
let firstPointMarker = null;
let secondPointMarker = null;
const myIcon = L.icon({
  iconUrl: 'my-icon.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const getPath = (firstPoint, secondPoint) => {
  spinnerRef.classList.add('loading');
  spinnerTextRef.classList.remove('none');
  if (firstPointMarker && secondMapPoint) {
    map.removeLayer(firstPointMarker);
    map.removeLayer(secondPointMarker);
  }
  clearMap();
  return fetch('http://localhost:3000/path', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstPoint: firstPoint,
      secondPoint: secondPoint,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      firstPointMarker = L.marker(
        firstPoint
          .split(',')
          .map((el) => Number(el))
          .reverse(),
        { icon: myIcon },
      );
      secondPointMarker = L.marker(
        secondPoint
          .split(',')
          .map((el) => Number(el))
          .reverse(),
        { icon: myIcon },
      );
      map.addLayer(firstPointMarker);
      map.addLayer(secondPointMarker);
      const polyline = L.polyline(res.routes[0].geometry, {
        color: 'red',
      }).addTo(map);
      map.fitBounds(polyline.getBounds());
    })
    .catch((error) => {
      return console.log(error);
    })
    .finally(() => {
      spinnerRef.classList.remove('loading');
      spinnerTextRef.classList.add('none');
    });
};

const getNearestObjects = (meterAround, lat, lng) => {
  spinnerRef.classList.add('loading');
  spinnerTextRef.classList.remove('none');
  return fetch('http://localhost:3000/osm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      around: `${meterAround},${lat},${lng}`,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      data.elements.forEach((el) =>
        L.marker([el.lat, el.lon], {
          title: el.tags.name,
          alt: `Marker of ${el.tags.name}, ${el.tags.amenity}`,
        })
          .bindPopup(`${el.tags.name}`)
          .addTo(map)
          .on('click', (e) => {
            if (
              firstMapPoint &&
              secondMapPoint &&
              firstMapPoint !== `${e.latlng.lng},${e.latlng.lat}`
            ) {
              firstMapPoint = `${e.latlng.lng},${e.latlng.lat}`;
              secondMapPoint = null;
            }
            if (
              firstMapPoint &&
              firstMapPoint !== `${e.latlng.lng},${e.latlng.lat}`
            ) {
              secondMapPoint = `${e.latlng.lng},${e.latlng.lat}`;
              getPath(firstMapPoint, secondMapPoint);
            }
          }),
      ),
    )
    .catch((error) => {
      return console.log(error);
    })
    .finally(() => {
      spinnerRef.classList.remove('loading');
      spinnerTextRef.classList.add('none');
    });
};

const getAllObjects = () => {
  spinnerRef.classList.add('loading');
  spinnerTextRef.classList.remove('none');
  return fetch('http://localhost:3000/locations')
    .then((res) => res.json())
    .then((data) =>
      data.forEach((el) => {
        L.marker(el.coordinates, {
          title: el.name,
          alt: `Marker of ${el.name}, ${el.type}`,
        })
          .bindPopup(`${el.name}`)
          .addTo(map)
          .on('click', (e) => {
            firstMapPoint = `${e.latlng.lng},${e.latlng.lat}`;
            getNearestObjects(3000, e.latlng.lat, e.latlng.lng);
          });
      }),
    )
    .catch((error) => {
      return console.log(error);
    })
    .finally(() => {
      spinnerRef.classList.remove('loading');
      spinnerTextRef.classList.add('none');
    });
};

function clearMap() {
  for (i in map._layers) {
    if (map._layers[i]._path != undefined) {
      try {
        map.removeLayer(map._layers[i]);
      } catch (e) {
        console.log('problem with ' + e + map._layers[i]);
      }
    }
  }
}

getAllObjects();
map.on('click', (e) => {
  if (!firstMapPoint) {
    firstMapPoint = `${e.latlng.lng},${e.latlng.lat}`;
  }
  if (firstMapPoint && secondMapPoint) {
    firstMapPoint = `${e.latlng.lng},${e.latlng.lat}`;
    secondMapPoint = null;
  }
  if (firstMapPoint && firstMapPoint !== `${e.latlng.lng},${e.latlng.lat}`) {
    secondMapPoint = `${e.latlng.lng},${e.latlng.lat}`;

    getPath(firstMapPoint, secondMapPoint);
  }
});
