


var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var path = require('path')
var distPath = path.resolve(__dirname, '..')+'/dist';
var config = {
  host:'192.168.2.9',
  username:'administrator',
  password:'123',
  port: 21,
  localRoot: distPath,
  remoteRoot: "/",
  // include: ['build/version.txt'],
  // exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}
  
ftpDeploy.deploy(config, function(err) {
  if (err) console.log(err)
  else console.log('finished');
});

// var Client = require('ftp');
 
//   var c = new Client();
//   c.on('ready', function() {
//   	c.delete('aaa1',function(e){console.log(e);})
//   });
//   function showList(){
//   	c.list(function(err, list) {
//       if (err) throw err;
//       console.dir(list);
//       c.end();
//     });
//   }
//   // connect to localhost:21 as anonymous 
//   c.connect({
//   	host:'192.168.2.9',
//   	user:'administrator',
//   	password:'123',
//   });





