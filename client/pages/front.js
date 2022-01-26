// flow: https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i
// https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management

import Footer from "../components/front/Footer";
import MainForm from "../components/front/MainForm";
import LoadingOverlay from "react-loading-overlay";
import { useState } from "react";

export default function Front() {
  const [loading, setLoading] = useState(false);

  const setLoad = () => {
    setLoading(true);
  };

  const stopLoad = () => {
    setLoading(false);
  };

  return (
    <LoadingOverlay active={loading} spinner text="Please wait...">
      <div className="flex flex-col h-screen justify-between">
        <div />
        <div className="h-auto">
          <div className="container mx-auto">
            <div className="flex justify-center">
              <img
                src="/images/logo2.png"
                alt="Logo"
                className="object-scale-down h-48"
              />
            </div>

            <div className="sm:flex sm:justify-center">
              <MainForm
                setLoading={setLoad}
                stopLoading={stopLoad}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </LoadingOverlay>
  );
}