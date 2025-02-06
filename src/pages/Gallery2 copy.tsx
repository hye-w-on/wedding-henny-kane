import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Gallery2() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-400%"]);

  return (
    <article className="gallery">
      {/* 헤더 섹션 */}
      <header
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{ fontSize: "56px", fontWeight: 700, letterSpacing: "-3px" }}
        >
          Photo Gallery
        </h2>
      </header>

      {/* 이미지 그룹 컨테이너 */}
      <section
        ref={galleryRef}
        style={{
          height: "500vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              x,
            }}
          >
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  width: "100vw",
                  height: "100vh",
                  flexShrink: 0,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  //src={photo}
                  alt={`photo ${index + 1}`}
                  style={{
                    width: "300px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontSize: "50px",
                    fontWeight: 700,
                    letterSpacing: "-3px",
                    position: "relative",
                    bottom: "30px",
                  }}
                >
                  #{String(index + 1).padStart(3, "0")}
                </h3>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 푸터 섹션 */}
      <footer
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Photos by Gallery</p>
      </footer>
    </article>
  );
}

export default Gallery2;
