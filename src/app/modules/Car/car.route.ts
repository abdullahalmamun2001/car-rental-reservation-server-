import { validateRequest } from './../../middleware/validateRequest';
import { Router } from 'express';
import {
  createCarController,
  deleteSingleCarCarController,
  getAllCarCarController,
  getSingleCarCarController,
  updateSingleCarCarController,
} from './car.controller';
import { carSchemaWithZod } from './car.validation';

const router = Router();
router.post('/', validateRequest(carSchemaWithZod), createCarController);
router.get('/', getAllCarCarController);
router.get('/:id', getSingleCarCarController);
router.put('/:id', updateSingleCarCarController);
router.delete('/:id', deleteSingleCarCarController);

export const carRoute = router;
