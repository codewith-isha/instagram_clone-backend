const express = require("express");
const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photos: {
      type: String,
      required: true,
    },
    likes: {
      type: ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: String,
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = moongoose.model("Post", postschema);
