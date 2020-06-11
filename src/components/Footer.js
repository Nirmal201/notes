import React from "react";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
    position: "relative",
    bottom: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Copyright © 2020 Nirmal Patel </em>
    </div>
  );
};

export default Footer;
