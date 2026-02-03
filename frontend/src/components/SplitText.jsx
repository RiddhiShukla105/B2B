import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, stagger = 0.05, className = "" }) => {
  const lettersRef = useRef([]);
  lettersRef.current = [];

  useEffect(() => {
    if (!lettersRef.current.length) return;

    gsap.fromTo(
      lettersRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: stagger,
        scrollTrigger: {
          trigger: lettersRef.current[0],
          start: "top 80%",
          toggleActions: "play none play reverse",
        },
      }
    );
  }, [stagger]);

  // Split text into letters
  const splitContent = text.split("");

  return (
    <h1 className={`inline-block ${className}`}>
      {splitContent.map((char, index) => {
        if (char === "|") return <br key={index} />;

        return (
          <span
            key={index}
            ref={(el) => {
              if (el) lettersRef.current.push(el);
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
};

export default SplitText;
