import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentLink: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentInfo = mongoose.model("PaymentInfo", PaymentSchema);

export default PaymentInfo;
