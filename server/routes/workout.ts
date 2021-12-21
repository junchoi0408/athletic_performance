import express, { Request, Response } from 'express';
import { getWorkouts, createWorkouts } from '../controller/workout';

const router = express.Router();

router.get('/', getWorkouts);

router.post('/', createWorkouts);

export default router;