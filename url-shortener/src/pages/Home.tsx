import React, { useState } from "react";
import URLForm from "../components/URLForm";
import URLDisplay from "../components/URLDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const [shortURL, setShortURL] = useState<string>("");

  const handleShortURL = (url: string) => {
    setShortURL(url);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-[22rem] h-8 bg-gray-400 rounded-t-lg"></div>
      <div className="card bg-base-100 rounded-tl-none rounded-tr-none rounded-b-lg shadow-md w-[22rem] h-80">
        <div className="py-5 px-8">
          <h2 className="text-lg font-bold pb-4">
            URL Shortener
            <span className="text-gray-600"><FontAwesomeIcon className="ml-2" icon={faLink} /></span>
          </h2>
          <p className="my-3">Enter the URL to shorten</p>
          <URLForm onShorten={handleShortURL} />
          {shortURL && <URLDisplay shortURL={shortURL} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
