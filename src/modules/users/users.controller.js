import { users } from "./user.model.js";

export const getUsers = (req, res) => {
  res.json({ users });
};

export const createUser = (req, res) => {
  const { username, email } = req.body || {};

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  const nextId = String(
    (users.reduce((max, u) => Math.max(max, Number(u.id)), 0) || 0) + 1,
  );

  const newUser = { id: nextId, username, email };
  users.push(newUser);

  return res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ error: "username, email, and password are required" });
  }

  user.username = username;
  user.email = email;
  user.password = password;

  res.status(200).json(user);
};

export const deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deleted = users.splice(index, 1);

  res.status(200).json(deleted[0]);
};
