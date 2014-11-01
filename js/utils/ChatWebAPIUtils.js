var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var $ = require('jquery')
var API_SERVER = "http://localhost:8080/";

module.exports = {

  initMessage: function() {
    // simulate retrieving data from a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));

    // simulate success callback
    ChatServerActionCreators.receiveAll([{
        id: 'm_1',
        threadID: 't_1',
        threadName: 'tavla la .lojysamsef.',
        authorName: 'la .lojysamsef.',
        text: '.i do reisku ma mi',
        timestamp: Date.now()
    }]);
  },

  createMessage: function(message, threadName) {
    // simulate writing to a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    setTimeout(function() {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  }

};
