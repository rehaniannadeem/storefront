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
import { toast } from 'react-toastify';


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
function MyComponent({ setAddress,setLocation }: any) {
  const [value, setValue] = useState(null);
  const[city,setCity]=useState<any>({
    city:"",
    country:""
  })

  setLocation(city)
  setAddress(value);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });
    //  console.log(value, "selected");
  return isLoaded ? <Map setValue={setValue} setCity={setCity} /> : <>Loading...</>;
}
function Map({ setValue,setCity }: any) {
  const geolocation = useGeolocation();
  const [selected, setSelected] = useState<any>(null);
  const [address, setAddress] = useState(null);
const[location,setLocation]=useState<any>({
  city:"",
  country:""
})

//  console.log(address,'dfslkjflsdf');
// console.log(geolocation.longitude,'ddddd');

useEffect(() => {
  setSelected({
    lat: geolocation.latitude,
    lng: geolocation.longitude,
  });
}, [geolocation.latitude, geolocation.longitude]);
  // useEffect(() => {
  //   setSelected({
  //     lat: geolocation.latitude,
  //     lng: geolocation.longitude,
  //   });

  //   /*   console.log(selected, "location");
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   }); */
  // }, [geolocation]);

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
  setCity(location)
// console.log(selected,'selected');

  return (
    <>
      <div>
        <PlaceAutocomplete setSelected={setSelected} setAddress={setAddress} setLocation={setLocation} />
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
const PlaceAutocomplete = ({ setSelected, setAddress,setLocation }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // console.log(value,'value');
  const[newLocation,setNewLocation]=useState<any>({
    city:"",
    country:""
  })


  setAddress(value);
  setLocation(newLocation)
  const geolocation = useGeolocation();
  // const[isLoading,setLoading]=useState(false)
  // const[newVal,setNewVal]=useState<any>()
  // const [currentLocation, setCurrentLocation] = useState<any>({
  //   lat: geolocation.latitude,
  //   lng:  geolocation.longitude,
  // });
  const { t } = useTranslation();
  const handleSelect = async (address: any) => {
    // console.log(address,'address');
    setValue(address, false);
    clearSuggestions();
    const result = await getGeocode({ address });
      // console.log(result,'resuot');
    
    const { lat, lng } = await getLatLng(result[0]);
    setSelected({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results:any, status) => {
        if (status === 'OK' && results[0]) {
          // console.log(results);
          
        setAddress(results[0].formatted_address)
        setValue(results[0].formatted_address)
        const addressComponents = results[0].address_components;
        const cityObj = addressComponents.find(
          (component:any) =>
            component.types.includes('locality') ||
            component.types.includes('administrative_area_level_1')
        );
        const countryObj = addressComponents.find(
          (component:any) => component.types.includes('country')
        );

        if (cityObj &&  countryObj) {
          setNewLocation({
            city:cityObj.long_name,
            country:countryObj.long_name
          })
          // console.log(cityObj.long_name);
        }
        // if (countryObj) {
        //   console.log(countryObj.long_name);
        // }
        } else {
          toast.error('Unable to retrieve address');
        }
      });
  };
// console.log(currentLocation,'location');

  // useEffect(() => {
  //   //  let lat: any = ;
  //   // let lng: any = ;
  //   setCurrentLocation({
  //     lat: geolocation.latitude,
  //     lng: geolocation.longitude,
  //   });
  //   //console.log(lat, lng);
  //   /*  if (lat != null) {
  //     Geocode.fromLatLng(lat, lng).then(
  //       (response: any) => {
  //         // console.log(response, "address");
  //         const address = response.results[0].formatted_address;

  //         setValue(address);
  //         //setCurrentLocation(address);
  //         console.log(address, "address");
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       }
  //     );
  //   } */
  // }, [geolocation.latitude, geolocation.longitude]);
  
  useEffect(() => {
  
    if (geolocation.latitude && geolocation.longitude) {
   
      // console.log(geolocation.latitude);
      // console.log(geolocation.longitude);
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: geolocation.latitude, lng: geolocation.longitude };
      geocoder.geocode({ location: latlng }, (results:any, status) => {
        if (status === 'OK' && results[0]) {
          // console.log(results,'result');
        setAddress(results[0].formatted_address)
        setValue(results[0].formatted_address)
        const addressComponents = results[0].address_components;
        const cityObj = addressComponents.find(
          (component:any) =>
            component.types.includes('locality') ||
            component.types.includes('administrative_area_level_1')
        );
        const countryObj = addressComponents.find(
          (component:any) => component.types.includes('country')
        );

        if (cityObj &&  countryObj) {
          setNewLocation({
            city:cityObj.long_name,
            country:countryObj.long_name
          })
          
        }
        // if (countryObj) {
        //   console.log(countryObj.long_name);
        // }
    
        } else {
          toast.error('Unable to retrieve address');
         
        }
       
      });
     
    }
    
  }, [geolocation]);


  // useEffect(() => {
  //   setIsLoading(true)
  //   if(currentLocation.lat != null){
     
  //     Geocode.fromLatLng(currentLocation.lat, currentLocation.lng).then(
  //       (response: any) => {
  //         //  console.log(response, "address");
  //         const address = response.results[0].formatted_address;
  //         setValue(address);
  //         setSelected(currentLocation.lat, currentLocation.lng);
  //         //setCurrentLocation(address);
  //          console.log(address, "address");
  //         setIsLoading(false)
  //       },
  //       (error: any) => {
  //         console.error(error,'error');
  //         setIsLoading(false)
  //       }
  //     );
  //   }

  // }, [currentLocation]);


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
