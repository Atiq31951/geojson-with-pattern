import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MyMap from "./components/MyMap";

function App() {
  return (
    <div className="App">
      <MyMap />
    </div>
  );
}

export default App;
