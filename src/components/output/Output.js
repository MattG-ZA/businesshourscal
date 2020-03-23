import React from 'react';
import './Output.css';
import OutputList from './ui/OutputList';

const Output = (props) => {
    const { inputList, outputList } = props;

    return (
        <div className='output'>
            <OutputList
                header={'Input'}
                list={inputList}
            />
            <OutputList
                header={'Output'}
                list={outputList}
            />
        </div>
    )
}

export default Output;