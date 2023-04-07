import React, { useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Input from "../Core/Input";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbLocation } from "react-icons/tb";
import { BsX } from "react-icons/bs";
import { useLocation } from "../Context/Location";
import Spinner from "../Core/Spinner";
interface IProps {
  open: boolean;
  handleClose: () => void;
}
const Places = ({ open, handleClose }: IProps) => {
  const [address, setAddress] = useState("");

  const { location, updateLocation } = useLocation();
  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = async (address: string) => {
    const locObj = {
      city: "",
      coords: { lat: 0, lng: 0 },
      deliveryLocation: ""
    };
    try {
      const results = await geocodeByAddress(address);
      console.log(results);
      locObj["city"] = results[0].address_components[1].long_name;
      locObj["deliveryLocation"] = results[0].formatted_address;

      locObj["coords"] = await getLatLng(results[0]);
      console.log(locObj.coords);
      updateLocation(locObj);
    } catch (error) {
      console.error("Error", error);
    } finally {
      handleClose();
    }
  };
  const className = "p-2  hover:bg-gray-50 m-2 text-sm";
  return open ? (
    <dialog
      onClose={handleClose}
      className="w-full h-full  bg-[#1a1a1aae] fixed grid justify-center top-0 left-0 z-[9999]"
    >
      <div className="bg-white p-7  rounded-3xl h-screen w-screen md:h-[500px] md:w-[500px] md:mt-5">
        <div className="flex justify-between items-center mb-4">
          <h1>Delivery location</h1>
          <button
            className="h-10 w-10 flex justify-center items-center border rounded-full"
            onClick={() => handleClose()}
          >
            <BsX size={20} />
          </button>
        </div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <>
              <div className="flex bg-gray-50 items-center py-1 gap-2 px-2 rounded ">
                <FaMapMarkerAlt size={17} className="text-primary2" />
                <Input
                  {...getInputProps({
                    placeholder: "Search Places ..."
                  })}
                />
                {loading && <Spinner />}
              </div>
              {!suggestions.length && location.city && (
                <div
                  className="flex  gap-2 py-3 border-b cursor-pointer "
                  onClick={() => {
                    updateLocation(location);
                    handleClose();
                  }}
                >
                  <TbLocation className="text-primary2 mt-1" />
                  <div className="flex-col">
                    <h2 className="text-sm">Use your current location</h2>
                    <span className="text-neutral-500 text-xs">
                      {location.deliveryLocation}
                    </span>
                  </div>
                </div>
              )}

              <div className=" shadow top-4 bg-white mt-5 ">
                {suggestions.map(suggestion => {
                  // inline style for demonstration purpose

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      </div>
    </dialog>
  ) : null;
};

export default Places;
