const axios = require("axios");

exports.encodeQueryData = data => {
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

exports.getAll = entity => {
  return axios.get(`/${entity}/all/`);
};

exports.postOne = (entity, body) => {
  return axios.post(`/${entity}`, body);
};

exports.deleteSome = (entity, id) => {
  return axios.delete(`/${entity}/` + id);
};
