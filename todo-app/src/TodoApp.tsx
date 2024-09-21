import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';

// Define initial state and reducer for useReducer
const initialState = { todos: [] };

const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo: any, index: number) =>
          index === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'LOAD_TODOS':
      return { todos: action.payload };
    default:
      return state;
  }
};

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'LOAD_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);

  // Sync todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  // Memoize completed and pending todos count using useMemo
  const completedTodos = useMemo(() => state.todos.filter((todo: any) => todo.completed).length, [state.todos]);
  const pendingTodos = useMemo(() => state.todos.length - completedTodos, [state.todos, completedTodos]);

  // useCallback for adding todos
  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { text: inputValue, completed: false } });
      setInputValue('');
      if (inputRef.current) inputRef.current.focus(); // Focus on the input after adding a todo
    }
  }, [inputValue]);

  // useCallback for toggling todos
  const toggleTodo = useCallback((index: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {state.todos.map((todo: any, index: number) => (
          <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={() => toggleTodo(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
      <p>Completed: {completedTodos}</p>
      <p>Pending: {pendingTodos}</p>
    </div>
  );
};

export default TodoApp;
