const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const taskRoutes = require('./routes/taskRoutes');
const authenticateToken = require('./middlewares/auth');
const authRoutes = require('./routes/auth')

require('dotenv').config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/auth', authRoutes);

// Documentación con Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API para gestionar tareas',
        },
        servers: [
            {
                url: 'http://localhost:4000/api',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Ruta donde estarán las anotaciones de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
