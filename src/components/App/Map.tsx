import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "../Context/Location";
import classes from "../../styles/dialog.module.scss";
import { FaRegTimesCircle } from "react-icons/fa";

export interface IProps {
  open: boolean;
  handleClose: () => void;
}

const Map = ({ open, handleClose }: IProps) => {
  const runCount = useRef(0);
  const { location, updateLocation } = useLocation();
  const [selectedCoords, setSelectedCoords] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [service, setService] =
    useState<google.maps.places.PlacesService | null>(null);

  const initMap = useCallback(() => {
    const newMap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 13,
        clickableIcons: true,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          }
        ]
      }
    );

    setMap(newMap);
  }, []);

  useEffect(() => {
    if (map && google.maps.places) {
      const service = new google.maps.places.PlacesService(map);
      setService(service);
    }
  }, [map]);

  useEffect(() => {
    if (open) {
      initMap();
    }
  }, [open, initMap]);

  useEffect(() => {
    if (map && service && !runCount.current) {
      const updateMarkerPosition = (
        position: google.maps.LatLngLiteral | null
      ) => {
        if (position) {
          const marker = new google.maps.Marker({
            position,
            map,
            animation: google.maps.Animation.DROP
          });

          setMarker(marker);
          map.setCenter(position);
          map.setZoom(17);
        }
      };

      if (location.coords?.lat && location.coords.lng) {
        updateMarkerPosition(location.coords);
      } else {
        service?.findPlaceFromQuery(
          {
            query: location.deliveryLocation,
            fields: ["name", "geometry"],
            locationBias: location.coords || undefined
          },
          (results, status) => {
            if (
              status == google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              for (const result of results) {
                const position = result.geometry?.location?.toJSON() || null;
                updateMarkerPosition(position);
              }
            }
          }
        );
      }

      runCount.current += 1;
    }
  }, [map, location, service]);

  useEffect(() => {
    if (map && marker) {
      map.addListener("click", ({ latLng }: { latLng: google.maps.LatLng }) => {
        marker.setPosition(latLng);
        map.panTo(latLng);
        setSelectedCoords(latLng.toJSON());
      });
    }
  }, [map, marker]);

  useEffect(() => {
    if (map && selectedCoords) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: selectedCoords }, locations => {
        const newLocation = {
          city: "",
          deliveryLocation: "",
          coords: selectedCoords
        };

        newLocation.city =
          locations?.find(location => location.types.includes("locality"))
            ?.address_components[0].long_name || "";

        newLocation.deliveryLocation =
          locations?.find(location =>
            [
              "premise",
              "street_address",
              "establishment",
              "route",
              "neighborhood",
              "administrative_area_level_2",
              "sublocality"
            ].some(type => location.types.includes(type))
          )?.formatted_address || "";

        updateLocation(newLocation);
      });
    }
  }, [map, selectedCoords, updateLocation]);

  return createPortal(
    <div
      role="dialog"
      id="delivery-location"
      className={classes.full_screen_dialog}
    >
      <div id="dialog-header" className={classes.header}>
        <h2>Select Delivery Location</h2>
        <button aria-label="close map" onClick={handleClose}>
          <FaRegTimesCircle size={20} />
        </button>
      </div>
      <section id="map" style={{ width: "100%", height: "100%" }}></section>
      <Script
        onLoad={initMap}
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}&libraries=places`}
      />
    </div>,
    document.body
  );
};

export default Map;
