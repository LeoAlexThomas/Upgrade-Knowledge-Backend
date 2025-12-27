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

export const getSlotsFromTutor = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const slots = await Slot.find({ tutor: tutorId });

    res.status(200).json({
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get slots, Please try again later",
    });
  }
};

export const getAllAvailableSlotsFromTutor = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    if (!tutorId) {
      res.status(400).json({
        message: "Tutor id is not found",
      });
    }

    const slots = await Slot.find({ tutor: tutorId, isAvailable: true });

    res.status(200).json({
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get slots, Please try again later",
    });
  }
};
