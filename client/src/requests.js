const axios = require("axios");

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

exports.postOneRecipe = body => {
  console.log("body1:")
  console.log(body)
  return axios.post("/recipes", body);
};

