import { Error } from "mongoose";
import Slot from "../Models/SlotSchema.js";

export const addSlot = async (slot, tutorId) => {
  const slots = await Slot.find({ tutor: tutorId });
  if (
    slots.some(
      (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
    )
  ) {
    throw new Error("Slot already exists");
  }
  const newSlot = new Slot({ ...slot, tutor: tutorId });
  await newSlot.save();
  return newSlot;
};
