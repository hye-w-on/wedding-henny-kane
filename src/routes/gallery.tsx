import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

function Gallery() {
  return <>hi</>;
}

export default Gallery;
