import express from 'express';
import bodyParser from 'body-parser';
import {
    addAnimal,
    deleteAnimal,
    getAllAnimals,
  } from "./controllers/AnimalController.js";

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})

app.get('/animals', (req,res) =>{
  getAllAnimals(req,res);
})

app.post('/animals', (req,res) => {
  addAnimal(req,res);
})

app.delete('/animals', (req,res) => {
  deleteAnimal();
})