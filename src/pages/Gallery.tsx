import { motion } from "motion/react";
import { useState } from "react";

function Feed({ items, setIndex }: { items: any[]; setIndex: any }) {
  return (
    <ul className="gallery-container">
      {items.map((color, i) => (
        <motion.li
          className="gallery-item"
          key={color}
          onClick={() => setIndex(i)}
          style={{ backgroundColor: color }}
          layoutId={color}
        />
      ))}
    </ul>
  );
}

function SingleImage({ color, onClick }: { color: string; onClick: any }) {
  return (
    <div className="single-image-container" onClick={onClick}>
      <motion.div
        layoutId={color}
        className="single-image"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

const numColors = 4 * 4;
const makeColor = (hue: number) => `hsl(${hue}, 100%, 50%)`;
const colors = Array.from(Array(numColors)).map((_, i) =>
  makeColor(Math.round((360 / numColors) * i))
);

function Gallery() {
  const [index, setIndex] = useState<number>(-1);

  return (
    <>
      <Feed items={colors} setIndex={setIndex} />
      {index !== -1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          key="overlay"
          className="overlay"
          onClick={() => setIndex(-1)}
        />
      )}

      {index !== -1 && (
        <SingleImage
          key="image"
          //index={index}
          color={colors[index]}
          // setIndex={setIndex}
          onClick={() => setIndex(-1)}
        />
      )}
    </>
  );
}

export default Gallery;
