import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewTodo from './AddNewTodo';

const LOCALKEY = 'todolist.array'

const lightTheme = {
  backgroundColor: 'rgb(240,240,240)',
  color: 'rgb(20,20,20)'
}
const darkTheme = {
  backgroundColor: 'rgb(20,20,20)',
  color: 'rgb(240,240,240)'
}

const lightBtn = {
  backgroundColor: 'rgb(240,240,240)',
  color: 'rgb(20,20,20)',
  border: '1px solid black',
  borderRadius: '4vh'
}
const darkBtn = {
  backgroundColor: 'rgb(20,20,20)',
  color: 'rgb(240,240,240)',
  border: '1px solid white',
  borderRadius: '4vh'
}


function App() {
  const [showAddNew, setShowAddNew] = useState(false);
  const [array, setArray] = useState([]);
  const [light, setLight] = useState('light')

  useEffect(() => {
    const storedArray = localStorage.getItem(LOCALKEY);
    if (storedArray) {
      setArray(JSON.parse(storedArray));
    }
  }, []);

  const handleAddTodo = (newTodo) => {
    try {
      const updatedArray = [...array, newTodo];
      setArray(updatedArray);
      localStorage.setItem(LOCALKEY, JSON.stringify(updatedArray));
    } catch (error) {
      console.error('Error while updating local storage:', error);
    }
  };

  function removeList() {
    try {
      const newArray = [];
      setArray(newArray);
      localStorage.setItem(LOCALKEY, JSON.stringify(newArray));
    } catch (error) {
      console.error('Error while clearing local storage:', error);
    }
  }

  const handleTheme = () => {
    setLight(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  const popUpBackground = {
    filter: showAddNew === 'yep' ? 'blur(2px)' : 'none'
  }

  const btnTheme = light === 'light' ? lightBtn : darkBtn;

  const themeStyles = light === 'light' ? lightTheme : darkTheme;

  const pcStyle = {
    width: '15vw',
    height: '4vw',
    filter: showAddNew === 'yep' ? 'blur(2px)' : 'none'
  }

  return (
    <div id='everything' style={themeStyles}>
      <div id='title'>
        <h1 style={popUpBackground}>to-do list</h1>
        <button id='add-new-btn' onClick={() => setShowAddNew('yep')} style={btnTheme}>add new!</button>
        <button id='remove-btn' onClick={() => removeList()} style={btnTheme}>remove</button>
        <TodoList toDoArray={array} setTodoArray={setArray} />
        {showAddNew === 'yep' && <AddNewTodo setShowAddNew={setShowAddNew} handleAddTodo={handleAddTodo}/>}
      </div>
      <button id='light-dark' onClick={handleTheme}>
        <img id='bulb' src={light === 'light' ? '/light.svg' : '/dark.svg'}/>
      </button>
    </div>
  );
}

export default App;


// add style for mobile. eg:
// min-width: 30vw;, for the butn-column, so no overflow