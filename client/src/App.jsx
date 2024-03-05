/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import "./App.css";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removieCookie] = useCookies(null);

  const [tasks, setTasks] = useState(null);

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/todos/${userEmail}`
      );

      const result = await data.json();
      setTasks(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log(tasks);

  //Sort tasks
  const sortedtasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listname={" To-Do List"} getData={getData} />
          <p className="user-email">{`Welcome Back ${
            userEmail.split("@")[0]
          }!`}</p>
          {sortedtasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
