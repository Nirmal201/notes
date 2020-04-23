import React from "react";

const Note = ({ note }) => {
  return <li style={{ marginLeft: "20px" }}>{note.content}</li>;
};

export default Note;
