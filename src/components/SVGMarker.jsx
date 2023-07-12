import React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

class SvgMarker extends MapLayer {
  createLeafletElement(props) {
    const { data } = props;

    const pointToLayer = (feature, latlng) => {
      const { svg } = feature.properties;

      const icon = L.divIcon({
        className: 'svg-marker-icon',
        html: `<svg>${svg}</svg>`
      });

      return L.marker(latlng, { icon });
    };

    return L.geoJSON(data, { pointToLayer });
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
  }
}

export default withLeaflet(SvgMarker);
