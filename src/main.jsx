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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/create-trip",
    element: <CreateTrip></CreateTrip>,
  },
  {
    path: "/view-trip/:tripid",
    element: <Viewtrip></Viewtrip>,
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
      <Header></Header>
      <RouterProvider router={router} />
    </StrictMode>
  </Auth0Provider>
);
