const express = require('express');
const router = express.Router();

const BrandController = require('../controllers/brand.controller');
const brand_controller = new BrandController();

router.get('/listBrandNames', brand_controller.listBrandNames.bind(brand_controller));
router.get('/listPendingNewBrands', brand_controller.listPendingNewBrands.bind(brand_controller));
router.get('/:id?', brand_controller.list.bind(brand_controller));
router.get('/listByUsagePeriod/:usagePeriod', brand_controller.listByUsagePeriod.bind(brand_controller));
router.post('/', brand_controller.add.bind(brand_controller));
router.put('/:id', brand_controller.update.bind(brand_controller));
router.delete('/:id', brand_controller.delete.bind(brand_controller));

module.exports = router;
