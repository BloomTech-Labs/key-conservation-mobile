// const SECURE_WEBSOCKET_URL = `ws://192.168.1.146:8000`;
const SECURE_WEBSOCKET_URL = `https://key-conservation-staging.herkouapp.com`;

export default function () {
  var singleton;

  function createInstance() {
    let instance = new WebSocketManager();
    return instance;
  }

  return Object.freeze({
    getInstance: function () {
      if (!singleton) {
        singleton = createInstance();
      }
      return singleton;
    },
  });
}

class WebSocketManager {
  socket;

  subscriptions = {};

  connected = false;

  reconnecting = false;

  message;

  loggerEnabled = false;

  constructor() {
    this.socket = new WebSocket(SECURE_WEBSOCKET_URL);

    this.socket.onopen = () => {
      this.connected = true;
      this.logMessage(`Connected`);
    };

    this.socket.onerror = (error) => {
      this.connected = false;

      this.logMessage(`Connection Interrupted: ${error.message}`);
    };

    this.socket.onclose = (e) => {
      this.connected = false;
      this.logMessage(`Disconnected`);
    };

    this.socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.handleDispatchMessage(message);
    };
  }

  setLoggerEnabled(enabled) {
    this.loggerEnabled = enabled;
    this.logMessage(`Verbose logging enabled`);
  }

  logMessage(message) {
    if (this.loggerEnabled) console.log(`[WebSockets] ${message}`);
  }

  handleDispatchMessage(message) {
    this.logMessage(`Data Recieved - ${message}`);
    for (let [key, callback] of Object.entries(this.subscriptions)) {
      if (message[key]) {
        callback(message[key]);
      }
    }
  }

  subscribe(key, callback) {
    this.subscriptions[key] = callback;
  }

  unsubscribe(key) {
    delete this.subscriptions[key];
  }

  reconnect() {
    if (this.reconnecting) return;
    this.reconnecting = true;
    if (!this.connected) {
      this.logMessage(`Reconnecting...`);
      this.socket = new WebSocket(SECURE_WEBSOCKET_URL);
    } else {
      this.logMessage(`Tried to reconnected, but is already connected`);
    }
    this.reconnecting = false;
  }
}
