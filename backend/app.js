const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

connectDB();

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // This line was added

app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.use(errorHandler);

module.exports = app;