import React, { useState, useEffect, useRef } from 'react';
import TodoList from './component/TodoList';
import { useTodoLayerValue } from './context/TodoContext';
import './App.css';

const App = () => {
  const [{ todos }, dispatch] = useTodoLayerValue();
  const [content, setContent] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content) {
      const newTodo = {
        id: Math.floor(Math.random() * 39399393),
        content,
        isCompleted: false,
      };

      dispatch({
        type: 'ADD_TODO',
        payload: newTodo,
      });

      setContent('');
    }
  };

  return (
    <div className="container">
      <div className="time">{currentTime.toLocaleTimeString()}</div>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={content}
          className="todo-input"
          placeholder="Your Wish List"
          ref={inputRef}
          onChange={(event) => setContent(event.target.value)}
        />

        <button className="todo-button">Add</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
