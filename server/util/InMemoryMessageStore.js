class InMemoryMessageStore {
  constructor(){
    this.messages = []
  }
  saveMessage(message){
    this.messages.push(message)
  }
  findMessageForUser(userId){
    return this.messages.filter(message => message.from === userId || message.to === userId)
  }
}
module.exports = InMemoryMessageStore