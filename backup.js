// npm install dependencies
//cron-timer, Destination and Source File can by changed and found in .env
require("dotenv").config();
const CronJob = require("cron").CronJob;
const Rsync = require("rsync");

const copyProgramm = process.platform === "win32" ? "robocopy" : "rsync";
 
// .flags "a" -> archived whole dir 
rsync = new Rsync()
    executable("copyProgramm");
    .flags("a") 
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
