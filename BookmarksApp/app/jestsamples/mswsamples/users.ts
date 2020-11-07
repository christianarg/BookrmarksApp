// Del ejemplo tal cual https://jestjs.io/docs/en/mock-functions#mocking-modules
import axios from 'axios';
export type UserData = { name: string };

class Users {
  static all(): Promise<UserData[]> {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;