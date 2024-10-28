const { exec } = require('child_process');
const { log } = require('console');


// exec('ls', (err, stdout, stderr) => {
//    if (err) {
//       // node couldn't execute the command
//       return;
//    }

//    // the *entire* stdout and stderr (buffered)
//    console.log(`stdout: ${stdout}`);
//    console.log(`stderr: ${stderr}`);
// });
//get info about the current network
const os = require('os');
console.log(os.networkInterfaces()); 
