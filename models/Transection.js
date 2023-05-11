import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transectionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    refrence: {
      type: String,
      required: [true, "Refrence is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId : {
      type: String,
      required: [true, "User Id is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

const Transection = mongoose.model("Transection", transectionSchema);

export default Transection;