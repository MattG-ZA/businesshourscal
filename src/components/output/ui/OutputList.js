import React from 'react';
import '../Output.css';

const OutputList = (props) => {
    const { header, list } = props;

    return (
        <span className='output-container'>
            <span className='output-header'>{header}</span>
            {
                list.map((listValue, index) => {
                    return <span className='output-item' key={index}>{listValue.toString()}</span>;
                })
            }
        </span>
    )
}

export default OutputList;