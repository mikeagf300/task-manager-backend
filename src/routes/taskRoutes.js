const express = require('express');
const { body } = require('express-validator');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Crear una tarea
router.post(
    '/',
    body('title').notEmpty().withMessage('El título es obligatorio'),
    createTask
);

// Obtener todas las tareas
router.get('/', getTasks);

// Obtener una tarea por ID
router.get('/:id', getTaskById);

// Actualizar una tarea
router.put('/:id', updateTask);

// Eliminar una tarea
router.delete('/:id', deleteTask);

module.exports = router;
