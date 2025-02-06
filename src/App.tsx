import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ScrollScreen from "./pages/ScrollScreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/wedding-henny-kane",
      element: <ScrollScreen />,
    },
  ]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
