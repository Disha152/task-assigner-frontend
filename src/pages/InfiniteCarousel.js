



import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InfiniteCarousel = ({ categories }) => {
  const navigate = useNavigate();

  // Filter valid categories
  const validCategories = categories.filter(
    (category) => category._id && typeof category._id === "string" && category._id.trim() !== ""
  );

  // Conditionally scrollable
  const isScrollable = validCategories.length >= 5;

  return (
    <div className="infinite-carousel-wrapper py-3">
      <div
        className="infinite-carousel-alt"
        style={{
          overflowX: isScrollable ? "auto" : "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {validCategories.map((category, index) => (
          <Card
            key={index}
            className="custom-card text-white shadow-lg"
            onClick={() => navigate(`/category/${encodeURIComponent(category._id)}`)}
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #002fff, #6c00ff, #ff0033)",
              borderRadius: "1.5rem",
              padding: "1.5rem",
              width: "275px",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              display: "inline-block",
              marginRight: "1rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
                {category._id.split(" ").map((word, idx) => (
                  <div key={idx} style={{ marginBottom: "0.8rem" }}>{word}</div>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
