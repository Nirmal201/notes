import React from "react";

const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;