'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
    name: String,
    listColor: {
          type: String,
          default: 'tomato'
        },
   
    listItems: [{
      itemName: String,
      itemIsChecked: {type: Boolean, default:false},
      itemPriority: String,
      itemNotes: String
    }]
});

mongoose.model('Article', ArticleSchema);
