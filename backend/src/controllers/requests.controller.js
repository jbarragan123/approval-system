import Request from "../models/request.model.js";
import RequestHistory from "../models/requestHistory.model.js";
import Notification from "../models/notification.model.js"; // 👈 importamos el modelo

export const createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);

    await RequestHistory.create({
      requestId: newRequest.id,
      previousStatus: null,
      newStatus: newRequest.status,
      changedBy: newRequest.approver,
      comment: "Solicitud creada",
    });

    let message = "";
    // if (status === "approved") {
      message = `La solicitud "${newRequest.title}" se te ha asignado.`;
    // } else if (status === "rejected") {
    //   message = `Tu solicitud "${request.title}" ha sido rechazada.`;
    // } else {
    //   message = `Tu solicitud "${request.title}" ha cambiado de estado a ${status}.`;
    // }

    await Notification.create({
      recipient: newRequest.approver, 
      message,
      requestId: newRequest.id,
      isRead: false,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.findAll();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });

    const previousStatus = request.status;
    request.status = status;
    request.comment = comment;
    await request.save();

    await RequestHistory.create({
      requestId: request.id,
      previousStatus,
      newStatus: status,
      changedBy: request.approver,
      comment,
    });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestHistory = async (req, res) => {
  const requestId = req.params.id;
  try {
    const history = await RequestHistory.findAll({
      where: { requestId },
      order: [["createdAt", "ASC"]],
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
