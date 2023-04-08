let express = require('express');
let bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
let spawnObj = require('child_process').spawn;
const WindowsToaster = require('node-notifier').WindowsToaster;





/*

INSTALLING AS SERVICE (WINDOWS)
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'name',
    description: 'desc',
    script: __dirname + '\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.

svc.on('install',function(){
    console.log("installing as a service!");
    svc.start();
});

svc.install();
*/

// VARIABLES
let app = express();
let notifier = new WindowsToaster({
    withFallback: false, // Fallback to Growl or Balloons?
    customPath: undefined // Relative/Absolute path if you want to use your fork of SnoreToast.exe
});
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + '.' + minutes + ampm;
    return strTime.replace(" ", "");
}

function formatDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-')+ "-"+formatAMPM(d);
}
async function createLogFile(errormessage)
{
    let filePath = './errorlog/error_log-'+formatDate()+".txt";
    await fs.writeFile(filePath, errormessage.message, {flag: 'w'} ,  function(err) {
        if (err) {
            return console.error(err);
        }
    });
    return filePath;
}
function openLogFile(path)
{
    spawnObj('C:\\windows\\notepad.exe', [path]);
}
// SERVER
app.use(bodyParser.urlencoded({ extended: false }));
app.listen("INSERT YOUR PORT", 'INSERT YOUR IP');
app.post('/<ROUTE DEFINE>', function(req, res) {
    if(req.query.message === undefined)
    {
        res.send('false');
        return;
    }
    notifier.notify(

        // view more: https://www.npmjs.com/package/node-notifier
        {
            title: '<Title>',
            message: '<Message>',
            icon: '<icon>', // Absolute path
            appID: 'appID',
            sound: true,
        },
        async function (err, response, metadata)
        {
            if(metadata.action !== 'timedout' && metadata.action !== 'dismissed')
            {
                openLogFile(await createLogFile(req.query));
            }
        }
    )
    res.send('true');
});
