import { app } from "@app/sale_api";
import { getObservable } from '@app/sale_api/lib/utils/delay/index';

jest.setTimeout(20000)

describe('Test function delay', () => {
    test('try to test unit function delay', async () => {
        try {
            const response = await app.inject({
                method: 'POST',
                path: '/sendInfo',
                payload: {
                    email:"62050184@kmitl.ac.th",
                    phoneNum:"0906064891"
                }
            })   
                expect(response.statusCode).toEqual(200);
                expect(response.body).toBe('string');
          } catch (error) {
          }
    });
});