const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    picture: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    tel: {
      type: String,
      required: [true, "Please add telephone number"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Cascade delete bookings when a car is deleted
CarSchema.pre("remove", async function (next) {
  console.log(`Booking being removed from car ${this._id}`);
  await this.model("Booking").deleteMany({ car: this._id });
  next();
});
// Reverse populate with virtuals
CarSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "car",
  justOne: false,
});
module.exports = mongoose.model("Car", CarSchema);
