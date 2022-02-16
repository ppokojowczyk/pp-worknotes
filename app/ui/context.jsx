import React, { useState } from 'react';
import Editor from './editor.jsx';
import ItemsList from './items-list.jsx';
import Menu from './menu.jsx';
import Footer from './footer.jsx';
import { getNotes, NotesProviderContext } from './notes-provider.jsx';

const Context = (props) => {

    const [noteIndex, setNoteIndex] = useState(0);

    const [filter, setFilter] = useState('');

    const notes = getNotes();

    const getFiltered = () => {
        if (filter) {
            let filtered = [];
            notes.forEach(note => {
                if (note.title.toUpperCase().indexOf(filter.toUpperCase()) !== -1 || note.content.toUpperCase().indexOf(filter.toUpperCase()) !== -1) {
                    filtered.push(note);
                }
            });
            return filtered;
        }
        return notes;
    };

    return (
        <NotesProviderContext.Consumer>
            {({ updateNote, newNote, deleteNote, reloadData }) => (
                <div>
                    <div style={{
                        margin: '0px'
                    }}>
                        <div className="list d-flex flex-column align-items-stretch" style={{
                            width: '380px',
                            float: 'left'
                        }}>
                            <Menu
                                onNew={() => {
                                    newNote();
                                    setNoteIndex(0);
                                }}
                                onRefresh={() => {
                                    reloadData();
                                }}
                                onFilter={(filter) => {
                                    setFilter(filter || '');
                                }}
                            />
                            <ItemsList
                                notes={getFiltered()}
                                activeNoteIndex={noteIndex}
                                onClick={(id) => setNoteIndex(id)}
                                onDelete={(noteId, noteIndex) => (noteId !== undefined ? confirm("Do you wan't to delete this note?") : true) && deleteNote(noteId, noteIndex)}
                            />
                            <Footer>pp-worknotes | <a href="https://github.com/ppokojowczyk/pp-worknotes/">git repository</a></Footer>
                        </div>
                        <div className="editor-wrapper">
                            {notes[noteIndex] && <Editor
                                title={notes[noteIndex].title}
                                content={notes[noteIndex].content}
                                onChange={(field, value) => {
                                    updateNote(noteIndex, field, value);
                                }}
                            />}
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            )}
        </NotesProviderContext.Consumer>
    )
}

export default Context;