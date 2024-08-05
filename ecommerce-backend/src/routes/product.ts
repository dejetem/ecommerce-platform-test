import { Router } from "express";
import {getProducts, getProduct, importProducts} from "../controllers/product"
const router: Router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/dummy-product', importProducts);

export default router;