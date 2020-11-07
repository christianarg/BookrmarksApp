// Del ejemplo tal cual https://jestjs.io/docs/en/mock-functions#mocking-modules
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;