import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/Routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// dbconnect();

app.use(express.json());
app.use(cors(
  {
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  }
));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

