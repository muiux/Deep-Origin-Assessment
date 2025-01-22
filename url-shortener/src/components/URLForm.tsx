import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../constants/constants";
import { toastError, toastInfo } from "../utils/toastUtils";
import Toast from "./Toast";

interface URLFormProps {
  onShorten: (shortURL: string) => void;
}

const isValidHttpUrl = (url: string): boolean => {
  try {
    const checkUrl = new URL(url);
    return checkUrl.protocol === "http:" || checkUrl.protocol === "https:";
  } catch (_) {
    return false;
  }
};

const URLForm: React.FC<URLFormProps> = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidHttpUrl(originalUrl)) {
      toastInfo("Please provide a valid URL.");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_API}/url/shorten`, {
        originalUrl,
      });
      onShorten(response.data.data.attributes?.slug)
    } catch (err: any) {
      setError(err.response.data.error.detail);
    }
  };

  useEffect(() => {
    if(error) toastError(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <p>URL</p>
      <div className="mb-3">
        <input
          type="text"
          className="form-control input input-bordered input-sm w-full rounded-sm mb-1"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-sm bg-indigo-600 hover:bg-indigo-400 mt-1 text-white px-5 py-0 rounded-sm"
        >
          Shorten
        </button>
      </div>
      <Toast />
    </form>
  );
};

export default URLForm;
