const express = require('express');
const connectDB = require('./config/db');
const weatherRoutes = require('./controllers/weatherController');
const { startScheduler } = require('./services/scheduler');

const app = express();
connectDB();
startScheduler();

app.use(express.json());
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));