import Axios from 'axios';

const url = 'https://api.myjson.com/bins/hji89';

class CurrencyService {
  getAllData() {
    return Axios({
      method: 'get',
      url
    });
  }
}

export default new CurrencyService();