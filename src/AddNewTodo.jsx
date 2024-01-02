import React, { useState, useId } from 'react'

const pcStyle = {
    maxHeight: '100vh',
    maxWidth: '100vw',
    minWidth: '60vw',
    minHeight: '50vh',
    height: '50vh',
    width: '70vw',
    left: '15vw',
    top: '8vw'
}

export default function AddNewTodo({ setShowAddNew, handleAddTodo }) {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [prio, setPrio] = useState(false);
    const random = useId()

    function generateRandomNumber() {
        return random;
    }

    const handleClose = () => {
        setShowAddNew(false);
    }

    const handleForm = (e) => {
        e.preventDefault();
        const todoObj = { name: name, desc: desc, date: date, prio: prio, id: generateRandomNumber() };
        handleAddTodo(todoObj);
        console.log(todoObj)
        setShowAddNew(false);
      };

  return (
    <div>
        <div id='add-new-box' style={pcStyle}>
            <div id='title-cross'>
                <h3></h3>
                <h3 id='title-add-new'>add new to-do</h3>
                <button id='close-add-new' onClick={handleClose}>X</button>
            </div>
            <div className='todo-form'>
                <form onSubmit={handleForm}>
                    <input 
                    type='text' 
                    placeholder='name...'
                    maxLength={30} 
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </input>
                    <input 
                    type='text' 
                    placeholder='description...'
                    maxLength={100}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}>
                    </input>
                    <div className='checkbox'>
                        <div id='bits'>due date?</div>
                        <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}>
                        </input>
                    </div>
                    <div className='checkbox'>
                        <div id='bits'>Important?</div>
                        <input 
                        type='checkbox' 
                        value={prio}
                        onChange={(e) => setPrio(e.target.checked)}></input>
                    </div>
                    <button id='confirm' type='submit'>add new to-do</button>
                </form>
            </div>
        </div>
    </div>
  )
}
