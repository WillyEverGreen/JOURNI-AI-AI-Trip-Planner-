import React from "react";
import { Button } from "../ui/button.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/logo.jpg";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleLogOut = () => {
    localStorage.removeItem("tripFormData"); // clear saved form
    localStorage.removeItem("userData"); // optional: clear user info
    logout({ returnTo: window.location.origin }); //redirect to homepage
  };

  return (
    <div className="p-2 shadow-sm flex flex-wrap justify-between items-center h-17 sm:h-21 px-4">
      {/* Logo  */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="TripGPT Logo" className="h-14 sm:h-16 md:h-18" />
      </div>
      {/* Auth buttons */}
      <div className="flex flex-row items-center gap-2 flex-shrink-0 max-w-[180px] sm:max-w-[250px] md:max-w-[300px]">
        {isAuthenticated ? (
          <>
            <span className="text-[#2b2d42] font-semibold truncate sm:max-w-[200px] max-w-full text-center sm:text-left [@media(max-width:300px)]:hidden ">
              {user.name}
            </span>
            <Button
              className="bg-[#e63946] text-white rounded-lg px-3 py-1 sm:px-4 sm:py-2 mx-2 cursor-pointer"
              variant="secondary"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button
            className="bg-[#e63946] text-white rounded-lg px-3 py-1 sm:px-4 sm:py-2 mx-2 cursor-pointer"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
