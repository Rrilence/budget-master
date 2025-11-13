import { useGeolocated } from "react-geolocated";

export const useLocation = () => {
    const {coords, 
      isGeolocationAvailable, isGeolocationEnabled,
       positionError} = useGeolocated({
           positionOptions: {
             enableHighAccuracy: false,
           },
           userDecisionTimeout: 5000,
        })

   return {
    lat: coords?.latitude || null,
    lng: coords?.longitude || null,
    locationError: positionError,
    available: isGeolocationAvailable,
    enable: isGeolocationEnabled,
   }
}