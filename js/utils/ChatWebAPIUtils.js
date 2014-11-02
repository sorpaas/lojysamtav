var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var $ = require('jquery');
var API_SERVER = "http://lojysamsef.ns.mg/";

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
    function makeid()
    {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    $.ajax({
      type: 'POST',
      url: API_SERVER + "ask",
      data: { question: message.text }
    }).done(function(data) {
      if(data.error) {
        ChatServerActionCreators.receiveAll([{
          id: makeid(),
          threadID: 't_1',
          threadName: 'tavla la .logysamsef.',
          authorName: 'la .logysamsef.',
          text: ".i na go'i",
          timestamp: Date.now()
        }]);
      } else {
        ChatServerActionCreators.receiveAll([{
          id: makeid(),
          threadID: 't_1',
          threadName: 'tavla la .logysamsef.',
          authorName: 'la .logysamsef.',
          text: data.result,
          timestamp: Date.now()
        }]);
      }
      console.log(data);
    }).fail(function() {
      ChatServerActionCreators.receiveAll([{
        id: makeid(),
        threadID: 't_1',
        threadName: 'tavla la .logysamsef.',
        authorName: 'la .logysamsef.',
        text: ".i na go'i",
        timestamp: Date.now()
      }]);
    });

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

    // simulate success callback
    setTimeout(function() {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  }

};
