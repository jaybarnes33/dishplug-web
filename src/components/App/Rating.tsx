import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({
  value,
  text,
  color,
}: {
  value: number;
  text?: string;
  color?: string;
}) => {
  return (
    <div style={{ marginTop: "10px", display: "flex", gap: "5px" }}>
      <span>
        {value >= 1 ? (
          <FaStar color={color} size={24} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt color={color} size={24} />
        ) : (
          <FaRegStar color={color} size={24} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar color={color} size={24} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt color={color} size={24} />
        ) : (
          <FaRegStar color={color} size={24} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar color={color} size={24} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt color={color} size={24} />
        ) : (
          <FaRegStar color={color} size={24} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar color={color} size={24} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt color={color} size={24} />
        ) : (
          <FaRegStar color={color} size={24} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar color={color} size={24} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt color={color} size={24} />
        ) : (
          <FaRegStar color={color} size={24} />
        )}
      </span>
      <br />
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
