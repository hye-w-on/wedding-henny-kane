import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ScrollScreen from "./pages/ScrollScreen";
import "./App.css";
import { colorTokensCSS } from "./utils/colorToken";
import { Global, css } from "@emotion/react";
import LocationPage from "./pages/LocationPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/wedding-henny-kane",
      element: <ScrollScreen />,
    },
    {
      path: "/wedding-henny-kane/location",
      element: <LocationPage />,
    },
  ]);
  return (
    <>
      <Global
        styles={css`
          ${colorTokensCSS}
        `}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}

export default App;
