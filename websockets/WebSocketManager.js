import { seturl } from '../store/actions';
const SECURE_WEBSOCKET_URL = seturl;

export default class WebSocketManager {
  static singleton = null;

  static getInstance() {
    if (WebSocketManager.singleton == null) {
      WebSocketManager.singleton = new WebSocketManager();
    }

    return WebSocketManager.singleton;
  }

  socket;

  subscriptions = {};

  connected = false;

  reconnecting = false;

  message;

  loggerEnabled = false;

  constructor() {
    this.socket = this.initSocket();
  }

  initSocket() {
    const socket = new WebSocket(SECURE_WEBSOCKET_URL);

    socket.onopen = () => {
      this.connected = true;
      this.logMessage(`Connected`);
    };

    socket.onerror = (error) => {
      this.connected = false;

      this.logMessage(`Connection Interrupted: ${error.message}`);
    };

    socket.onclose = (e) => {
      this.connected = false;
      this.logMessage(`Disconnected`);
      this.reconnect();
    };

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      this.logMessage(e.data);
      this.handleDispatchMessage(message);
    };

    return socket;
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
      this.socket = this.initSocket();
    } else {
      this.logMessage(`Tried to reconnected, but is already connected`);
    }
    this.reconnecting = false;
  }
}
