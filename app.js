require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: true },
  { id: 3, task: 'FullStack Development', completed: false },
  { id: 4, task: 'Week 3 Assignment', completed: true },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json({todos, message: "All todos fetched successfuly"}); // Send array as JSON
});





//------------------ ASSIGNMENT 2 start------------Post velidation-------------------------
//
// POST New – Create
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID

// --------Assignment here
  if(!newTodo.task){
     return res.status(400).json({ err: 'Task field is required' });
  }

  todos.push(newTodo); 
  res.status(201).json(newTodo); // Echo back
});
//------------------ ASSIGNMENT 2 end-------------------------------------





// PATCH Update – Partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
});



app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); 
});



//------------------ ASSIGNMENT 3 start------------Fetch Active Task/todos--------------------

app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter((t) => !t.completed);
  res.json(activeTodos); 
});
//------------------ ASSIGNMENT 3 end----------------------------------



//------------------ ASSIGNMENT 1 start-----------------Get task by ID--------------------
//GET Todo By ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if(!todo){
    return res.status(404).json({err: `No todo with the ID ${id} found`})
  }
     res.status(200).json(todo);
});
//------------------ ASSIGNMENT 1 end-------------------------------------






app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
