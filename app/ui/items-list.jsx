import React from 'react';
import ListItem from './list-item.jsx';

const ItemsList = (props) => {
    return (
        <div className="items-list list-group list-group-flush scrollarea">
            {props.notes.map((note, index) => {
                return <ListItem
                    title={note.title}
                    content={note.content}
                    date={note.date}
                    onClick={props.onClick}
                    key={index}
                    id={index}
                    active={index === props.activeNoteIndex}
                    onDelete={() => props.onDelete(note.id, index)}
                />
            })}
        </div>
    )
}

export default ItemsList;