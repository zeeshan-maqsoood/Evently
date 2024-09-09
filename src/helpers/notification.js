const notificationUser = (io, message, socketId) => {
  console.log(socketId,message,"message")
  if (socketId) {
    return io.to(socketId).emit("notification", message);
  } else {
    console.log("Socket ID is undefined. Cannot send notification.");
  }
};




export { notificationUser };
