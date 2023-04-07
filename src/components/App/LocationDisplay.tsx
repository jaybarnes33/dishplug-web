import { useLocation } from "../Context/Location";

import { FaMapMarkerAlt } from "react-icons/fa";

import { useModal } from "@/hooks/useModal";

const LocationDisplay = () => {
  const { location } = useLocation();
  const { toggle } = useModal();
  return (
    <>
      <button className="flex items-center gap-1 " onClick={toggle}>
        <FaMapMarkerAlt size={15} className="text-dark" />
        <span className="text-xs mt-1">
          {location.deliveryLocation.split(",,")[0]}
        </span>
      </button>
    </>
  );
};

export default LocationDisplay;
