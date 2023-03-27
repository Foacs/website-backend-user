import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import {mocked} from 'jest-mock';
import {describe, expect, test} from '@jest/globals';
import {handler} from '../../src/get/index';

test('Simple call', () => {
  AWSMock.setSDKInstance(AWS);
  AWSMock.mock('');

  handler();

  expect(handler(mocked(APIGatewayEvent, true))).toBe(200);
});
