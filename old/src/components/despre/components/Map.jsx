import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
  width: "700px",
  height: "600px",
};

const center = {
  lat: 44.44101517245693,
  lng: 26.04943152701459,
};

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I",
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={
        17.2222222222222222222222222222222222222222222222222222222222222222222222222
      }
      center={center}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default Map;
