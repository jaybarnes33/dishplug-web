import { useAuth } from "@/components/Context/Auth";
import { IPageProps, TValues } from "@/pages/checkout/[path]";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Container, Form } from "react-bootstrap";

const Address = ({ updateDetails }: IPageProps) => {
  const { user } = useAuth();
  const { replace } = useRouter();

  const onSubmit = (values: TValues) => {
    updateDetails(values);
    replace("/checkout/placeorder");
  };

  const { getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      name: user?.displayName || "",
      location: "",
      phone: user?.phoneNumber || ""
    },
    onSubmit
  });

  return (
    <Container className="d-flex justify-content-center">
      <Head>
        <title>Address</title>
      </Head>
      <Form style={{ minWidth: "70%" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...getFieldProps("name")}
            id="name"
            required
            placeholder="Yaa Mansah"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            {...getFieldProps("location")}
            id="location"
            placeholder="Ex. KT Hall or Hilda Hostel"
            required
          />
          <small>
            Enter the name of your hostel, hall or landmark near you
          </small>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            {...getFieldProps("phone")}
            id="phone"
            placeholder="Ex. 0240000000"
            required
          />
          <small>
            Please enter a working phone number, your delivery guy will call on
            this line
          </small>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" size="lg" variant="warning">
            Continue
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Address;
