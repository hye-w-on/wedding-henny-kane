import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import { colorTokensCSS } from "./utils/colorToken";
import fontCSS from "./assets/styles/fonts.css?inline";
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
import PhotoBooth from "./pages/booth/PhotoBooth";

const LoadingContext = createContext<{
  loaded: boolean;
  setLoaded: (v: boolean) => void;
}>({
  loaded: false,
  setLoaded: () => {},
});

function App() {
  const ScrollScreen = lazy(() => import("./pages/common/ScrollScreen"));
  const router = createBrowserRouter([
    {
      path: "/wedding-henny-kane",
      element: <ScrollScreen />,
    },
    {
      path: "/wedding-henny-kane/photo-booth",
      element: <PhotoBooth />,
    },
  ]);

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
    const preload = async () => {
      const CLOUDFRONT_URL = "https://d2fwec07ipx82e.cloudfront.net";

      // 이미지 preload
      const preloadImage = new Promise((res) => {
        const img = new Image();
        img.src = `${CLOUDFRONT_URL}/main.webp`;
        img.onload = res;
      });

      // 폰트 preload
      const fonts = [
        new FontFace("PPPlayground", "url(/fonts/PPPlayground-Medium.otf)", {
          style: "normal",
          weight: "400",
        }),
        new FontFace("helvetica", "url(/fonts/helveticanowtext-bold.ttf)", {
          style: "normal",
          weight: "400",
        }),
        new FontFace(
          "PPEditorialOld",
          "url(/fonts/PPEditorialOld-Ultralight.otf)",
          { style: "normal", weight: "400" }
        ),
        new FontFace("SUITRegular", "url(/fonts/SUIT-Regular.woff2)", {
          style: "normal",
        }),
      ];

      const fontLoads = fonts.map((font) =>
        font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
        })
      );

      await Promise.all([preloadImage, ...fontLoads]);
      console.log("콘솔을 왜 열어보십니까?");
      setAppReady(true);
    };

    preload();
  }, []);

  if (!appReady) return <Splash isLoading={true} />;

  return (
    <>
      <Global
        styles={css`
          ${fontCSS}
          ${colorTokensCSS}
        `}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Suspense fallback={<Splash isLoading={true} />}>
          <RouterProvider router={router} />
        </Suspense>
      </LocalizationProvider>
    </>
  );
}

export default App;
