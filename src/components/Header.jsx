import React, { useEffect, useState } from "react";
import Logo from "../assets/imgs/logo.svg";
import Button from "./molecules/Button";
import headerData from "../constants/headerData";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const isGloballyEditing = useSelector(
    (state) => state.library.isContentBeingEdited
  );

  const { title, description, name, email } = useSelector(
    (state) => state.library.primaryContent
  );

  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!title || !description || !name || !email) {
      setError("Fill basic details to publish");
    } else {
      setError(null);
    }
  }, [title, description, name, email]);

  return (
    <nav className="bg-[#232323] py-3">
      <div className="container mx-auto text-white">
        <div className="flex justify-between">
          <div className="flex items-center gap-20">
            <Link to={"/"} className="flex items-center gap-5">
              <img src={Logo} className={"w-8"} />
              <p className="text-sm">Site Builder</p>
            </Link>
          </div>
          {
            error ?
            <p className="text-sm">{error}</p>  :
            <ul className="flex gap-3 lg:gap-6 text-xs">
              {headerData.menu.map((menu, i) => (
                <li key={`menu_${i}`}>
                  <Button data={{
                    ...menu,
                    title: menu.title === 'Publish' && location.pathname !== '/edit' ? 'Published' : menu.title
                  }} />
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
