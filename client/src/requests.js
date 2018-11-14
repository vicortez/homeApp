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

exports.deleteSome = (entity, id) => {
  return axios.delete(`/${entity}/` + id);
};

exports.postOneRecipe = body => {
  let body2 = {
    title: "sopa de espinafre",
    ingredients: ["agua", "legumens", "boneca"],
    method: "adicionar tudo na panela e girar e é isso"
  };
  return axios.post("/recipes", body2);
};
