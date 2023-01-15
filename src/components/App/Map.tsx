import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "../Context/Location";
import classes from "../../styles/dialog.module.scss";

export interface IProps {
  open: boolean;
  handleClose: () => void;
}

const Map = ({ open, handleClose }: IProps) => {
  const { location } = useLocation();
  const [selectedCoords, setSelectedCoords] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

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
    if (open) {
      initMap();
    }
  }, [open, initMap]);

  useEffect(() => {
    if (map) {
      const infoWindow = new google.maps.InfoWindow();

      function handleLocationError(
        browserHasGeolocation: boolean,
        infoWindow: google.maps.InfoWindow,
        pos: google.maps.LatLng
      ) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );

        if (map) infoWindow.open(map);
      }

      if (google.maps.places) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            const service = new google.maps.places.PlacesService(map);
            service?.findPlaceFromQuery(
              {
                query: location,
                fields: ["name", "geometry"],
                locationBias: pos
              },
              (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                  console.log(results);
                  for (const result of results) {
                    const position = result.geometry?.location.toJSON();

                    const marker = new google.maps.Marker({
                      position,
                      map,
                      animation: google.maps.Animation.DROP
                    });

                    setMarker(marker);
                    if (position) {
                      map.setCenter(position);
                      map.setZoom(17);
                    }
                  }
                }
              }
            );

            // setMarker(marker);
            map.setCenter(pos);
          },
          err => {
            handleLocationError(true, infoWindow, map.getCenter());
            console.log(err);
          },
          { enableHighAccuracy: true }
        );
      }
    }
  }, [map]);

  useEffect(() => {
    if (map && marker) {
      map.addListener("click", ({ latLng }) => {
        marker.setPosition(latLng);
        map.panTo(latLng);
        setSelectedCoords(latLng.toJSON());
      });
    }
  }, [map, marker]);

  useEffect(() => {
    if (map && selectedCoords) {
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: selectedCoords,
          radius: 150
        },
        results => {
          console.log(results);
        }
      );
    }
  }, [map, selectedCoords]);

  return createPortal(
    <div
      role="dialog"
      id="delivery-location"
      className={classes.full_screen_dialog}
    >
      <div id="dialog-header" className={classes.header}>
        <h2>Select Delivery Location</h2>
        <button
          className={classes.close_icon}
          aria-label="close map"
          onClick={handleClose}
        >
          <i>X</i>
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
