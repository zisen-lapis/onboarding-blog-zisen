import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

// import {GeoJSON} from "leaflet";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  map: L.Map = {} as L.Map;

  // icon = {
  //   icon: L.icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [13, 0],
  //     // specify the path here
  //     iconUrl: './node_modules/leaflet/dist/images/marker-icon.png',
  //     shadowUrl: './node_modules/leaflet/dist/images/marker-shadow.png',
  //   }),
  // };

  ngOnInit() {
    const iconRetinaUrl = 'assets/media/marker-icon-2x.png';
    const iconUrl = 'assets/media/marker-icon.png';
    const shadowUrl = 'assets/media/marker-shadow.png';
    Marker.prototype.options.icon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map').setView([-37.8, 144.9], 13);
    const geojsonFeature: any = {
      type: 'Feature',
      properties: {
        name: 'Coors Field',
        amenity: 'Baseball Stadium',
        popupContent: 'This is where the Rockies play!',
      },
      geometry: {
        type: 'Point',
        coordinates: [-37.8, 144.9],
      },
    };
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.geoJSON(geojsonFeature).addTo(this.map);
    // L.marker([-37.8, 144.9]).addTo(this.map);
  }
}