import TransectionModel from "../models/Transection.js";

// @desc    Get all transections
// @route   GET /api/transections
// @access  Private
const getTransections = async (req, res) => {
  try {
    const transections = await TransectionModel.find({ user: req.user.id });
    console.log(transections);
    res.status(200).json({
      success: true,
      message: "All transections",
      data: transections,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: `Internal server error ${err.message}`,
    });
  }
};

// @desc    Add transection
// @route   POST /api/transections
// @access  Private
const addTransection = async (req, res) => {
  try {
    const newTransection = await TransectionModel.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Transection created successfully",
      data: newTransection,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: `Internal server error ${err.message}`,
    });
  }
};

// @desc    Delete transection
// @route   DELETE /api/transections/:id
// @access  Private
const deleteTransection = async (req, res) => {
  try {
    const transection = await TransectionModel.findById(req.params.id);
    if (!transection) {
      return res.status(404).json({
        success: false,
        message: "Transection not found",
      });
    }
    await transection.remove();
    res.status(200).json({
      success: true,
      message: "Transection deleted successfully",
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getTransections, addTransection, deleteTransection };
