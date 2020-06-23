import React from 'react';
import { useSelector } from 'react-redux';

// export const notes = useSelector((state) => state.notifications);

// export const notesLength = notes.length;

// const newNotesLength =

const notes = useSelector((state) => state.notifications);

export const newNotesLength = () => {
  return console.log(notes);
};
