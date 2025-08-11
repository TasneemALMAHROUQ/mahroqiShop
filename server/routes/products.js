const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProduct);

router.post('/', authenticateToken, authorizeRoles('admin'), productsController.createProduct);
router.put('/:id', authenticateToken, authorizeRoles('admin'), productsController.updateProduct);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), productsController.deleteProduct);

module.exports = router;
