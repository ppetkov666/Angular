import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, LatLng, } from 'leaflet';
import { coordinatesMap, coordinatesMapWithMessage } from './coordinates';
declare let L: { icon: (arg0: { iconSize: number[]; iconAnchor: number[]; iconUrl: string; shadowUrl: string; }) => any; };
declare let M: { icon: 
  (arg0: { 
    iconRetinaUrl: string;
    iconUrl: string;
    shadowUrl: string;
    iconSize: number[]; 
    iconAnchor: number[];     
    popupAnchor: number[];
    tooltipAnchor: number[];
    shadowSize: number[];
  }) => any; };


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) => {
      let latitude: string = '';
      let longitude: string = '';
      latitude = value.latitude.toString();
      longitude = value.longitude.toString();
      if(latitude.indexOf(',') > -1) latitude = latitude.replace(',','.')
      if(longitude.indexOf(',') > -1) longitude = longitude.replace(',','.')
            
      
      const m = marker([parseFloat(latitude), parseFloat(longitude)], this.icon)
      if (value.message) {
        m.bindPopup(value.message, { autoClose: false, autoPan: false });
      }
      return m
    }
    );

    var test = this.layers;

  }

  @Input()
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  editMode: boolean = true;

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
    if (this.editMode) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log({ latitude, longitude });
      this.layers = [];      
      this.layers.push(marker([latitude, longitude], this.icon));
      this.onSelectedLocation.emit({ latitude, longitude })
    }


  }

}
