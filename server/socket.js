const socketIO = require('socket.io');

let io = null;

const init = server => {
  io = socketIO(server);
};

const emit = payload => {
  if (!io) {
    throw new Error('Socket has not been initialised');
  }

  io.emit('socket-event', payload);
};

module.exports = {
  init,
  emit,
};
