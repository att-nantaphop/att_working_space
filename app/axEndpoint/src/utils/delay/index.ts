import { setTimeout } from 'timers';

import { bindNodeCallback } from 'rxjs';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function axEndpointStatus(callback): void {
    delay('Ax Endpoint Complete', null, callback);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getObservable() {
    return bindNodeCallback(axEndpointStatus)();
}
