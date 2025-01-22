import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../constants/constants";
import { NOT_FOUND } from "../constants/http";
import NotFound from "./NotFound";
import { Bounce, ToastContainer } from "react-toastify";
import { toastError } from "../utils/toastUtils";

const Original: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [error, setError] = useState<{ status: number; message: string }>();

  useEffect(() => {
    const getOriginalUrl = async () => {
      try {
        const response = await axios.patch(
          `${SERVER_API}/url/redirect/${slug}`
        );
        window.location.href = response.data.data.attributes?.originalUrl;
      } catch (err: any) {
        setError({
          status: err.response.data.error.status,
          message: err.response.data.error.detail,
        });
      }
    };
    getOriginalUrl();
  }, [slug]);

  useEffect(() => {
    toastError(error?.message || "");
  }, [error]);

  return (
    <>
      {error?.status === NOT_FOUND ? (
        <>
          <NotFound />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </>
      ) : (
        <span className="loading loading-ring loading-lg size-40"></span>
      )}
    </>
  );
};

export default Original;
