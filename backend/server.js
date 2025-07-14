const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => console.log(`Server running on port ${PORT}`));