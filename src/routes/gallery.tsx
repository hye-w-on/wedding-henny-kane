import { createFileRoute } from "@tanstack/react-router";
import Gallery2 from "../pages/Gallery2";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <Gallery2 />
    </>
  );
}

export default Gallery;
