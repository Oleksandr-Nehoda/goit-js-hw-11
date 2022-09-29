
import axios from "axios";

export default class GalleryApi {
constructor(){
    this.valueInput = ' ';
    this.page = 1;
    this.per_page = 40;
}

async catchImg() {
    
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '30183064-85bc7a0e48281dabc89ef1428',
          q : this.valueInput,
          image_type : 'photo',
          orientation : 'horizontal',
          safesearch : true,
          page: this.page, 
          per_page: this.per_page,
        }
      })

      this.page += 1
      return response.data;

    } catch (error) {
      console.error(error);
    }
  }

resetPage(){
    this.page = 1;
}

get valueInp(){
    return  this.valueInput;
}

set valueInp(value){
    this.valueInput = value;
}
}

