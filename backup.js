// npm install dependencies
//cron-timer, Destination and Source File can by changed and found in .env
require("dotenv").config();
const CronJob = require("cron").CronJob;
const Rsync = require("rsync");

// plattformunabänigkeit
const copyProgram = process.platform === 'win32' ? 'robocopy' : 'rsync';


rsync = new Rsync()
    .executable(copyProgram)
    // .flags "a" -> copying whole dir
    .flags("a") 
    // reads from the .env file in project dir
    .source(process.env.SOURCE_DIR)
    .destination(process.env.DESTINATION_DIR);

const job = new CronJob(
    process.env.CRON_STRING,
    () => {
        rsync.execute((error, code, cmd) => {

            console.log("backup completed with status code: " + code);
        });
    },
null,
true, 


"Europe/Berlin"
);

job.start();
