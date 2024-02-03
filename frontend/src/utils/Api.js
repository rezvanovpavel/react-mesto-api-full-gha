class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    getUserInfo() {
     const url = `${this._baseUrl}/users/me`;
 
     return fetch(url, {
       method: 'GET',
       headers: this._headers,
     })
     .then(res => this._checkResponseStatusServer(res));
    }

    getInitialCards() {
     const url = `${this._baseUrl}/cards`;
 
     return fetch(url, {
       method: 'GET',
       headers: this._headers,
     })
     .then(res => this._checkResponseStatusServer(res));
    }
   
    updateUserInfo({name,about}) {
     const url = `${this._baseUrl}/users/me`;
     return fetch(url, {
       method: 'PATCH',
       headers: this._headers,
       body: JSON.stringify({
        name: name,
        about: about
      })
     })
     .then(res => this._checkResponseStatusServer(res));
    }

    addNewCards({name,link}) {
     const url = `${this._baseUrl}/cards`;
 
     return fetch(url, {
       method: 'POST',
       headers: this._headers,
       body: JSON.stringify({
        name: name,
        link: link
      })
     })
     .then(res => this._checkResponseStatusServer(res));
    }

    deleteCard(cardId) {
     const url = `${this._baseUrl}/cards/${cardId}`;
 
     return fetch(url, {
       method: 'DELETE',
       headers: this._headers
     })
     .then(res => this._checkResponseStatusServer(res));
   }
   
   changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: (isLiked) ? 'PUT' : 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponseStatusServer(res);
    })
   }

   editAvatar(data) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(res => this._checkResponseStatusServer(res));
   }

   _checkResponseStatusServer(res) {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
}

const api = new Api({
  baseUrl: 'https://api.mesto.pavel.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api