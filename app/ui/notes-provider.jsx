import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

let updateTimeout = null;

export const NotesProviderContext = React.createContext({
    notes: [],
    updateNote: () => { },
    loading: () => { },
    newData: () => { },
    reloadData: () => { }
});

const _newNote = (note) => {
    return axios.post('/note', note);
};

const _updateNote = (note) => {
    return axios.patch('/note', note);
};

const _deleteNote = (noteId) => {
    if (noteId === undefined) {
        throw new Error("Invalid note ID.");
    }
    return axios.delete('/note/' + noteId);
};

const loadData = () => {
    return axios.get('/notes').then((response) => {
        return response.data;
    });
}

export const refreshData = () => {
    const { reloadData } = useContext(NotesProviderContext);
    return reloadData;
}

export const isLoading = () => {
    const { loading } = useContext(NotesProviderContext);
    return loading;
}

export const getNotes = () => {
    const { notes } = useContext(NotesProviderContext);
    return notes;
}

export const NotesProvider = (props) => {

    const [notes, setNotes] = useState([]);

    const [loading, setLoading] = useState(false);

    const [firstLoad, setFirstLoad] = useState(false);

    const [tempIdCount, setTempIdCount] = useState(0);

    const clearNotes = () => {
        setNotes(prevState => {
            const notes = [];
            prevState.forEach((note) => {
                if (note.id !== undefined) {
                    notes.push(note);
                }
            });
            return notes;
        });
    };

    const findNoteIndex = (id) => {
        let index = null;
        for (const note of notes) {
            if (note.id === id) {
                index = notes.indexOf(note);
            }
        }
        return index;
    }

    const isTempNote = (note) => {
        if (!note) {
            throw Error("Invalid note.");
        }
        if (!note.id) {
            throw Error("Invalid note id.");
        }
        return (note.id.toString().indexOf("TEMP") !== -1);
    }

    const updateNote = (id, field, value, callback) => {
        const index = findNoteIndex(id);
        if (index === null) {
            throw new Error("Index not found.");
        }
        setNotes(prevState => {
            let newNotes = [...prevState];
            newNotes[index][field] = value;
            return newNotes;
        });
        saveNote(notes[index], callback);
    }

    const saveNote = (note, callback) => {
        if (updateTimeout !== null) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(() => {
            setLoading(true);
            let isTemp = false;

            if (isTempNote(note)) {
                delete note.id;
                isTemp = true;
            }

            let newId = null;

            (note.id ? _updateNote(note) : _newNote(note))
                .then((response) => {
                    newId = response.data || null;
                }, () => {
                }).finally(() => {
                    setLoading(false);
                    reloadData(() => {
                        callback(isTemp ? newId : null);
                    });
                }).catch(() => {
                    throw Error("Something bad happened.");
                })
            updateTimeout = null;
        }, 1000);
    }

    const newNote = () => {
        clearNotes();
        const note = {
            id: `TEMP_${tempIdCount}`,
            title: '',
            content: '',
            date: new Date()
        };
        setNotes(prevState => {
            return [note, ...prevState];
        });
        setTempIdCount(tempIdCount + 1);
        return note.id;
    }

    const reloadData = (callback = null) => {
        setLoading(true);
        loadData().then(data => {
            setNotes(data);
            typeof callback === 'function' && callback();
        }).finally(() => {
            setLoading(false);
        });
    }

    const deleteNote = (noteId) => {
        const noteIndex = findNoteIndex(noteId);
        if (noteIndex >= 0) {
            setNotes(prevState => {
                const notes = [...prevState];
                notes.splice(noteIndex, 1);
                return notes;
            });
        }
        if (noteId !== undefined) {
            _deleteNote(noteId);
        }
    };

    useEffect(() => {
        if (firstLoad === false) {
            reloadData();
            setFirstLoad(true);
        }
    });

    return (
        <NotesProviderContext.Provider value={{ notes, updateNote, loading, newNote, deleteNote, reloadData }}>
            {props.children}
        </NotesProviderContext.Provider>
    )
}
