#!/usr/bin/env node

const axios = require("axios");
var moment = require("moment-timezone");
let url =
  "https://api.sheety.co/d0f46864a95a4b7afc0d9d28edf2c0d8/taskDatabase/taskDb";
console.log(moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD hh:mm A"));
const qs = require("qs");
const sebelum = moment().tz("Asia/Kuala_Lumpur").format("2021-03-05 08:00 PM");
const selepas = moment().tz("Asia/Kuala_Lumpur").format("2021-03-05 08:59 PM");
let incrementGlobal;
var schedule = require("node-schedule");
var increments;
var modulus;
var job;
var tech;
var mysql = require("mysql");
const fs = require("fs");
const util = require("util");
var readFile = util.promisify(fs.readFile);
var writeFile = util.promisify(fs.writeFile);
const { deflateRaw } = require("zlib");
var b = () => {};

let rule = new schedule.RecurrenceRule();

rule.minute = [0, new schedule.Range(0, 59)];
rule.hour = [0, new schedule.Range(9, 22)];
//rule.hour=9-12
rule.tz = "Asia/Kuala_Lumpur";
var sy;

schedule.scheduleJob("*/2 20-23,0-20 * * *", async function () {
  //Database SQL Connection
  var con = mysql.createConnection({
    host: "db.racuntech.com",
    user: "rtjobdb",
    port: 3306,
    password: "rtdb258",
    database: "jobdatabase"
  });

  //Read Incremental value
  async function readIncrement() {
    return readFile("increment.txt");
  }

  //First Step
  async function step1() {
    var tasks;
    //Call all open job in Task Database
    await axios({
      method: "get",
      url: url + `?filter[status]=Open`,
    }).then(async function (responsess) {
      tasks = responsess.data.taskDb;
    });
    //Loop for every open job in Task Database
    if (tasks.length !== 0) {
      for (task of tasks) {
        if (task.taskType != "Walkin" && task.taskType != "Pickup" && task.taskType != "Goods Receipt" && task.taskType != "Troubleshoot On-site") {
          console.log(task.taskType, task.branch);
          //Filter Job
          if (task.taskType != "Installation" && task.taskType != "Upgrade") {
            var result;
            console.log(task);
            var holdtask = task;
            //call Step 2
            await step2(task.taskType, task.branch, task).then(async (data) => {
              readIncrement = data;
              console.log(readIncrement);
              console.log("akhir");

              result = data;
            });
            if (!result) {
              console.log("tak ada");
              incrementGlobal++;

              if (incrementGlobal) {
                await writeFile(
                  "increment.txt",
                  String(incrementGlobal),
                  function (err, isi) {
                    if (err) throw err;
                    console.log("Saved!");
                  }
                );
              }
            } else {
              console.log("masuk tak?");
              //Assign Job into Integromat
              async function sendData() {
                await axios
                  .post(
                    "https://hook.integromat.com/5f8zppj2u5xwxkos09cq9xa764i728w7",
                    {
                      technician: result,
                      SO: holdtask,
                    }
                  )
                  .then(async function (response) {});
              }
              await sendData();
              incrementGlobal++;

              if (incrementGlobal) {
                await writeFile(
                  "increment.txt",
                  String(incrementGlobal),
                  function (err, isi) {
                    if (err) throw err;
                    console.log("Saved!");
                  }
                );
              }
            }
          } else if (
            task.taskType == "Installation" ||
            task.taskType == "Upgrade"
          ) {
            var taskProduct;
            await axios({
              method: "get",
              url:
                url +
                `?filter[status]=Completed&filter[taskType]=Product%20Preparation&filter[soNumber]=${task.soNumber}`,
            }).then(async function (responsess) {
              taskProduct = JSON.stringify(responsess.data.taskDb);
            });
            if (taskProduct != "[]") {
              var resultTech;
              console.log(task);
              var holdtaskTech = task;
              //call Step 2
              await step2(task.taskType, task.branch, task).then(
                async (data) => {
                  readIncrement = data;
                  console.log(readIncrement);
                  console.log("akhir");

                  resultTech = data;
                }
              );
              if (!resultTech) {
                console.log("tak ada");
                incrementGlobal++;

                if (incrementGlobal) {
                  await writeFile(
                    "increment.txt",
                    String(incrementGlobal),
                    function (err, isi) {
                      if (err) throw err;
                      console.log("Saved!");
                    }
                  );
                }
              } else {
                console.log("masuk tak?");
                //Assign Job into Integromat
                async function sendData() {
                  await axios
                    .post(
                      "https://hook.integromat.com/5f8zppj2u5xwxkos09cq9xa764i728w7",
                      {
                        technician: resultTech,
                        SO: holdtaskTech,
                      }
                    )
                    .then(async function (response) {});
                }
                await sendData();
                incrementGlobal++;

                if (incrementGlobal) {
                  await writeFile(
                    "increment.txt",
                    String(incrementGlobal),
                    function (err, isi) {
                      if (err) throw err;
                      console.log("Saved!");
                    }
                  );
                }
              }
            } else {
              incrementGlobal++;

              if (incrementGlobal) {
                await writeFile(
                  "increment.txt",
                  String(incrementGlobal),
                  function (err, isi) {
                    if (err) throw err;
                    console.log("Saved!");
                  }
                );
              }
            }
          }
        }
      }
    } else {
      console.log("No Open Task");
    }
  }

  //Step 2
  async function step2(task, branch, taskDetail) {
    var stringIncrement;
    var max;
    var pic;
    //Call Increment
    try {
      var increment;
      await readFile("increment.txt").then((data) => {
        incrementGlobal = data;
        increment = data;
      });
      console.log("Increment: " + increment);
    } catch (err) {
      increment = 0;
      incrementGlobal = 0;
    }
    //Call maximum
    await cariMaximum(branch).then((data) => {
      max = data[0].AYAM;
    });
    console.log("maximum: " + max);
    modulus = (increment % max) + 1;
    if (!modulus) {
      modulus = 1;
    }

    //Call PIC
    await PIC(task, branch, modulus).then((data) => {
      pic = data[0];
    });
    return pic;
  }

  //Cari maximum
  async function cariMaximum(branch) {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT
      MAX(modulus) AS AYAM
    FROM
      autoAssign
    WHERE
      branch = "${branch}"`,
        (err, result) => {
          console.log(result);
          return resolve(result);
        }
      );
    });
  }

  //Cari PIC
  async function PIC(task, branch, modulus) {
    console.log(task);
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT
            *
        FROM
            autoAssign
        WHERE
            branch='${branch}' AND modulus=${modulus} AND skill LIKE '%${task}%'`,
        (err, result) => {
          if (result) {
            return resolve(result);
          }
          if (err) {
            throw err;
          }
        }
      );
    });
  }

  step1();
});
