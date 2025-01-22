import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { SERVER_API } from "../constants/constants";
import { toastError, toastSuccess } from "../utils/toastUtils";
import { useURL } from "../contexts/URLContexts";

interface Url {
  originalUrl: string;
  slug: string;
}

interface URLModalProps {
  ref: React.Ref<HTMLDialogElement>;
  url: Url | undefined;
  close: () => void;
}

const URLModal: React.FC<URLModalProps> = ({ ref, url, close }) => {
  const { getUrlList } = useURL();
  const [updatedUrl, setUpdatedUrl] = useState<Url | undefined>(url);

  useEffect(() => {
    setUpdatedUrl(url);
  }, [url]);

  const [error, setError] = useState<string | null>(null);

  const handleUpdateURL = async () => {
    try {
      if (updatedUrl?.slug.indexOf(" ") === 0) {
        toastError("First letter of the slug shouldn't be space.");
        return;
      }
      const response = await axios.patch(
        `${SERVER_API}/url/update`,
        updatedUrl
      );
      getUrlList();
      close();
      toastSuccess(response.data.data.message);
    } catch (err: any) {
      setError(err.response.data.error.detail);
    }
  };

  const handleChange = (slug: string) => {
    setUpdatedUrl({
      originalUrl: updatedUrl?.originalUrl || "",
      slug: slug,
    })
    if(slug === "") {
      setError("Slug field is required.");
    } else if(slug.indexOf(" ") === 0) {
      setError("First letter of the slug shouldn't be space.")
    } else {
      setError(null);
    }
  }

  return (
    <div className="font-sans">
      <Modal
        ref={ref}
        className="w-8/12 max-w-5xl"
        ariaHidden={false}
        backdrop={true}
      >
        <Modal.Header className="font-bold text-2xl text-center">
          URL UPDATE
        </Modal.Header>
        <Modal.Body>
          <div className="flex w-full component-preview p-4 items-center gap-2 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Long URL</span>
              </label>
              <p className="break-words p-2 border-2">
                {updatedUrl?.originalUrl}
              </p>
              <label className="label">
                <span className="label-text">Short URL</span>
              </label>
              <label className="input input-bordered input-sm flex items-center">
                {window.location.origin}/
                <input
                  type="text"
                  className="grow"
                  placeholder="Slug"
                  value={updatedUrl?.slug || ""}
                  onChange={(e) =>
                    handleChange(e.target.value)
                  }
                />
              </label>
              <p className="text-red-800 ml-1 mt-1 text-sm">{error}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button>Close</Button>
          </form>
          <Button
            className="bg-indigo-600 hover:bg-indigo-400 text-white"
            onClick={() => handleUpdateURL()}
            disabled={error !== null}
          >
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default URLModal;
