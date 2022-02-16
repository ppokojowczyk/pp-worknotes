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

    const updateNote = (index, field, value) => {
        setNotes(prevState => {
            let newNotes = [...prevState];
            newNotes[index][field] = value;
            return newNotes;
        });
        saveNote(notes[index]);
    }

    const saveNote = (note) => {
        if (updateTimeout !== null) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(() => {
            setLoading(true);
            (note.id ? _updateNote(note) : _newNote(note)).then(() => {
            }, () => {
            }).finally(() => {
                setLoading(false);
                reloadData();
            });
            updateTimeout = null;
        }, 1000);
    }

    const newNote = () => {
        clearNotes();
        const note = {
            title: '',
            content: '',
            date: new Date()
        };
        setNotes(prevState => {
            return [note, ...prevState];
        });
    }

    const reloadData = () => {
        setLoading(true);
        loadData().then(data => {
            setNotes(data);
        }).finally(() => {
            setLoading(false);
        });
    }

    const deleteNote = (noteId, noteIndex) => {
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
