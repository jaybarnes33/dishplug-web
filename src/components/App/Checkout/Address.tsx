import { useAuth } from "@/components/Context/Auth";
import { useLocation } from "@/components/Context/Location";
import { formatPhone } from "@/helpers/utils";
import { IPageProps, TValues } from "@/pages/checkout/[path]";
import colors from "@/styles/colors";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaMoneyBillAlt } from "react-icons/fa";

const Address = ({ updateDetails, details }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();
  const { location } = useLocation();
  const [storedInfo, setStoredInfo] = useState<Omit<
    typeof details,
    "paymentMethod"
  > | null>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem("address-info");
    if (storedInfo) setStoredInfo(JSON.parse(storedInfo));
  }, []);

  const onSubmit = (values: TValues) => {
    updateDetails(values);
    localStorage.setItem("address-info", JSON.stringify(values));
    replace("/checkout/placeorder");
  };

  const { values, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      name: user?.displayName || storedInfo?.name || "",
      location: location.deliveryLocation || storedInfo?.location || "",
      phone: formatPhone(user?.phoneNumber || storedInfo?.phone || "", "local"),
      email: user?.email || storedInfo?.email || "",
      paymentMethod: details.paymentMethod
    },
    onSubmit
  });

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
            <small className="text-muted">Address</small>
            {/* <small
              style={{ color: colors.accent2, cursor: "pointer" }}
              onClick={handleEdit}
            >
              Edit
            </small> */}
          </div>
          <Row className="mx-2">
            {/* <FaMapMarkerAlt color={colors.accent2} size={40} /> */}

            <Col xs={6} className="p-1">
              <Form.Group>
                <Form.FloatingLabel label="Name">
                  <Form.Control {...getFieldProps("name")} required />
                </Form.FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs={6} className="p-1">
              <Form.Group>
                <Form.FloatingLabel label="Phone">
                  <Form.Control
                    {...getFieldProps("phone")}
                    type="tel"
                    required
                  />
                </Form.FloatingLabel>
              </Form.Group>
            </Col>

            <Col md={6} className="p-1">
              <Form.Group>
                <Form.FloatingLabel label="location">
                  <Form.Control {...getFieldProps("location")} required />
                </Form.FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
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
              size={40}
              style={{ transform: "rotate(-45deg)" }}
            />
            <div>
              <Form.Check
                {...getFieldProps("paymentMethod")}
                type="radio"
                id="payment-on-delivery"
                value="delivery"
                inline
                required
                label="Payment on delivery"
              />
              <Form.Check
                {...getFieldProps("paymentMethod")}
                type="radio"
                inline
                id="online-payment"
                label="Pay now"
                required
                value="online"
              />
            </div>
          </div>
        </div>
        {values.paymentMethod === "online" && (
          <div
            className="my-3 py-3 "
            style={{
              backgroundColor: "white",
              borderRadius: 22,
              boxShadow: "12px 26px 50px rgba(90, 108, 234, 0.07)"
            }}
          >
            <div className="d-flex justify-content-between mb-2 ">
              <small className="text-muted px-4">Email</small>
            </div>

            <div className="d-flex px-4">
              <Form.Control
                {...getFieldProps("email")}
                type="email"
                placeholder="doe@gmail.com"
                required
              />
            </div>
          </div>
        )}

        <Button
          className="d-flex mx-auto"
          type="submit"
          style={{ backgroundColor: colors.primary, border: "none" }}
          size="lg"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Address;
