const axios = require("axios");

// loopback or old
const backend = 'loopback'

if (backend ==='loopback'){
  exports.getAll = entity => {
    console.log("requested all " + entity);
    return axios.get(`/${entity}`);
  };
}else if (backend === 'old'){
  exports.encodeQueryData = data => {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  };
  
  exports.getAll = entity => {
    console.log("requested all " + entity);
    return axios.get(`/${entity}/all/`);
  };
  
  exports.postOne = (entity, body) => {
    return axios.post(`/${entity}`, body);
  };
  
  exports.deleteOne = (entity, id) => {
    return axios.delete(`/${entity}/` + id);
  };
  
  exports.postOneRecipe = recipe => {
    return axios.post("/recipes", recipe);
  };
  
  exports.editOneRecipe = (recipe) => {
    console.log("(requests)asked to change:")
    console.log(recipe)
    return axios.put("/recipes", recipe);
  };
}


