"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTesters = void 0;
const db_1 = require("../db");
const findTesters = (country, device, callback) => {
    const query = `
    create temporary table bugsByTester (bugId int, deviceId int,  country text, testerId int);

    insert into bugsByTester

    select bugs.bugId, devices.deviceID, testers.country, testers.testerId
    from (((bugs
    inner join tester_device on bugs.testerId = tester_device.testerId 
    and  bugs.deviceId = tester_device.deviceId)
    inner join testers on testers.testerId = tester_device.testerId)
    inner join devices on devices.deviceId = tester_device.deviceId)
    where testers.country = ? and devices.description = ?;

    select testerId, count(bugsByTester.testerId) as bugCount
    from bugsByTester
    group by testerId
    order by bugCount desc;
    `;
    db_1.db.query(query, [country, device], (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const testerBugCounts = [];
        rows.forEach((row) => {
            const testerBugCount = {
                testerId: row.testerId,
                bugCount: row.bugCount,
            };
            testerBugCounts.push(testerBugCount);
        });
        callback(null, testerBugCounts);
    });
};
exports.findTesters = findTesters;
