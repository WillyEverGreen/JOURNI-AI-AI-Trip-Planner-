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
        <Header /> {/* ✅ inside router */}
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
createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
    }}
    cacheLocation="localstorage"
  >
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Auth0Provider>
);
