// users.test.js
import axios from 'axios';
import Users from './users';
import { mocked } from 'ts-jest/utils';
jest.mock('axios');

const axiosMock = mocked(axios, true);  // typar el mock de axios y de "todo lo de dentro"


test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axiosMock.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});