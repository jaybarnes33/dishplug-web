import { createContext, useContext, useEffect, useState } from "react";

interface IProviderProps {
  children: React.ReactNode;
  searchedLocation?: string;
}

interface IContextProps {
  location: string;
}

const LocationContext = createContext<IContextProps | null>(null);

const LocationProvider = ({ children, searchedLocation }: IProviderProps) => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (searchedLocation) {
      setLocation(searchedLocation);
      localStorage.setItem("location", searchedLocation);
    } else {
      const savedLocation = localStorage.getItem("location");
      if (savedLocation) setLocation(savedLocation);
      else {
        const newLocation = prompt("Enter your location?");
        if (newLocation) {
          setLocation(newLocation);
          localStorage.setItem("location", newLocation);
        }
      }
    }
  }, [searchedLocation]);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("`useLocation` was called without a Provider");
  }

  return context;
};

export default LocationProvider;
