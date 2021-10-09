import {Message} from "./Message";
import crypto from "crypto"

export class Player {
  id = null;
  name = '...';
  initialized = false;
  connection;
  responses = {};

  constructor(connection) {
    this.id = crypto.randomUUID();
    this.connection = connection;
  }

  setName(name) {
    this.name = name;
    this.initialized = true;
  }

  send(data) {
    this.connection.send(new Message(data).send())
  }

  setResponse(id, response) {
    this.responses[id] = response;
  }

  hasResponse(id) {
    if (this.responses.hasOwnProperty(id)) {
      return this.responses[id];
    }

    return false;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
    }
  }
}