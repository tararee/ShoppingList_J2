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
    name: String,
    listColor: {
          type: String,
          default: 'tomato'
        },
    user: {
          type: Schema.ObjectId,
          ref: 'User'
    },
    listItems: [{
      itemName: String,
      itemIsChecked: {type: Boolean, default:false},
      itemPriority: String,
      itemNotes: String
    }]
});

mongoose.model('List', ListSchema);
