import express, { Request, Response } from 'express';
import { getWorkouts, createWorkouts, getRecord } from '../controller/workout';

const router = express.Router();

router.get('/', getWorkouts);

router.get('/record', getRecord);

router.post('/', createWorkouts);

export default router;