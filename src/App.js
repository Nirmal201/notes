import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import "./App.css";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      id: notes.length + 1,
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });

    // setNotes(notes.concat(noteObject));
    // setNewNote("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      console.log(window.localStorage);
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage("Wrong Creadentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  const handleLogOut = (e) => {
    setUser(null);
    window.localStorage.clear();
  };
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note ${note.content} was already removed from server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important;
      });
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  );

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <br />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h3>Logged in as {user.name}</h3>
          {noteForm()}
          <br></br>
          <button onClick={() => handleLogOut()}> Log Out</button>
        </div>
      )}
      <br />
      <br />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "'important'" : "'all'"}
        </button>
      </div>

      <br />
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <br />

      <Footer />
    </div>
  );
};

export default App;
