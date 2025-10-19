import React, { useState } from "react";
import { Button } from "../ui/button.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import useRevealOnScroll from "./useRevealOnScroll";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    const origin = window.location.origin;
    const isLocal = ["localhost", "127.0.0.1"].includes(
      window.location.hostname
    );
    const returnTo = isLocal
      ? import.meta.env.VITE_AUTH0_LOGOUT_URL || origin
      : origin;
    logout({ returnTo });
    setDropdownOpen(false);
  };

  const redirectToHomePage = () => navigate("/");
  const redirectToMyTrips = () => {
    navigate("/my-trips");
    setDropdownOpen(false);
  };

  return (
    <div className="p-2 shadow-sm flex items-center justify-between h-17 sm:h-21 px-4 bg-white">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="TripGPT Logo"
          className="h-14 sm:h-16 md:h-18 cursor-pointer"
          onClick={redirectToHomePage}
        />
      </div>

      {/* Right: My Trips + User Avatar */}
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <Button
            className="bg-white  border 
      border-gray-300 rounded-3xl font-semibold w-24 mt-0.5 hover:bg-gray-100 transition"
            onClick={redirectToMyTrips}
          >
            My Trips
          </Button>
        )}

        {!isAuthenticated ? (
          <Button
            className="bg-[#e63946] hover:bg-[#d62828] text-white rounded-lg px-4 py-2 "
            onClick={() => loginWithRedirect()}
            data-reveal
          >
            Log In
          </Button>
        ) : (
          <div className="relative">
            {/* Alphabet circle avatar */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-[#e63946] text-white flex items-center justify-center font-bold text-lg cursor-pointer"
              title={user.name}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#e9ecef] shadow-lg rounded-md overflow-hidden z-10">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
