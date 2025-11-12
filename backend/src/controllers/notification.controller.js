import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const { user } = req.params;

    const notifications = await Notification.findAll({
      where: { recipient: user },
      order: [["createdAt", "DESC"]],
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
