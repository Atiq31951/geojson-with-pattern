import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

function PatternLayer() {
  const map = useMap();

  useEffect(() => {
    console.log("L", L);
    const patternLayer = L.canvasLayer()
      .delegate(
        // {
        // onDraw: function (info) {
        //   const ctx = info.canvas.getContext('2d');
        //   ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
        //   drawPattern(ctx, info);
        // },
        // }
        this
      )
      .addTo(map);

    return () => {
      map.removeLayer(patternLayer);
    };
  }, [map]);

  const drawPattern = (ctx, info) => {
    const patternOptions = {
      pattern: 'diagonalSquares',
      foreground: '#FF0000', // Pattern color
      background: '#0000FF', // Background color
      opacity: 1, // Pattern opacity (0-1)
      size: 10, // Pattern size (pixels)
      angle: 45, // Pattern angle (degrees)
    };

    const foreground = patternOptions.foreground;
    const background = patternOptions.background;
    const size = patternOptions.size;
    const angle = patternOptions.angle;
    const opacity = patternOptions.opacity;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, info.canvas.width, info.canvas.height);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = foreground;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();
    ctx.save();
    ctx.strokeStyle = foreground;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-size / 2, -size / 2);
    for (let i = -size * 2; i < size * 2; i += size) {
      ctx.moveTo(i, -size * 2);
      ctx.lineTo(i, size * 2);
      ctx.moveTo(-size * 2, i);
      ctx.lineTo(size * 2, i);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  return null;
}

export default PatternLayer;
