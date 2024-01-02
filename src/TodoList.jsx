import React, { useState } from 'react';

const LOCALKEY = 'todolist.array';

export default function TodoList({ toDoArray, setTodoArray }) {
  return (
    <div id='todo-list'>
      <div>
        {toDoArray.length === 0 ? 'nothing to show!' : <List toDoArray={toDoArray} setTodoArray={setTodoArray} />}
      </div>
    </div>
  );
}

function List(props) {
  const { toDoArray, setTodoArray } = props;

  const [selectedTaskDesc, setSelectedTaskDesc] = useState('');

  const handleDesc = (desc) => {
    setSelectedTaskDesc(desc);
  };

  function removeTask(taskId) {
    const ind = toDoArray.findIndex((item) => item.id === taskId);
    if (ind !== -1) {
      const updatedArray = [...toDoArray.slice(0, ind), ...toDoArray.slice(ind + 1)];
      setTodoArray(updatedArray);
      localStorage.setItem(LOCALKEY, JSON.stringify(updatedArray));
    }
  }

  return (
    <div id='list-task'>
      <div id='name-column'>task {toDoArray.map((task) => (<div key={task.id}>{task.name}</div>))}</div>
      <div id='desc-column'>
        description {toDoArray.map((task) => (
          <button key={task.id} onClick={() => handleDesc(task.desc)}>...</button>
        ))}
        {selectedTaskDesc && <div id='task-desc-window' onClick={() => setSelectedTaskDesc('')}>{selectedTaskDesc}</div>}
      </div>
      <div id='date-column'>date due {toDoArray.map((task) => (<div key={task.id}>{task.date}</div>))}</div>
      <div id='prio-column'>
        important?
        {toDoArray.map((task) => (
          <div key={task.id}>{task.prio ? 'Yes' : 'No'}</div>
        ))}
      </div>
      <div id='butn-column'>
        remove task?
        {toDoArray.map((task) => (
          <div key={task.id}><button onClick={() => removeTask(task.id)}>x</button></div>
        ))}
      </div>
    </div>
  );
}
