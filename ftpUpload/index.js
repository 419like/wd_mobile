

var dir = 'mobile'

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
  remoteRoot: "/"+dir,
  // include: ['build/version.txt'],
  // exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}
function upFile(){
  ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished\npress "Ctrl+c" quit');
  });
}


var Client = require('ftp');
var c = new Client();
c.on('ready', function() {
  c.rmdir('mobile',true,function(err){
    mkdir();
  })
});
function mkdir(){
  c.mkdir(dir,true,function(err){
  upFile();
 })
}
// connect to localhost:21 as anonymous 
c.connect({
	host:'192.168.2.9',
	user:'administrator',
	password:'123',
});



for (var i = 0; i < list.lenght; i++) {
  if(list[i].newValue){
    // 写入你要存的数据
  }
}

