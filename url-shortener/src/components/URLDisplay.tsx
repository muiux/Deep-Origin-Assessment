import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { toastInfo } from "../utils/toastUtils";
import Toast from "./Toast";

interface URLDisplayProps {
  shortURL: string;
}

const URLDisplay: React.FC<URLDisplayProps> = ({ shortURL }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortURL}`);
    toastInfo("Shortened URL Copied!");
  };

  return (
    <div className="mt-4">
      <p className="text-green-800 italic">Success! Here's your short URL:</p>
      <div className="flex justify-between items-center mt-2">
        <a
          href={shortURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline block"
        >
          {window.location.origin}/{shortURL}
        </a>
        <button
          onClick={handleCopy}
          className="btn btn-sm btn-outline text-indigo-600 hover:bg-indigo-600 rounded-sm px-2"
        >
          <FontAwesomeIcon icon={faSuitcase} />
          Copy
        </button>
      </div>
      <Toast />
    </div>
  );
};

export default URLDisplay;
