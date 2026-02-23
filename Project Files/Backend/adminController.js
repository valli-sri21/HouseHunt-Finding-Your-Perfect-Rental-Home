// controllers/adminController.js
const propertySchema = require("../schemas/propertyModel");
const userSchema = require("../schemas/userModel");
const bookingSchema = require("../schemas/bookingModel");

///////// Getting all users ///////////
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find({});
    if (!allUsers) {
      return res.status(404).send({
        success: false,
        message: "No users present",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

///////// Handling status for owner ///////////
const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
    const user = await userSchema.findByIdAndUpdate(
      userid,
      { granted: status },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: `User has been ${status}`,
    });
  } catch (error) {
    console.error("Error in handleStatusController:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

///////// Getting all properties ///////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});
    if (!allProperties || allProperties.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No properties present",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All properties fetched successfully",
      data: allProperties,
    });
  } catch (error) {
    console.error("Error in getAllPropertiesController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

///////// Get all bookings ///////////
const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await bookingSchema.find();
    return res.status(200).send({
      success: true,
      message: "All bookings fetched successfully",
      data: allBookings,
    });
  } catch (error) {
    console.error("Error in getAllBookingsController:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsersController,
  handleStatusController,
  getAllPropertiesController,
  getAllBookingsController,
};
