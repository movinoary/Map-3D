import React, { useState } from "react";
import { Map, Source, Layer } from "react-map-gl";
import geoJSONData from "./demografi_kelurahan_semarang.geojson";

// import styles from "./App.module.css";
import "./App.css";
import { useRef } from "react";

const App = () => {
  const map = useRef(null);
  const [categori, setCategori] = useState("");
  const [viewLayer, setViewLayer] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: -7.01,
    longitude: 110.4201,
    zoom: 5,
    pitch: 0,
    bearing: 0,
  });

  const changeScroll = (zoom, pitch, bearing, layer, categori) => {
    setViewport({
      zoom: zoom,
      pitch: pitch,
      bearing: bearing,
    });
    setViewLayer(layer);
    setCategori(categori);
  };

  const handleScroll = () => {
    if (window.scrollY <= 20) {
      changeScroll(5, 0, 0, false, null);
    } else if (window.scrollY <= 790) {
      changeScroll(7, 0, 0, false, null);
    } else if (window.scrollY <= 1570) {
      changeScroll(10, 40, 30, true, "TAMAT SD");
    } else if (window.scrollY <= 2360) {
      changeScroll(10, 40, 90, true, "SLTP");
    } else if (window.scrollY <= 3120) {
      changeScroll(10, 40, 120, true, "SLTA");
    }
  };

  window.addEventListener("scroll", handleScroll);

  const layerStyle = {
    type: "fill-extrusion",
    className: "3D-style",
    paint: {
      "fill-extrusion-color": [
        "interpolate",
        ["linear"],
        ["get", categori],
        10,
        "#29B7A4",
        100,
        "#037FFF",
      ],
      "fill-extrusion-height": ["get", categori],
      "fill-extrusion-base": 0,
    },
  };

  return (
    <>
      <section>
        <Map
          style={{ width: "100%", height: "100vh", zIndex: "-99" }}
          latitude={-7.01}
          zoom={viewport.zoom}
          pitch={viewport.pitch}
          bearing={viewport.bearing}
          longitude={110.4201}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          ref={map}
          mapboxAccessToken="pk.eyJ1Ijoidmlub2FyeXN0aW8iLCJhIjoiY2w2czRtNzYxMG1xbDNrbGo1N3k4a3NuciJ9.VHdXy-kV3UZLqcFF601K6A"
        >
          {viewLayer && (
            <Source id="geojson-data" type="geojson" data={geoJSONData}>
              <Layer
                {...layerStyle}
                id="demografi-layer"
                source="geojson-data"
              />
            </Source>
          )}
        </Map>
      </section>
      <section>
        <Title text="Pertama" />
      </section>
      <section>
        <Title text="Kedua" />
      </section>
      <section>
        <Title text="Ketiga" />
      </section>
      <section>
        <Title text="Keempat" />
      </section>
      <section>
        <Title text="Kelima" />
      </section>
    </>
  );
};

export default App;

const Title = ({ text }) => {
  return <h1 className="title">{text}</h1>;
};

// // Fly To
// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         coordinates: [106.816666, -6.2],
//         type: "Point",
//       },
//     },
//   ],
// };
// let [minLng, minLat, maxLng, maxLat] = bbox(geojson);

// console.log(map);
// const buttonhandle = () => {
//   if (map) {
//     console.log("active");
//     map?.current?.flyTo({
//       center: [106.816666, -6.2],
//       zoom: 9,
//       speed: 0.2,
//       curve: 1,
//     });
//   }
// };
