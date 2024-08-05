"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/:id', product_1.getProduct);
router.post('/dummy-product', product_1.importProducts);
exports.default = router;
//# sourceMappingURL=product.js.map