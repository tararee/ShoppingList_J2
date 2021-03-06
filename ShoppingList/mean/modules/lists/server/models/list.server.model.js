'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * List Schema
 */
var ListSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill List name',
    trim: true
  },
  items: {
    type: Array,
    default: [],
  },

  color: {
    type: String,
  },
  priority: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('List', ListSchema);
