const {
  notesAdd,
  notesDelete,
  notesEdit,
  getNotes
} = require("../controller/notesController");

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/notesAdd",authMiddleware, notesAdd);
router.post("/notesDelete",authMiddleware, notesDelete);
router.post("/notesEdit",authMiddleware, notesEdit);
router.get("/getNotes",authMiddleware, getNotes); 

module.exports = router;
