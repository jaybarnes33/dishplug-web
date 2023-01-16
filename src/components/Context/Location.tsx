import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

interface IProviderProps {
  children: React.ReactNode;
}

type TLocation = {
  city: string;
  deliveryLocation: string;
  coords: google.maps.LatLngLiteral | null;
};

interface IContextProps {
  location: TLocation;
  updateLocation: (newLocation: TLocation) => void;
}

const LocationContext = createContext<IContextProps | null>(null);

const LocationProvider = ({ children }: IProviderProps) => {
  const [location, setLocation] = useState<TLocation>({
    city: "",
    deliveryLocation: "",
    coords: null
  });

  const updateLocation = useCallback((newLocation: TLocation) => {
    setLocation(newLocation);
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");

    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    } else {
      const deliveryLocation = prompt("Enter your location?");
      if (deliveryLocation) {
        setLocation(prevLocation => ({ ...prevLocation, deliveryLocation }));
      }
    }
  }, []);

  useEffect(() => {
    if (location.city || location.deliveryLocation) {
      localStorage.setItem("location", JSON.stringify(location));
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
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
