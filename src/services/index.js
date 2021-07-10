class ApiService {
  //я решил использовать не родное апи, тут удобно- в джейсон формате и без глюков
  _apiBase = `https://www.cbr-xml-daily.ru/daily_json.js`;

  _getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(
        `!!!Could not fetch ${url}, received ${res.status}`
      );
    }
    return await res.json();
  };

  getListCurrencies = async () => {
    const res = await this._getResource(``);
    return res;
  };
}

export default ApiService;
