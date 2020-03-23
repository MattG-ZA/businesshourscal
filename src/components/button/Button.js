import React from 'react';
import './Button.css';

const Button = (props) => {
    const { handleSubmit } = props;
   
    return (
        <div className='button-container'>
            <span
                className='button'
                onClick={() => handleSubmit()}
            >
                Submit
            </span>
        </div>
    )
}

export default Button;