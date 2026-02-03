import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GridReveal = ({
  children,
  className = "",
  x = 60,
  duration = 0.9,
  stagger = 0.08,
  start = "top 80%",
  once = true,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        x,
        opacity: 0,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none play reverse",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [x, duration, stagger, start, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GridReveal;
