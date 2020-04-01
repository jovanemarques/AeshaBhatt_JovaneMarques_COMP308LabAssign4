const Brand = require('../models/brand.model');
const BaseController = require('./base.controller');

function BrandController() {
  BaseController.call(this, {model: Brand, save_date_last_update: true});
}

BrandController.prototype = Object.create(BaseController.prototype);

BrandController.prototype.listByUsagePeriod = function(req, res) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 0;
  Brand.find({'products.usage_period': req.params.usagePeriod}, function(err, brand) {
    if (err) return res.status(500).send(err);
    res.json(brand);
  })
  .skip(size * (page - 1)) 
  .limit(size)
  .sort('date');
};

BrandController.prototype.listBrandNames = function(req, res) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 0;
  Brand.find({'is_registered': true}, function(err, brand) {
    if (err) return res.status(500).send(err);
    res.json(brand);
  })
  .select('name')
  .skip(size * (page - 1)) 
  .limit(size);
};

BrandController.prototype.listPendingNewBrands = function(req, res) {
  Brand.find({'is_accepted': false}, function(err, brand) {
    if (err) return res.status(500).send(err);
    res.json(brand);
  });
};

module.exports = BrandController;