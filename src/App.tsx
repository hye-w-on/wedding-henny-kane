import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { colorTokensCSS } from "./utils/colorToken";
import { Global, css } from "@emotion/react";
import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import Splash from "./components/Splash";

const LoadingContext = createContext<{
  loaded: boolean;
  setLoaded: (v: boolean) => void;
}>({
  loaded: false,
  setLoaded: () => {},
});

export const useLoading = () => useContext(LoadingContext);

function App() {
  const ScrollScreen = lazy(() => import("./pages/common/ScrollScreen"));
  const router = createBrowserRouter([
    {
      path: "/wedding-henny-kane",
      element: <ScrollScreen />,
    },
  ]);

  const [loaded, setLoaded] = useState(false);

  //Preload images
  useEffect(() => {
    const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net/eleven";

    const group100Images = Array.from(
      { length: 5 },
      (_, i) => `${CLOUDFRONT_URL}/eleven${101 + i}.webp`
    );
    const group200Images = Array.from(
      { length: 5 },
      (_, i) => `${CLOUDFRONT_URL}/eleven${201 + i}.webp`
    );
    const images = [...group100Images, ...group200Images];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net";
    const preloadList = [
      `${CLOUDFRONT_URL}/main.webp`,
      // 다른 preload 이미지들 추가 가능
    ];

    let loadedCount = 0;
    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === preloadList.length) {
          setAppReady(true);
        }
      };
    });
  }, []);

  return (
    <>
      <LoadingContext.Provider value={{ loaded, setLoaded }}>
        <Global
          styles={css`
            ${colorTokensCSS}
          `}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Suspense fallback={<Splash isLoading={true} />}>
            <RouterProvider router={router} />
          </Suspense>
        </LocalizationProvider>
      </LoadingContext.Provider>
    </>
  );
}

export default App;
