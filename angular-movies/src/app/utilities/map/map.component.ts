import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, } from 'leaflet';
import { coordinatesMap } from './coordinates';
declare let L: { icon: (arg0: { iconSize: number[]; iconAnchor: number[]; iconUrl: string; shadowUrl: string; }) => any; };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) => marker([value.latitude, value.longitude], this.icon));
  }

  @Input()
  initialCoordinates: coordinatesMap[] = [];

  @Output()
  onSelectedLocation = new EventEmitter<coordinatesMap>();

  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [14, 50],
      iconUrl: '/assets/marker.png',
      shadowUrl: '' //'./node_modules/leaflet/dist/images/marker-shadow.png'
    })
  };


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'My Angular movies'
      })
    ],
    zoom: 7,
    center: latLng(42.51796665297057, 385.59374973177916)
  };

  layers: Marker<any>[] = [];

  handleMapClick(event: LeafletMouseEvent) {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({ latitude, longitude });
    this.layers.push(marker([latitude, longitude], this.icon));
    this.onSelectedLocation.emit({ latitude, longitude })

  }

}
