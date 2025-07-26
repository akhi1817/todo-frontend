import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api.js';

const Todoform = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API.GET_TODOS);
      setTodos(response.data.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post(API.CREATE_TODOS, { text: input });
      setTodos([...todos, response.data.data]);
      setInput('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(API.DELETE_TODO(id)); 
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className='conatiner-fluid'>
      <div className='row'>
            <div className='col-md-12 bg-dark text-center rounded position-absolute top-25 start-50 translate-middle-x w-100'>
              <h2 className='text-white mt-3 mb-3'>Todo App</h2>
                <div className='d-flex flex-column flex-md-row justify-content-center align-items-center ms-5'>
                    <input className='form-control w-50 text-success  text-center mt-3' type="text" placeholder="Add todo" value={input} onChange={(e) => setInput(e.target.value)} style={{ padding: '8px', width: '70%' }}/>
                    <button className='btn btn-success rounded ms-5 mt-3' onClick={addTodo}>Add Todo</button>
                </div>
      

                <ul className='mt-5 list-unstyled'>
                    {todos.map((val) => (
                        <li className='text-success' key={val._id} style={{ marginBottom: '10px' }}>
                          {val.text}
                          <button className='btn btn-danger ms-3' onClick={() => deleteTodo(val._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
          </div>  
      </div>
    </div>
  
  );
};

export default Todoform;
