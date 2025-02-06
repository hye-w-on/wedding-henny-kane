import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Outlet />
      <TanStackRouterDevtools />
    </LocalizationProvider>
  ),
});
