import express, { Application } from 'express';
import cors from 'cors';
import connect from './db/connect';
import workoutRoutes from './routes/workout';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/workout', workoutRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

    connect();
})

