module.exports = io => {
  const users = new Set();

  io.on("connection", () => {
    console.log("a user connected");
  });

  io.on("users:connect", ctx => {
    const {
      data: { username },
      socket
    } = ctx;

    const user = { id: socket.id, username };
    users.add(user);

    socket.broadcast.emit("users:add", user);
    socket.emit("users:list", Array.from(users));
  });

  io.on("message:add", ctx => {
    const {
      data: { senderId, roomId, text },
      socket
    } = ctx;

    socket.to(roomId).emit("message:add", { text, senderId });
    socket.emit("message:add", { text, senderId });
  });

  io.on("disconnect", ctx => {
    const { socket } = ctx;

    socket.broadcast.emit("users:leave", socket.id);

    users.forEach(user => {
      if (user.id === socket.id) {
        users.delete(user);
      }
    });
  });
};
