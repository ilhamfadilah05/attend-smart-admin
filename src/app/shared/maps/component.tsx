"use client";

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { dataMarker } from "./data";

const defaultMapContainerStyle = {
  width: "100%",
  height: "90vh",
  borderRadius: "15px",
};

const defaultMapCenter = { lat: -1.1299082437061079, lng: 113.96941328124997 };

enum MapTypeId {
  ROADMAP = "roadmap",
  SATELLITE = "satellite",
  HYBRID = "hybrid",
  TERRAIN = "terrain",
}

const MapComponent = () => {
  const [markers, setMarkers] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    dataMarker.forEach((marker) => {
      setMarkers((prev) => [...prev, <MarkerF key={Math.random()} position={marker} />]);
    });
  }, []);

  return (
    <div className="col-span-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={5}
        options={{
          zoomControl: true,
          tilt: 0,
          gestureHandling: "auto",
          // mapTypeControlOptions: {
          //   mapTypeIds: [MapTypeId.ROADMAP, MapTypeId.SATELLITE, MapTypeId.HYBRID, MapTypeId.TERRAIN],
          //   position: google.maps.ControlPosition.TOP_LEFT,
          // },
          mapTypeId: MapTypeId.ROADMAP,
        }}
        // onClick={(e) => {
        //   if (e.latLng) {
        //     setMarkers((prev) => [...prev, <MarkerF key={Math.random()} position={e.latLng || { lat: 0, lng: 0 }} />]);
        //   }
        // }}
      >
        {...markers}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
