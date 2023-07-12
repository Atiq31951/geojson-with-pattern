import data from "../data/data.json";
// import { MapContainer, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import * as d3 from "d3";
import "./styles.css"; // Create a new CSS file (e.g., styles.css) for custom styles

// const patternOptions = {
//   radius: 5, // Radius of the pattern circles
//   className: "custom-pattern", // Custom CSS class for the pattern
// };

// const patternIds = [
//   {
//     id: "O-pattern-0-1",
//     href: "https://www.flaticon.com/free-icon/blanket_6630396?term=stripe+pattern&page=1&position=5&origin=search&related_id=6630396",
//   },
//   {
//     id: "O-pattern-1-2",
//     href: "https://www.flaticon.com/free-icon/blanket_6630396?term=stripe+pattern&page=1&position=5&origin=search&related_id=6630396",
//   },
//   {
//     id: "O-pattern-2-3",
//     href: "https://www.flaticon.com/free-icon/blanket_6630396?term=stripe+pattern&page=1&position=5&origin=search&related_id=6630396",
//   },
// ];

// const Layers = () => {
//   const map = useMap();
//   L.tileLayer(
//     "https://a.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}@2x.png",
//     { minZoom: 5, maxZoom: 18 }
//   ).addTo(map);

//   const patternChoice = () => Math.floor(Math.random() * 3);

//   const strokeColorScale = ["#addd8e", "#41ab5d", "#005a32"];
//   const fillColorScale = ["#d9f0a3", "#78c679", "#238443"];
//   const fillOpacity = 1.0;
//   const strokeWeight = 1.2;

//   const statesStyle = (feature) => {
//     const choice = patternChoice(); // applies a pattern at random
//     return {
//       color: strokeColorScale[choice],
//       fillColor: fillColorScale[choice],
//       fillOpacity: fillOpacity,
//       weight: strokeWeight,
//     };
//   };

//   const onEachFeature = (feature, layer) => {
//     layer.options.className = `custom-pattern`;
//   };

//   const statesLayer = L.geoJson(data, {
//     style: statesStyle,
//     onEachFeature,
//   }).addTo(map);

//   statesLayer.bindPopup((layer) => {
//     return layer.feature.properties.NAME;
//   });

//   const svg = d3.select(map.getPanes().overlayPane).append("svg");

//   const defs = svg.append("defs");

//   const patterns = defs
//     .selectAll("pattern")
//     .data(fillColorScale)
//     .join("pattern")
//     .attr("id", (_d, i) => patternIds[i].id)
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("width", 8)
//     .attr("height", 8)
//     .attr("patternUnits", "userSpaceOnUse")
//     .attr("patternContentUnits", "userSpaceOnUse")
//     .attr("patternTransform", "rotate(45)");

//   patterns.each(function (_, i) {
//     const pattern = d3.select(this);
//     pattern
//       .append("rect")
//       .attr("width", 8)
//       .attr("height", 8)
//       .attr("fill", fillColorScale[i]);

//     pattern
//       .append("circle")
//       .attr("cx", 4)
//       .attr("cy", 4)
//       .attr("r", patternOptions.radius)
//       .attr("class", patternOptions.className);
//   });

//   return null;
// };

// function MyMap() {
//   return (
//     <MapContainer
//       center={[63.56740077851593, 16.45771321520444]}
//       zoom={4}
//       style={{ height: "90vh", width: "90%" }}
//     >
//       <Layers />
//     </MapContainer>
//   );
// }

// export default MyMap;


import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapWithPatterns = () => {
  // GeoJSON data with pattern classes
  const geojsonData = data;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="..."
      />
      <GeoJSON
        data={geojsonData}
        style={(feature) => ({
          fillColor: feature.properties.class === "myFeatureClass" ? "url(#myPattern)" : "blue",
          color: "white",
          weight: 1,
          fillOpacity: 0.7,
        })}
      />
      <svg>
        <defs>
          <pattern
            id="myPattern"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="red" strokeWidth="2" />
          </pattern>
        </defs>
        <defs>
          <pattern
            id="myPattern-2"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <path d="M0,0 h10" stroke="red" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>
    </MapContainer>
  );
};

export default MapWithPatterns;