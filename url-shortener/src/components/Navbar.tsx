import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/link-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faList } from "@fortawesome/free-solid-svg-icons";
import { Button, Navbar } from "react-daisyui";

const URLNavbar: React.FC = () => (
  <Navbar className="bg-indigo-800 text-primary-content p-3 h-[75px]">
    <div className="container mx-auto flex justify-between">
      <Logo fill="white" className="w-8" />
      <p className="text-white text-2xl font-bold ml-3">URL</p>
      <div className="ml-auto">
        <Link to="/list" className="text-white px-2 py-1">
          <Button shape="square" className="bg-indigo-800 text-2xl text-white border-none">
            <FontAwesomeIcon icon={faList} />
          </Button>
        </Link>
        <Link to="/" className="text-white px-2 py-1">
          <Button shape="square" className="bg-indigo-800 text-2xl text-white border-none">
            <FontAwesomeIcon icon={faHouseUser} />
          </Button>
        </Link>
      </div>
    </div>
  </Navbar>
);

export default URLNavbar;
