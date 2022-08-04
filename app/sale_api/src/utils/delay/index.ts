import { setTimeout } from 'timers';

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import got from 'got';
import mysql from 'mysql2';
import { bindNodeCallback, zip } from 'rxjs';

import { connection } from '../connection/connection';

// eslint-disable-next-line @typescript-eslint/naming-convention
const axEndpointAPI = 'http://localhost:3000';

function randomDelayInMs(maxDelayInSec?: number): number {
    const minMs = 1;

    maxDelayInSec = maxDelayInSec < minMs ? 2 : maxDelayInSec;

    return (Math.random() * (maxDelayInSec - minMs) + minMs) * 1000;
}

// eslint-disable-next-line @typescript-eslint/default-param-last
function delay(successResponse, error = null, callback): void {
    setTimeout(() => {
        callback(error, successResponse);
    }, randomDelayInMs(5));
}

function dataBase(callback): void {
    connection.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        } else delay('Connected to the MySQL server.', null, callback);
    });
}

function processData(email: string, phoneNum: string, callback): void {
    connection.query(
        `INSERT INTO testdata VALUES (${mysql.escape(email)},${mysql.escape(phoneNum)});`,
    );
    delay('Insert Data Success', null, callback);
}

async function axEndpointStatus(callback): Promise<void> {
    interface IReply {
        response: string;
    }
    const result: IReply = await got.get(`${axEndpointAPI}/test`).json();

    delay('Ax Endpoint Connect Complete' + JSON.stringify(result), null, callback);
}

function getDataToNoti(email: string, phoneNum: string, callback): void {
    const client = new SNSClient({ region: 'REGION' });

    const command = new PublishCommand({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Message: email,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        PhoneNumber: phoneNum,
    });

    client.send(command, (error, data) => {
        if (error) {
            console.log('mai me money pai tor aws service', error);
        } else console.log(data);
    });

    delay('Send Notification Complete!!', null, callback);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getObservable(email, phoneNum) {
    return zip([
        bindNodeCallback(dataBase)(),
        bindNodeCallback(processData)(email, phoneNum),
        bindNodeCallback(getDataToNoti)(email, phoneNum),
        bindNodeCallback(axEndpointStatus)(),
    ]);

    // return of(dataBase, getData, processData, axEndpointStatus).pipe(
    //     mergeMap((x) => {
    //         return zip([
    //             bindNodeCallback(x[0])(),
    //             bindNodeCallback(x[1])(),
    //             bindNodeCallback(x[2])(email, phoneNum),
    //             bindNodeCallback(x[3])(),
    //         ]);
    //     }),
    // );
}

export {
    dataBase,
    getDataToNoti,
    processData,
    axEndpointStatus,
    delay,
    getObservable,
    randomDelayInMs,
};
