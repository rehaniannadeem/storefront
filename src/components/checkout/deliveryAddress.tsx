import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useGeolocation from "react-hook-geolocation";
import Geocode from "react-geocode";

let API_KEY: string = process.env.NEXT_PUBLIC_MAP_API_KEY!;

Geocode.setApiKey(API_KEY);
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useTranslation } from "next-i18next";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "1rem",
};

/* const center = {
  lat: 30.042945,
  lng: 70.01953,
};
 */
function MyComponent({ setAddress }: any) {
  const [value, setValue] = useState(null);
  setAddress(value);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });
  // console.log(value, "selected");
  return isLoaded ? <Map setValue={setValue} /> : <>Loading...</>;
}
function Map({ setValue }: any) {
  const geolocation = useGeolocation();
  const [selected, setSelected] = useState<any>(null);
  const [address, setAddress] = useState(null);



  useEffect(() => {
    setSelected({
      lat: geolocation.latitude,
      lng: geolocation.longitude,
    });

    /*   console.log(selected, "location");
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    }); */
  }, [geolocation]);

  /*  const [map, setMap] = React.useState(null);
 
     const onLoad = React.useCallback(function callback(map) {
 
         const bounds = new window.google.maps.LatLngBounds(center);
         map.fitBounds(bounds);
 
         setMap(map);
     }, []);
 
     const onUnmount = React.useCallback(function callback(map) {
         setMap(null);
     }, []); */
  setValue(address);

  return (
    <>
      <div>
        <PlaceAutocomplete setSelected={setSelected} setAddress={setAddress} />
      </div>
      <div className="my-4 ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selected}
          zoom={10}

          // onLoad={onLoad}
          //onUnmount={onUnmount} */
          //  autocomplete={true}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </>
  );
}
const PlaceAutocomplete = ({ setSelected, setAddress }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: null,
    lng: null,
  });

  setAddress(value);
  const geolocation = useGeolocation();
  const { t } = useTranslation();
  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();
    const result = await getGeocode({ address });
    console.log(result,'resuot');
    
    const { lat, lng } = await getLatLng(result[0]);
    setSelected({ lat, lng });
  };

  useEffect(() => {
    //  let lat: any = ;
    // let lng: any = ;
    setCurrentLocation({
      lat: geolocation.latitude,
      lng: geolocation.longitude,
    });
    //console.log(lat, lng);
    /*  if (lat != null) {
      Geocode.fromLatLng(lat, lng).then(
        (response: any) => {
          // console.log(response, "address");
          const address = response.results[0].formatted_address;

          setValue(address);
          //setCurrentLocation(address);
          console.log(address, "address");
        },
        (error: any) => {
          console.error(error);
        }
      );
    } */
  }, [geolocation]);
  useEffect(() => {
    Geocode.fromLatLng(currentLocation.lat, currentLocation.lng).then(
      (response: any) => {
        // console.log(response, "address");
        const address = response.results[0].formatted_address;

        setValue(address);
        setSelected(currentLocation.lat, currentLocation.lng);
        //setCurrentLocation(address);
        console.log(address, "address");
      },
      (error: any) => {
        console.error(error);
      }
    );
  }, [currentLocation.lat != null]);

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        className="border-solid border-2 p-2 border-gray-300 rounded w-full  "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder={t("forms:delivery-address")}
        required
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data?.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default React.memo(MyComponent);
