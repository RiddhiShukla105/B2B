import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WheelRollInImage = ({ src, className = "" }) => {
  const imgRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = imgRef.current;

    // Reset styles so animation can replay
    gsap.set(el, {
      x: "100vw",
      rotate: 360,
      opacity: 0,
    });

    const animation = gsap.to(el, {
      x: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      transformOrigin: "50% 50%",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play  play",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [location.pathname]); // 👈 reruns on route change

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={`will-change-transform ${className}`}
    />
  );
};

export default WheelRollInImage;
