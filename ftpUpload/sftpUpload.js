var fs = require('fs');
var stat = fs.stat;

let Client = require('ssh2-sftp-client');


// let remoteFilePath = '/opt/tomcat7/webapps/app/mobile'
// let localFilePath = '/Users/zxs/Documents/workSpace/万达/wwz/wd_mobile/dist'

// let host = '172.16.110.41';
// let port = 22;
// let username = 'root';
// let password = 'wonders';

let remoteFilePath = '/root/../tomcat7/webapps/110/app/mobile'
let localFilePath = '/Users/zxs/Documents/workSpace/万达/wwz/wd_mobile/dist'

let host = '182.150.20.153';
let port = 2222;
let username = 'root';
let password = '123cdjd@';

let count = 0;
let finishCount = 0;

let sftp = new Client();
sftp.connect({
	host: host,
	port: port,
	username: username,
	password: password
}).then(() => {
	console.log('do');
	listFiles();
	checkDir(localFilePath, remoteFilePath);
}).then((data) => {
	console.log('connect success');
}).catch((err) => {
	console.log(err, 'connect error');
});

function listFiles() {
	// return sftp.list('/pathname');
	sftp.list(remoteFilePath).then(
		(data)=>{
			console.log(data);
		}
	)
}

function checkDir(localFilePath, remoteFilePath) {
	console.log(localFilePath);
	countFiles(localFilePath);
	fs.exists(localFilePath, function(exists) {
		if (!exists) { //不存在
			console.log(localFilePath + '本地目录不存在');
			// sftp.end();
		} else { //存在
			countFiles(localFilePath);
			console.log('count:' + count);
			removeFiles(sftp, remoteFilePath);
		}
	})
}

function countFiles(fileDir) {
	fs.readdir(fileDir, function(err, paths) {
		paths.forEach(function(path) {
			var _src = fileDir + '/' + path;
			stat(_src, function(err, st) {
				if (err) {
					throw err;
				}
				if (st.isFile()) {
					count++;
				} else if (st.isDirectory()) {
					countFiles(_src);
				}
			})
		})
	})
}

function putDir(localFilePath, remoteFilePath) {
	console.log('creating' + remoteFilePath);
	sftp.mkdir(remoteFilePath, true).then((data) => {
		console.log('creat dir success');
		fs.readdir(localFilePath, function(err, paths) {
			console.log(paths);
			if (err) {
				throw err;
			}
			paths.forEach(function(path) {
				var _src = localFilePath + '/' + path;
				var _dst = remoteFilePath + '/' + path;
				stat(_src, function(err, st) {
					if (err) {
						throw err;
					}
					if (st.isFile()) {
						put(sftp, _src, _dst);
					} else if (st.isDirectory()) {
						putDir(_src, _dst);
					}
				});
			});
		})
	}).catch((err) => {
		console.log(err, 'creat dir error');
	});
}

function put(sftp, fromSrc, toSrc, next) {
	sftp.put(fromSrc, toSrc).then((data) => {
		finishCount++;
		if (count == finishCount) {
			sftp.end();
		}
		if (next) {
			next();
		}
	}).catch((err) => {
		console.log(err, 'uploadFile error');
	});
}

function removeFiles(sftp, dir, next) {
	sftp.rmdir(dir, true).then((data) => {
		console.log('clear files success!');
		putDir(localFilePath, remoteFilePath);
		if (next) {
			next(sftp, dir);
		}
	}).catch((err) => {
		console.log(err, 'clear files error');
		if (next) {
			next(sftp, dir);
		}
	});
}