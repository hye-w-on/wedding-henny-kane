import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./App.css";
import MainFrame from "./pages/common/MainFrame";
import HeartPage from "./pages/HeartPage";
import ScrollScreen from "./pages/ScrollScreen";
import SwipeableScreen from "./pages/SwipeableScreen";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainFrame />

      <ScrollScreen />
      {/*<SwipeableScreen/>*/}
    </LocalizationProvider>
  );
}

export default App;
