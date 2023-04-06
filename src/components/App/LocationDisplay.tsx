import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import { useLocation } from "../Context/Location";
import type { IProps as MapProps } from "./Map";
import { FaMapMarkerAlt } from "react-icons/fa";
import colors from "@/styles/colors";

const LocationDisplay = () => {
  const { location } = useLocation();
  const [showMap, setShowMap] = useState(false);
  const [MapComponent, setMapComponent] =
    useState<React.ComponentType<MapProps> | null>(null);

  const handleOpen = () => {
    setShowMap(true);
    if (!MapComponent) {
      const MapDialog = dynamic(() => import("./Map"), {
        suspense: true
      });
      setMapComponent(MapDialog);
    }
  };

  const handleClose = () => {
    setShowMap(false);
  };

  return (
    <>
      <button className="flex items-center gap-1 " onClick={handleOpen}>
        <FaMapMarkerAlt size={15} className="text-primary" />
        <span className="text-xs mt-1">{location.deliveryLocation}</span>
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
