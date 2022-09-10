import { useAuth } from "@/components/Context/Auth";
import { formatPhone } from "@/helpers/utils";
import { IPageProps, TValues } from "@/pages/checkout/[path]";
import colors from "@/styles/colors";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";

import CartFooter from "../Cart/CartFooter";

const Address = ({ updateDetails, details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const [storedInfo, setStoredInfo] = useState<Omit<
    typeof details,
    "paymentMethod"
  > | null>(null);
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      e => console.log(e),
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    const storedInfo = localStorage.getItem("address-info");
    if (storedInfo) setStoredInfo(JSON.parse(storedInfo));
  }, []);

  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (res, status) => {
      if (status === "OK") {
        setCity(res[0]?.formatted_address);
      }
    });
  }, [location]);
  const onSubmit = (values: TValues) => {
    updateDetails(values);
    localStorage.setItem("address-info", JSON.stringify(values));
    replace("/checkout/placeorder");
  };

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      name: user?.displayName || storedInfo?.name || "",
      location: storedInfo?.location || city,
      phone: formatPhone(user?.phoneNumber || storedInfo?.phone || "", "local"),
      email: user?.email || storedInfo?.email || "",
      paymentMethod: details.paymentMethod
    },
    onSubmit
  });

  const handleEdit = () => {
    console.log("hello");
  };

  return (
    <Container>
      <Head>
        <title>Address</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <div
          className="py-3 mb-3"
          style={{
            backgroundColor: "white",
            borderRadius: 22,
            boxShadow: "12px 26px 50px rgba(90, 108, 234, 0.07)"
          }}
        >
          <div className="d-flex justify-content-between mb-2 px-4">
            <small className="text-muted ps-2">Deliver to</small>
            <small
              style={{ color: colors.accent2, cursor: "pointer" }}
              onClick={handleEdit}
            >
              Edit
            </small>
          </div>
          <div className="d-flex justify-content-between px-4 align-items-center">
            <Button
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: colors.accent,
                border: "none",
                width: 40,
                height: 40,
                borderRadius: 40
              }}
            >
              <FaMapMarkerAlt color={colors.accent2} size={25} />
            </Button>
            <span>{city}</span>
          </div>
        </div>
        <div
          className="my-3 py-3 "
          style={{
            backgroundColor: "white",
            borderRadius: 22,
            boxShadow: "12px 26px 50px rgba(90, 108, 234, 0.07)"
          }}
        >
          <div className="d-flex justify-content-between mb-2 ">
            <small className="text-muted px-4">Payment Method</small>
          </div>
          <div className="d-flex justify-content-between gap-4 px-4 align-items-center">
            <FaMoneyBillAlt
              color={colors.accent2}
              size={50}
              style={{ transform: "rotate(-45deg)" }}
            />
            <div>
              <Form.Check
                {...getFieldProps("paymentMethod")}
                type="radio"
                id="payment-on-delivery"
                value="delivery"
                inline
                label="Payment on delivery"
              />
              <Form.Check
                {...getFieldProps("paymentMethod")}
                type="radio"
                inline
                id="online-payment"
                label="Pay now"
                value="online"
              />
            </div>
          </div>
        </div>
        <CartFooter />
      </Form>
    </Container>
  );
};

export default Address;
