import { db } from "../db";
import { TesterBugCount } from "../types/testerBugCount";
import { RowDataPacket } from "mysql2";

/**
 * Uses the sql connection to send a query to the database.
 * The rows returned are pushed to a list of an object containing a testerId and bug count.
 * @param country
 * @param device
 * @param callback
 */
export const findTesters = (
  country: string,
  device: string,
  callback: Function
) => {
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

  db.query(query, [country, device], (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    const testerBugCounts: TesterBugCount[] = [];
    rows.forEach((row) => {
      const testerBugCount: TesterBugCount = {
        testerId: row.testerId,
        bugCount: row.bugCount,
      };
      testerBugCounts.push(testerBugCount);
    });
    callback(null, testerBugCounts);
  });
};
