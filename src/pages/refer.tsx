import { useAuth } from "@/components/Context/Auth";

import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Tooltip } from "react-bootstrap";
import { TwitterShareButton, WhatsappShareButton } from "react-share";
import { TwitterIcon, WhatsappIcon } from "react-share";
import Login from "./login";
import colors from "@/styles/colors";
import { FaRegCopy } from "react-icons/fa";
const Refer = () => {
  const { user, isAuthenticated } = useAuth();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setUrl(`${window.location.origin.toString()}?referrer=${user?.uid}`);
  }, [user]);
  const message = `Hey there, use my referral link to order from Dishplug and get 25% discount on your first order \n`;

  console.log(isAuthenticated);
  return (
    <div
      className="mt-4 pt-5"
      style={{
        minHeight: "90vh",
        backgroundImage: "url('/pattern-success.png')",
        backgroundRepeat: "repeat"
      }}
    >
      <Container>
        {!isAuthenticated ? (
          <>
            <Alert>Please login first to get a referral link</Alert>
            <Login />
          </>
        ) : (
          <div className="mt-5">
            <h1 style={{ color: colors.accent2 }}>
              Refer a friend and get 25% discount on your next order
            </h1>
            <div className="my-5 bg-light p-3">
              <h3> Your referral link is </h3>
              <p className="bg-light px-2 rounded text-secondary">
                <small>{url}</small>
                <Button
                  disabled={copied}
                  onClick={() =>
                    navigator.clipboard
                      .writeText(url)
                      .then(() => setCopied(true))
                  }
                  className="mx-2"
                  style={{
                    color: colors.accent2,
                    backgroundColor: colors.white,
                    border: "none"
                  }}
                >
                  {!copied ? (
                    <>
                      {" "}
                      Copy link <FaRegCopy size={15} />
                    </>
                  ) : (
                    "Copied"
                  )}
                </Button>
                {copied && <Tooltip title="copied" />}
              </p>
              <div>
                <h5>Share on:</h5>
                <div className="d-flex gap-2">
                  <WhatsappShareButton
                    title={message}
                    url={url}
                    // hashtags={["setlinn", "AskSetlinn"]}
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>{" "}
                  <TwitterShareButton
                    url={url}
                    title={message}
                    hashtags={["Food", "Dishplug"]}
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Refer;
