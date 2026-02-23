const express = require("express");
const { getAllUsersController, handleStatusController } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddlware");

const router = express.Router();

router.get('/getallusers', authMiddleware, getAllUsersController);
router.post('/handlestatus', authMiddleware, handleStatusController);

module.exports = router;
