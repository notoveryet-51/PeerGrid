const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    canonicalName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    type: {
      type: String,
      enum: ['skill', 'interest', 'goal'],
      required: true,
      index: true,
    },
    aliases: [{ type: String, lowercase: true, trim: true }],
  },
  { timestamps: true }
);

tagSchema.index({ type: 1, aliases: 1 });

module.exports = mongoose.model('Tag', tagSchema);