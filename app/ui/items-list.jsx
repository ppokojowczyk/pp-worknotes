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
                    key={note.id}
                    id={note.id}
                    active={note.id === props.activeNoteId}
                    onDelete={() => props.onDelete(note.id, index)}
                />
            })}
        </div>
    )
}

export default ItemsList;