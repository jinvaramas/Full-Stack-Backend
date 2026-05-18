import { Router } from "express";
import { users } from "../../fakeData/fakeUsers.js";

export const router = Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const { username, email } = req.body || {};

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  // Simple incremental string id based on current mock data
  const nextId = String(
    (users.reduce((max, u) => Math.max(max, Number(u.id)), 0) || 0) + 1,
  );

  const newUser = { id: nextId, username: username, email: email };

  users.push(newUser);

  return res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {

});

// router.delete();