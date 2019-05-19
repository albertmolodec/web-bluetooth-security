const mongoose = require('mongoose');

/**
 * Device Types
 */
const deviceTypes = ['bulb', 'other'];

/**
 * Device Schema
 * @private
 */
const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: 'String',
    enum: deviceTypes,
    required: true,
  },
  service: {
    type: 'String',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

/**
 * @typedef Device
 */
module.exports = mongoose.model('Device', deviceSchema);
