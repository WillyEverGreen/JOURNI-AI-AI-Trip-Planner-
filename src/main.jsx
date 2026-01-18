import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/header";
import { Auth0Provider } from "@auth0/auth0-react";
import Viewtrip from "./view-trip/[tripid]";
import MyTrips from "./my-trips/MyTrips";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: "/view-trip/:tripid",
    element: (
      <>
        <Header />
        <Viewtrip />
      </>
    ),
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    ),
  },
]);
const getRedirectUri = () => {
  const origin = window.location.origin;
  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const defaultPath = "/create-trip";
  // In production always use deployed origin; in local, allow env override
  if (isLocal) {
    return import.meta.env.VITE_AUTH0_REDIRECT_URI || origin + defaultPath;
  }
  return origin + defaultPath;
};

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: getRedirectUri(),
    }}
    cacheLocation="localstorage"
  >
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Auth0Provider>
);
