import mongoose from "mongoose";

const SlotSchema = mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", SlotSchema);
export default Slot;
