import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import imgPlaceHolder from '../assets/imgs/placeholder.png'
import headerData from "../constants/headerData";
import Button from "./molecules/Button";
import { isMobile } from 'react-device-detect';
import { useState } from "react";


const PreviewNavigator = () => {
  
  const { name, image } = useSelector((state) => state.library.primaryContent);
  const location = useLocation();

  const components = useSelector((state) => state.library.componentOrder);

  const handleClick = (id) => {
    if(id === 'Home') {
      return window.scrollTo({
        behavior: "smooth",
        top: 0
      });
    }
    const element = document.getElementById(id);
    
    if (element) {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop - 40 : 0
      });
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="container mx-auto">
        <div className="flex justify-between">
            <div className="flex items-center gap-3">
                <img
                    src={image ? image : imgPlaceHolder}
                    className="w-7 h-7 object-cover rounded-md"
                />
                <p className="text-primary opacity-55 capitalize">
                    {name ? name : "Site Title"}
                </p>
            </div>
            {
              location.pathname !== '/edit' && 
              <ul className={`flex gap-6 text-sm ${isMobile ? 'hidden' : ''}`}>
                <li>
                  <button onClick={() => handleClick('Home')}>
                    Home
                  </button>
                </li>
                {components.map((component, i) => (
                <li key={`menu_${i}`}>
                  <button onClick={() => handleClick(component)}>
                    {component}
                  </button>
                </li>
              ))}
              </ul>
            }
        </div>
    </div>
  );
};

export default PreviewNavigator;
