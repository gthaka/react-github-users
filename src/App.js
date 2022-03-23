// import logo from './logo.svg';
import "./App.css";
import "./custom.scss";
import React, { useState, useEffect } from "react";

let GIT_USERS = "https://api.github.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState(0);
  // const [currentNo, setCurrentNo] = useState(0);

  const getUsers = async () => {
    const response = await fetch(GIT_USERS);
    const users = await response.json();

    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const listed = users.map((user,index) => {
    // console.log(Object.keys(user));
    const { id, login, avatar_url: prof_pic } = user;
    return (
      <section key={id}>
        <img src={prof_pic} alt={login} /><br/>{index+1} - {login}
      </section>
    );
  });

  const { id, login, avatar_url: prof_pic } = users.length ? users[select] : [];

  return (
    <div className="container">
      <Header count={users.length} />
      <div className="display-flex">{listed}</div>
      <div className="one-on-one">
        <div className="wrap">
          <h3>User Details</h3>
          <div>
            <button
              onClick={() => {
                setSelect(0);
              }}
              disabled={select === 0}
            >
              {"<< First"}
            </button>
            <button
              onClick={() => {
                setSelect(select - 1);
              }}
              disabled={select === 0}
            >
              Prev
            </button>
            ...
            <button
              onClick={() => {
                setSelect(select + 1);
              }}
              disabled={select === users.length - 1}
            >
              Next
            </button>
            <button
              onClick={() => {
                setSelect(users.length - 1);
              }}
              disabled={select === users.length - 1}
            >
              {"Last >>"}
            </button>
          </div>
          <section>
            <div key={id}>
              <h4>
                {users.length ? select + 1 : "~"} {login}
              </h4>
              <img src={prof_pic} alt={login} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Header({ count }) {
  return (
    <header className="as-head">
      <h2>Github Users ({count})</h2>
    </header>
  );
}

export default App;
