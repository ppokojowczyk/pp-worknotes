import React, { useState } from 'react';
import Editor from './editor.jsx';
import ItemsList from './items-list.jsx';
import Menu from './menu.jsx';
import Footer from './footer.jsx';
import { getNotes, NotesProviderContext } from './notes-provider.jsx';
import { useEffect } from 'react';

const Context = () => {

    const [activeNoteId, setActiveNoteId] = useState(null);

    const [filter, setFilter] = useState('');

    const [activeNote, setActiveNote] = useState({});

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

    const findNote = (id) => {
        let foundNote = null;
        for (const note of notes) {
            if (note.id === id) {
                foundNote = note;
            }
        }
        return foundNote;
    }

    const renderEditor = (updateNote) => {
        return activeNoteId ? <Editor
            title={activeNote.title}
            content={activeNote.content}
            onChange={(field, value) => {
                const d = { ...activeNote };
                d[field] = value;
                setActiveNote(d);
                updateNote(activeNoteId, field, value, (newId) => {
                    newId && setActiveNoteId(newId);
                });
            }}
        /> : <></>;
    }

    useEffect(() => setActiveNoteId(null), [filter]);

    useEffect(() => {
        changeActiveNote(activeNoteId);
    }, [activeNoteId]);

    useEffect(() => {
        let id = null;
        if (window.location.hash) {
            id = window.location.hash.replace('#', '');
        }
        if (id) {
            setTimeout(() => setActiveNoteId(parseInt(id)), 500);
        }
    }, []);

    const changeActiveNote = (id) => {
        const note = findNote(id);
        if (note) {
            window.history.pushState({}, undefined, '/#' + id);
        }
        setActiveNote(note ? {
            title: note.title,
            content: note.content
        } : {});
    }

    const onDelete = (id, deleteNote) => {
        (id !== undefined ? confirm(`Do you wan't to delete this note?`) : true) && (() => {
            deleteNote(id);
            activeNoteId === id && setActiveNoteId(null);
        })();
    }

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
                                    const newNoteId = newNote();
                                    if (newNoteId === null) {
                                        throw Error("Missing note Id.");
                                    }
                                    setActiveNoteId(newNoteId);
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
                                activeNoteId={activeNoteId}
                                onClick={(id) => {
                                    setActiveNoteId(id);
                                }}
                                onDelete={(id) => onDelete(id, deleteNote)}
                            />
                            <Footer>pp-worknotes | <a href="https://github.com/ppokojowczyk/pp-worknotes/">git repository</a></Footer>
                        </div>
                        <div className="editor-wrapper">
                            {renderEditor(updateNote)}
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