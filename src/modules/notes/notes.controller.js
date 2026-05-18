import { notes } from "./note.model.js";

export const getNotes = (req, res) => {
  res.json({ notes });
};

export const createNote = (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const nextId = String(
    (notes.reduce((max, n) => Math.max(max, Number(n.id)), 0) || 0) + 1,
  );

  const newNote = { id: nextId, title, content };
  notes.push(newNote);

  return res.status(201).json(newNote);
};

export const deleteNote = (req, res) => {
  const index = notes.findIndex((n) => n.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  const deleted = notes.splice(index, 1);

  res.status(200).json(deleted[0]);
};
