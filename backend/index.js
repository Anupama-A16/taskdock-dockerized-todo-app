const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'todo'
});

// Connect to MySQL
conn.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }

    console.log('Connected to MySQL database!');
});

// GET: Retrieve all tasks
app.get('/allTasks', (req, res) => {
    conn.query('SELECT * FROM task', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to retrieve tasks'
            });
        }

        res.json(result);
    });
});

// DELETE: Delete a task
app.delete('/task/:taskId', (req, res) => {
    const taskId = req.params.taskId;

    conn.query(
        'DELETE FROM task WHERE TaskID = ?',
        [taskId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to delete task'
                });
            }

            res.json({ message: 'Task deleted successfully' });
        }
    );
});

// POST: Add a new task
app.post('/task', (req, res) => {
    const { task_name } = req.body;

    if (!task_name || !task_name.trim()) {
        return res.status(400).json({
            message: 'Task name is required'
        });
    }

    conn.query(
        'INSERT INTO task(Task) VALUES(?)',
        [task_name.trim()],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to add task'
                });
            }

            res.status(201).json({
                message: 'Task added successfully',
                taskId: result.insertId
            });
        }
    );
});

// Start backend server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
