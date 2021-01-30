import React, { useState, useEffect } from 'react';
import './style.css';
//Import components
import Form from './components/Form';
import TodoList from './components/Todo-list';

function App() {
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState('all');
	const [filterTodos, setFilterTodos] = useState([]);

	useEffect(() => {
		getLocalTodos();
	}, []);

	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);

	const filterHandler = () => {
		switch (status) {
			case 'completed':
				setFilterTodos(todos.filter((todo) => todo.completed === true));
				break;
			case 'uncompleted':
				setFilterTodos(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFilterTodos(todos);
				break;
		}
	};

	//Save to local
	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const getLocalTodos = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem('todos'));
			setTodos(todoLocal);
		}
	};

	return (
		<div className='App'>
			<header>
				<h1>Alex's Todo List</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				inputText={inputText}
				setInputText={setInputText}
				setStatus={setStatus}
			/>
			<TodoList setTodos={setTodos} todos={todos} filterTodos={filterTodos} />
		</div>
	);
}

export default App;
