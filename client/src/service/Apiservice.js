const Axios = require("axios");

exports.getData = async datas => {
  let response;
  const serialize = obj => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };
  let query = serialize(datas);
  console.log(query, "query");
  try {
    response = await Axios.get(`http://localhost:3000/api/get?${query}`);
    console.log("SignUp-Response", response);
    return await response;
  } catch (error) {
    throw error;
  }
};

exports.autoPost = async () => {
  let response;
  try {
    response = await Axios.post(`http://localhost:3000/api/more`,{
      headers: {
        'Content-Type': 'application/json',
    }
    });
    return await response;
  } catch (error) {
    throw error;
  }
};
