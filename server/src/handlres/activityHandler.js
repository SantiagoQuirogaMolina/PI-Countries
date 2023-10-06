const { createActivity, getAllActivities } = require("../controllers/activityController");


const getActivityHandler = async (req, res) => {
  try {
    const activity = await getAllActivities(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createActivityHandler = async (req, res) => {
  try {
    const activity = await createActivity(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getActivityHandler: getActivityHandler,
  createActivityHandler: createActivityHandler,
};
