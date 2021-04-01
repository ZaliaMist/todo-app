import "./App.css";
import { useEffect, useState } from "react";
import todosList from "./todos.json";

import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

import { Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState(todosList);
  const [userInput, setUserInput] = useState("");

  function handleChange(event) {
    setUserInput(event.target.value);
  }

  // function addTodo(event) {
  //   setUserInput(event.target.value);
  // }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setTodos((todos) => {
        return [
          ...todos,
          {
            title: userInput,
            id: Date.now(),
            completes: false,
          },
        ];
      });
      setUserInput("");
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function toggleComplete(event, todoId) {
    setTodos((todos) => {
      return todos.map((todo) => {
        let newTodo = { ...todo };
        if (newTodo.id === todoId) {
          newTodo.completed = !newTodo.completed;
        }
        return newTodo;
      });
    });
  }

  function deleteTodo(event, todoId) {
    setTodos((todos) => {
      return todos.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  }

  function clearComplete(event) {
    setTodos((todos) => {
      return todos.filter((todo) => {
        console.log("todo", todo);
        return !todo.completed;
      });
    });
  }

  return (
    <>
      <Route exact path="/">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={(event) => handleChange(event)}
              value={userInput}
            />
          </header>
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
          <Footer
            clearComplete={clearComplete}
            itemsLeft={
              todos.filter((todo) => {
                if (todo.completed === true) {
                  return true;
                }
                return false;
              }).length
            }
          />
        </section>
      </Route>
      <Route exact path="/completed">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={(event) => handleChange(event)}
              value={userInput}
            />
          </header>
          <TodoList
            todos={todos.filter((todo) => {
              if (todo.completed === true) {
                return true;
              }
              return false;
            })}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
          <Footer
            clearComplete={clearComplete}
            itemsLeft={
              todos.filter((todo) => {
                if (todo.completed === true) {
                  return true;
                }
                return false;
              }).length
            }
          />
        </section>
      </Route>
      <Route exact path="/active">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onChange={(event) => handleChange(event)}
              value={userInput}
            />
          </header>
          <TodoList
            todos={todos.filter((todo) => {
              if (todo.completed === false) {
                return true;
              }
              return false;
            })}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
          <Footer
            clearComplete={clearComplete}
            itemsLeft={
              todos.filter((todo) => {
                if (todo.completed === true) {
                  return true;
                }
                return false;
              }).length
            }
          />
        </section>
      </Route>
    </>
  );
}

export default App;
