import Notiflix from 'notiflix';

const axios = require('axios').default;




  async function getUser() {
    try {
      const response = await axios.get('https://pixabay.com/api', {
        params: {
          key: '30183064-85bc7a0e48281dabc89ef1428',
          q : 'cat',
          image_type : 'photo',
          orientation : 'horizontal',
          safesearch : true, 
          per_page: 40,
        }
      })
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  getUser()
