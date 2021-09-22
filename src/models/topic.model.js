const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const topicSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  urls: {
    type: Array,
  },
  message: {
    type: String,
  },
});

// add plugin that converts mongoose to json
topicSchema.plugin(toJSON);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
