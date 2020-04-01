const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BrandSchema = new Schema({
  name: {
    type: String,
    max: 100,
    required: true
  },
  type: String,
  license_number: String,
  contact: {
    first_name: String,
    last_name: String,
    phone_number: String,
    email: String,
    email_verified: Boolean,
    verification_key: String,
    password: {
      type: String,
      default: ''
    },
  },
  is_accepted: {
    type: Boolean,
    default: false
  },
  is_info_completed: {
    type: Boolean,
    default: false
  },
  license_number: String,
  license_type: String,
  address_line1: String,
  address_line2: String,
  city: {
    type: String,
    max: 100
  },
  province: {
    type: String,
    max: 100
  },
  country: {
    type: String,
    max: 100
  },
  postal_code: String,
  additional_comments: String,
  about: {
    type: String,
    max: 200
  },
  website: {
    type: String,
    max: 100
  },
  banner: {
    type: String,
    max: 200
  },
  logo: {
    type: String,
    max: 200
  },
  is_registered: {
    type: Boolean
  },
  is_active: {
    type: Boolean,
    default: true
  },
  products: [{
    name: {
      type: String,
      max: 100
    },
    description: {
      type: String,
      max: 500
    },
    type: {
      type: String,
      max: 100
    },
    form: {
      type: String,
      max: 100
    },
    usage_period: {
      type: String,
      max: 100
    },
    image: {
      type: String,
      max: 200
    },
    image2: {
      type: String,
      max: 200
    },
    terpene: {
      type: Array,
    },
    cannabinoid: [{
      name: {
        type: String,
        max: 200
      },
      value: {
        type: String,
        max: 200
      },
    }]
  }]
});

BrandSchema.pre('remove', { document: true, query: false }, function() {
    const that = this;
    const Experience = require('./experience.model');
    Experience.find({brand_id: that._id}, function (err, docs) {
        if (err) return console.log(err);
        if (docs && docs.length > 0){
            docs.forEach(d => {
                d.remove();
            });
        }
    });
    //delete ad
});

module.exports = mongoose.model('Brand', BrandSchema, 'brand');