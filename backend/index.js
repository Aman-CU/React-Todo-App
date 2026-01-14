const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { default: mongoose } = require("mongoose");
const { todo } = require("./db");
const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  //Validating using zod
  const validate = createTodo.safeParse({ title, description });

  if (!validate.success) {
    return res.status(411).send({
      msg: "Invalid Input type",
    });
  }

  //after validation put the content in mongodb
  await todo.create({
    title: title,
    description: description,
    completed: false,
  });
  res.json({
    msg: "Todo Created Successfully",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos: todos,
  });
});

app.put("/completed", async (req, res) => {
  const id = req.body.id;

  //validating id
  const idValid = updateTodo.safeParse({
    id,
  });
  if (!idValid.success) {
    return res.status(411).send({
      msg: "Invalid Id",
    });
  }

  //after validation update the content in mongodb
  await todo.update(
    {
      _id: id,
    },
    {
      completed: true,
    }
  );

  res.send({
    msg: "Todo mark as completed",
  });
});

app.listen(3000);
