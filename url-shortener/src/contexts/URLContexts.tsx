import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { SERVER_API } from "../constants/constants";
import { toastError } from "../utils/toastUtils";

interface Url {
  type: string;
  id: string;
  attributes: {
    originalUrl: string;
    slug: string;
    visits: number;
  };
}

export interface URLContextType {
  urls: Url[];
  setUrls: React.Dispatch<React.SetStateAction<Url[]>>;
  getUrlList: () => void;
}

export const URLContext = createContext<URLContextType | null>(null);

export const useURL = () => useContext(URLContext) as URLContextType;

export const URLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [urls, setUrls] = useState<Url[]>([]);

  const getUrlList = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/url/getlist`);
      setUrls(response.data.data);
    } catch (err: any) {
      toastError(err.response.data.error.detail);
      console.log(err);
    }
  };

  return (
    <URLContext.Provider
      value={{
        urls,
        setUrls,
        getUrlList,
      }}
    >
      {children}
    </URLContext.Provider>
  );
};
