import { createEvent } from "../services/event.service.js";
import {
  errorResponseHelper,
  successResponseHelper,
  serverErrorHelper,
} from "../helpers/utilityHelper.js";
import { sendOTPEmail } from "../helpers/sendMail.js";
import { findUserById } from "../services/user.service.js";
import { notificationUser } from "../helpers/notification.js";
import { createCustomer } from "../services/stripe.service.js";
import {
  getStatusOfEventInvitation,
  findEventById,
  findEventByuserId,
  updateEventById,
  deleteEvent,
} from "../services/event.service.js";
import { onlineUsers } from "../loaders/socket_loader.js";
import Stripe from "stripe";
import { config } from "dotenv";
const Config = config();
const stripe = new Stripe(Config.parsed.STRIPE_SECRET_KEY);
const createEventsOfUsers = async (req, res) => {
  const onlineUser = onlineUsers();
  const { eventDescription, invitedIds } = req.body;

  try {
    const { id, email } = req.user;
    const io = req.app.get("io");

    if (!invitedIds) {
      return errorResponseHelper(res, { error: "Invited id must be required" });
    }

    const customer = await createCustomer(stripe);
    if (!customer) {
      return errorResponseHelper(res, {
        error: "Something went wrong with Stripe",
      });
    }

    const publishStatus = "UNPUBLISHED";
    const event = await createEvent(req.body, id, publishStatus, customer.id);
    if (!event) {
      return errorResponseHelper(res, { error: "No Event created" });
    }

    successResponseHelper(res, {
      message: "your event has been created with status unpublished",
    });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const sendApprovalReply = async (req, res) => {
  try {
    const { id } = req.user;
    const { eventId, approve, status } = req.body;
    const event = await findEventById(eventId);
    const date = event.eventDate;
    const eventDate = new Date(date);
    const now = new Date();
    if (now > eventDate) {
      return errorResponseHelper(res, {
        error: "Your Invitation has been expired",
      });
    }
    if (approve === false && status === "accepted") {
      return errorResponseHelper(res, { error: "something went wrong" });
    }
    if (approve === true && status === "rejected") {
      return errorResponseHelper(res, { error: "something went wrong" });
    }
    if (event.approved === true && event.status === "accepted") {
      return errorResponseHelper(res, {
        error: "You already accept the inviation",
      });
    }
    if (event.approved === false && event.status === "rejected") {
      return errorResponseHelper(res, {
        error: "You already rejected the invitation",
      });
    }
    if (event.approved === false && event.status === "pending") {
      const [approval] = await getStatusOfEventInvitation(
        eventId,
        approve,
        status
      );

      if ([approval] < 1) {
        return errorResponseHelper(res, { error: "Status not changed" });
      }
      const updatedEvent = await findEventById(eventId);
      if (
        updatedEvent.approved === false &&
        updatedEvent.status === "rejected"
      ) {
        return errorResponseHelper(res, {
          error: "You invitation has been rejected",
        });
      }
      if (
        updatedEvent.approved === true &&
        updatedEvent.status === "accepted"
      ) {
        return successResponseHelper(res, {
          message: "Your invitation has been accepted",
        });
      }
    }
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const getEventsById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await findEventById(id);
    if (!events) {
      return errorResponseHelper(res, { error: "No Event Found" });
    } else {
      return successResponseHelper(res, events);
    }
  } catch (error) {
    serverErrorHelper(res, error);
  }
};

const getEventByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await findEventByuserId(id);
    if (!events) {
      return errorResponseHelper(res, { error: "No Event Found" });
    }
    return successResponseHelper(res, events);
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const updateEventController = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, eventDescription, eventDate, location } = req.body;
    const payload = {
      eventName,
      eventDescription,
      eventDate,
      location,
    };
    const [event] = await updateEventById(payload, id);
    console.log(event, "event");
    if (event < 1) {
      return errorResponseHelper(res, { error: "event not found" });
    }
    return successResponseHelper(res, { message: "event has been updated" });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await deleteEvent(id);
    if (event >= 1) {
      return successResponseHelper(res, { error: "error in deleting data" });
    }
    return successResponseHelper(res, { message: "user has been deleted" });
  } catch (error) {
    return serverErrorHelper(res, error);
  }
};

export {
  createEventsOfUsers,
  sendApprovalReply,
  getEventsById,
  getEventByUserId,
  updateEventController,
  deleteEventById,
};
