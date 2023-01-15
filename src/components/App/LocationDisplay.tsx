import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import { useLocation } from "../Context/Location";
import type { IProps as MapProps } from "./Map";
import classes from "../../styles/header.module.scss";

const LocationDisplay = () => {
  const { location } = useLocation();
  const [showMap, setShowMap] = useState(false);
  const [MapComponent, setMapComponent] =
    useState<React.ComponentType<MapProps> | null>(null);

  const handleOpen = () => {
    setShowMap(true);
    console.log("first");
    if (!MapComponent) {
      const MapDialog = dynamic(() => import("./Map"), {
        suspense: true
      });
      setMapComponent(MapDialog);
    }
  };

  const handleClose = () => {
    console.log("first");
    setShowMap(false);
  };

  return (
    <>
      <button className={classes.location} onClick={handleOpen}>
        <i className="start-icon">i</i>
        {location}
      </button>
      <Suspense fallback={<p>...Loading</p>}>
        {showMap && MapComponent ? (
          <MapComponent open={showMap} handleClose={handleClose} />
        ) : null}
      </Suspense>
    </>
  );
};

export default LocationDisplay;
