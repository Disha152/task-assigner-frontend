// import React, { useEffect, useRef } from "react";
// import { Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const InfiniteCarouselAlt = ({ skills }) => {
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);

//   const handleClick = (skillName) => {
//     navigate(`/tasks/skills/${encodeURIComponent(skillName)}`);
//   };

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollLeft += 2; // Scroll the container to the right
//       }
//     }, 20); // Adjust speed by changing the interval time

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div
//       ref={carouselRef}
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, 275px)", // Creates grid with dynamic number of columns
//         gridAutoFlow: "column", // Arrange items horizontally
//         gap: "1rem",
//         overflowX: "auto",
//         whiteSpace: "nowrap",
//         padding: "1rem",
//         scrollBehavior: "smooth",
//         overflowY: "hidden", // This hides the vertical scrollbar
//       }}
//     >
//       {skills.map((skill, index) => (
//         <Card
//           key={index}
//           className="custom-card text-white shadow-lg"
//           onClick={() => handleClick(skill._id)}
//           style={{
//             position: "relative",
//             background: "linear-gradient(135deg, #ff6ec4, #7873f5)",
//             borderRadius: "1.5rem",
//             padding: "1.5rem",
//             width: "275px", // Adjust to desired width
//             border: "none",
//             color: "#fff",
//             cursor: "pointer",
//             transition: "transform 0.2s ease-in-out",
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         >
//           <Card.Body
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               height: "100%",
//               padding: 0,
//             }}
//           >
//             <div
//               style={{
//                 fontFamily: "'Fira Sans', sans-serif",
//                 fontWeight: 700,
//                 textAlign: "right",
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 paddingRight: "1.5rem",
//                 paddingBottom: "1rem",
//                 paddingTop: "2rem",
//                 whiteSpace: "normal",
//                 wordBreak: "break-word",
//                 fontSize: "2.2rem",
//                 lineHeight: "1.8rem",
//               }}
//             >
//               {typeof skill._id === "string" ? (
//                 skill._id.split(" ").map((word, idx) => (
//                   <div key={idx} style={{ marginBottom: "0.8rem" }}>
//                     {word}
//                   </div>
//                 ))
//               ) : (
//                 <div>Unnamed</div>
//               )}
//             </div>
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default InfiniteCarouselAlt;
import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InfiniteCarouselAlt = ({ skills }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleClick = (skillName) => {
    navigate(`/tasks/skills/${encodeURIComponent(skillName)}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 2;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        ref={carouselRef}
        className="hide-scrollbar"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 275px)",
          gridAutoFlow: "column",
          gap: "1rem",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "1rem",
          scrollBehavior: "smooth",
          overflowY: "hidden",
        }}
      >
        {skills.map((skill, index) => (
          <Card
            key={index}
            className="custom-card text-white shadow-lg"
            onClick={() => handleClick(skill._id)}
            style={{
              position: "relative",
              // background: "linear-gradient(135deg, #ff00cc, #7b00ff)", // Magenta Pink + Bright Purple
              background: "linear-gradient(135deg, #7b00ff 50%, #ff00cc 0%, #2b32b2 100%)",

              borderRadius: "1.5rem",
              padding: "1.5rem",
              width: "275px",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                height: "100%",
                padding: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "'Fira Sans', sans-serif",
                  fontWeight: 700,
                  textAlign: "right",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  paddingRight: "1.5rem",
                  paddingBottom: "1rem",
                  paddingTop: "2rem",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  fontSize: "2.2rem",
                  lineHeight: "1.8rem",
                }}
              >
                {typeof skill._id === "string" ? (
                  skill._id.split(" ").map((word, idx) => (
                    <div key={idx} style={{ marginBottom: "0.8rem" }}>
                      {word}
                    </div>
                  ))
                ) : (
                  <div>Unnamed</div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default InfiniteCarouselAlt;
