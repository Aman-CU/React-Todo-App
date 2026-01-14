const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();

app.use(express.json());

app.post("/todo", (req, res) => {
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
  return res.json({
    msg: "Todo Created Successfully",
  });
});

app.get("/todos", (req, res) => {});

app.put("/completed", (req, res) => {
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
});

app.listen(3000);
