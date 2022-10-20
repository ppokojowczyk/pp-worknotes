import React from 'react';

const Triangle = (props) => {
    return (
        <div
            className="triangle"
            style={{
                borderWidth: '0 ' + props.size + 'px ' + props.size + 'px 0',
                borderColor: 'transparent ' + props.color + ' transparent transparent'
            }}
            onClick={(e) => {
                e.stopPropagation();
                props.onClick();
            }}
        ><div
            className="triangle__content"
        >{props.children}</div></div >
    )
};

export default Triangle;