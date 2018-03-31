var expect = require('expect');
var {generateMessage}=require('./message');
describe('generateMessage',()=> {
 
  it('deberia generar un mensaje correcto',()=> {
      var from ='jen';
	  var text ='algun mensaje';
	  var message=generateMessage(from,text);
	  expect(message.createAt).toBeA('number');
	  expect(message).toInclude({
		  from,
		  text
	   });
   });

});
