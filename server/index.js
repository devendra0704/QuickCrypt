import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/Routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.FRONTEND_URL


app.use(express.json());
app.use(cors(
  {
    origin: HOST, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials:true
  }
));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

