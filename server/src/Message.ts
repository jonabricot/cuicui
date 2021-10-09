export class Message {
  data;
  
  constructor(data) {
    this.data = data;
  }
  
  serialize(data) {
    return JSON.stringify(data)
  }
  
  deserialize(data) {
    return JSON.parse(data)
  }
  
  log(...data) {
    console.log(...data)
  }
  
  receive() {
    const data = this.deserialize(this.data);
    this.log('Received:', data);
    return data;
  }
  
  send() {
    const data = this.serialize(this.data);
    this.log('Send:', data);
    return data;
  }
}