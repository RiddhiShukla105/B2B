import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true); // ✅ reveal once
          observer.unobserve(entry.target); // ✅ stop observing to prevent flicker
        }
      },
      {
        threshold: 0.2, // 20% of element must be visible
        rootMargin: "0px 0px -80px 0px", // reveal slightly before fully in view
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
   <div
  ref={ref}
  style={{ transitionDelay: visible ? `${Math.random() * 400}ms` : "0ms" }}
  className={`transition-all duration-700 ease-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"}`}
>
  {children}
</div>
  );
};

export default ScrollReveal;



// import { useEffect, useRef, useState } from "react";

// const ScrollReveal = ({ children, delay = 0 }) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true); // reveal once
//           observer.unobserve(entry.target); // stop observing
//         }
//       },
//       {
//         threshold: 0.2, // 20% visible
//         rootMargin: "0px 0px -80px 0px", // reveal slightly before fully in view
//       }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
//       className={`transform transition-all duration-500 ease-out
//         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
//       `}
//     >
//       {children}
//     </div>
//   );
// };

// export default ScrollReveal;
