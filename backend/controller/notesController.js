const Note = require("../models/model");

const notesAdd = async (req, res) => {
  const { title, content } = req.body;
  try {
    await Note.create({
      userId:req.userId,
      title,
      content,
    });

    return res.status(200).json({
      message: "Note Added",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      success: false,
    });
  }
};

const notesDelete = async (req, res) => {
  const { noteId } = req.body;
  try {
    const delNote = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.userId,
    });

    if (!delNote)
      return res.status(404).json({
        message: "Notes Not Found",
        success: false,
      });

    return res.status(200).json({
      message: "Note deleted",
      success: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

const notesEdit = async (req, res) => {
  const { noteId, title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.userId },
      { $set: { title, content } },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found or unauthorized",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      success: true,
      note: updatedNote,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getNotes = async (req, res) => {

  try {
    const notes = await Note.find({ userId:req.userId });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { notesAdd, notesDelete, notesEdit,getNotes };
