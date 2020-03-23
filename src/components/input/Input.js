import React from 'react';
import './Input.css';

const Input = (props) => {
    const { inputValue, handleSubmit, updateInput } = props;

    const HandleInput = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <span>
            <input
                className='input'
                placeholder='Enter date'
                onKeyDown={HandleInput}
                onChange={updateInput}
                value={inputValue}
            />
        </span>
    )
}

export default Input;