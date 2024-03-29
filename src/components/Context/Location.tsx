import { useModal } from "@/hooks/useModal";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import Places from "../Location/Places";

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
  const { toggle, setSelected } = useModal();

  const updateLocation = useCallback((newLocation: TLocation) => {
    setLocation(newLocation);
    localStorage.setItem("location", JSON.stringify(newLocation));
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");

    if (savedLocation && JSON.parse(savedLocation)) {
      setLocation(JSON.parse(savedLocation));
    } else {
      toggle();
      setSelected(<Places handleClose={toggle} />);
    }
  }, [toggle, setSelected]);

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
