const express = require('express');
const app = express();
const jobRoutes = require('./router/jobRouter');
const cors = require('cors');
const db = require('./config/db');

app.use(cors());
app.use(express.json());
app.use('/jobs', require('./router/jobRouter'));

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).json({
      statusCode: 200,
      message: 'Database connection successful',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Database connection error',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Service is running on port ${PORT}`);
});