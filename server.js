const express = require('express');
const connectDB = require('./config/db'); 
const { startScheduler } = require('./services/scheduler'); 
const weatherRoutes = require('./controllers/weatherController');


const app = express();
connectDB();
startScheduler();
app.use(express.json());
app.use('/api', weatherRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});