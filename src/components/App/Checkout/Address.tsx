import { useAuth } from "@/components/Context/Auth";
import { useLocation } from "@/components/Context/Location";
import Input from "@/components/Core/Input";
import { formatPhone } from "@/helpers/utils";
import { IPageProps, TValues } from "@/pages/checkout/[path]";
import colors from "@/styles/colors";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <div>
      <Head>
        <title>Address</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="md:max-w-[500px] md:mx-auto  p-3"
      >
        <div className="py-3 px-3 mb-3 bg-white border shadow rounded">
          <div className="grid grid-cols-2">
            <div className="flex flex-col p-1">
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <Input
                {...getFieldProps("name")}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="p-1 flex flex-col">
              <label htmlFor="phone">
                <small>Phone</small>
              </label>
              <Input
                {...getFieldProps("phone")}
                type="tel"
                required
                placeholder="054121231"
              />
            </div>
          </div>
          <div>
            <div className="p-1 flex flex-col">
              <label htmlFor="location">
                <small>Location</small>
              </label>
              <Input
                {...getFieldProps("location")}
                required
                placeholder="First Love"
              />
            </div>
          </div>
        </div>
        <div className="my-3 py-3 px-3 bg-white border shadow">
          <div className="flex justify-content-between mb-2 ">
            <small className="text-muted px-4">Payment Method</small>
          </div>
          <div className="flex justify-content-between gap-4 px-4 items-center">
            <FaMoneyBillAlt
              color={colors.accent2}
              size={40}
              style={{ transform: "rotate(-45deg)" }}
            />
            <div>
              <div className="flex items-center">
                <label htmlFor="online-payment">Pay now</label>
                <Input
                  {...getFieldProps("paymentMethod")}
                  type="radio"
                  id="online-payment"
                  required
                  value="online"
                />
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="payment-on-delivery">Payment on delivery</label>
                <Input
                  {...getFieldProps("paymentMethod")}
                  type="radio"
                  id="payment-on-delivery"
                  value="delivery"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        {values.paymentMethod === "online" && (
          <div className="my-3 py-3 px-3 bg-white border shadow rounded">
            <div className="flex p-1 flex-col">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <Input
                {...getFieldProps("email")}
                type="email"
                placeholder="doe@gmail.com"
                required
                id="email"
              />
            </div>
          </div>
        )}

        <button
          className="flex mx-auto rounded bg-primary text-white py-1 px-2 hover:bg-primary2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Address;
