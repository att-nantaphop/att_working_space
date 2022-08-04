import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import got from 'got';
import { mockClient } from 'jest-aws-client-mock';
import { lastValueFrom } from 'rxjs';

import { delay, getDataToNoti, getObservable } from '.';

const snsMock = mockClient(SNSClient);

jest.mock('got');

beforeAll(() => {
    jest.useFakeTimers();
});
afterAll(() => {
    jest.useRealTimers();
});

jest.mock('../connection/connection.ts', () => ({
    connection: {
        connect: jest.fn().mockImplementation((callback) => {
            callback(null);
        }),
        query: jest.fn().mockImplementation((callback) => {
            callback(new Error('err'), [{ affectedRows: 1 }]);
        }),
    },
}));

describe.skip('Test function delay', () => {
    test('try to test unit function delay', (done) => {
        delay('success', null, (error, successResponse) => {
            expect(error).toBeNull();
            expect(successResponse).toBe('success');
            done();
        });
        jest.advanceTimersByTime(5 * 1000);
    });
    test('unhappy function delay', (done) => {
        delay(null, 'Fail', (error, successResponse) => {
            expect(successResponse).toBeNull();
            expect(error).toBe('Fail');
            done();
        });
        jest.advanceTimersByTime(5 * 1000);
    });
});

describe.skip('Test function connect DataBase', () => {
    test('try to test unit function connect DataBase', (done) => {
        delay('success', null, (error, successResponse) => {
            expect(error).toBeNull();
            expect(successResponse).toBe('success');
            done();
        });
        jest.advanceTimersByTime(5 * 1000);
    });
    test('try to test unit function connect DataBase', (done) => {
        delay('success', null, (error, successResponse) => {
            expect(error).toBeNull();
            expect(successResponse).toBe('success');
            done();
        });
        jest.advanceTimersByTime(5 * 1000);
    });
});

describe.skip('Test function connect AWS SNS Service', () => {
    beforeEach(() => {
        snsMock.mockReset();
    });
    test('try to test unit function getDataNoti', async () => {
        snsMock.mockResolvedValue({
            MessageId: '123',
        });

        const snsClient = new SNSClient({});

        const command = new PublishCommand({
            Message: 'email',
            PhoneNumber: 'phoneNum',
        });

        const result = await snsClient.send(command);

        expect(snsMock).toHaveBeenCalledTimes(1);
        expect(snsMock).toHaveBeenCalledWith(command);
        expect(result).toEqual({ MessageId: '123' });
    });
    // test('unhappy function getDataNoti', async () => {
    //     const email = 'test@mail.com';
    //     const mockPhoneNum = '0123456789';
    //     expect(snsMock).toHaveBeenCalledTimes(1);
    //     expect(snsMock).toHaveBeenCalledWith(command);
    //     expect(result).toEqual({ MessageId: '123' });
    // });
});
// describe('Test function Get Observe', () => {
//     test('try to test unit function connect DataBase', async () => {
//         const mockEmail = 'test@mail.com';
//         const mockPhoneNum = '0123456789';
//         const result = await lastValueFrom(getObservable(mockEmail, mockPhoneNum));

//         expect(typeof result).toBe('object');
//     });
// });

describe.skip('Integration test', () => {
    test('Integration test Observable', (done) => {
        const email = 'asasf';
        const phoneNum = '124532532';

        getObservable(email, phoneNum).subscribe({
            next: (x) => {
                expect(x).toHaveBeenCalledTimes(2);
                done();
            },
            error: (_err) => {
                console.error('sent fail');
                done();
            },
        });
        jest.runAllTimers();
    });
});
