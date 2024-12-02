import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import Feature from 'https://cdn.skypack.dev/ol/Feature.js';
import Point from 'https://cdn.skypack.dev/ol/geom/Point.js';
import VectorLayer from 'https://cdn.skypack.dev/ol/layer/Vector.js';
import VectorSource from 'https://cdn.skypack.dev/ol/source/Vector.js';
import Icon from 'https://cdn.skypack.dev/ol/style/Icon.js';
import Style from 'https://cdn.skypack.dev/ol/style/Style.js';
import Overlay from 'https://cdn.skypack.dev/ol/Overlay.js';
import { fromLonLat } from 'https://cdn.skypack.dev/ol/proj.js';

let coordinates = [lon, lat];

// Initialize map
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat(coordinates),
    zoom: 12,
  }),
});

// Create marker
const marker = new Feature({
  geometry: new Point(fromLonLat(coordinates)),
  name: country,
});

marker.setStyle(new Style({
  image: new Icon({
    src: 'https://cdn-icons-png.flaticon.com/256/684/684908.png',
    scale: 0.2,
  }),
}));

// Add marker to vector layer
const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: [marker],
  }),
});
map.addLayer(vectorLayer);

// Create popup overlay
const popupElement = document.getElementById('popup');
const popupOverlay = new Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  offset: [0, -15],
});
map.addOverlay(popupOverlay);

// Show popup on hover
map.on('pointermove', function (event) {
  const feature = map.forEachFeatureAtPixel(event.pixel, function (feat) {
    return feat;
  });

  if (feature && feature.get('name')) {
    const coord = feature.getGeometry().getCoordinates();
    popupOverlay.setPosition(coord);
    popupElement.innerHTML = `<p><b>${feature.get('name')}</b></p><i>Exact location after booking</i>`;
    popupElement.style.display = 'block';
  } else {
    popupElement.style.display = 'none';
  }
});