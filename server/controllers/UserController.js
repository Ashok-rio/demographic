const User = require("../models/User");
const faker = require("faker");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { to, ReE, ReS, isNull, isEmpty } = require("../services/util.service");
const AuthUser = require("../services/auth.service");
const CONFIG = require("../config/config");
const HttpStatus = require("http-status");

module.exports.create = async (req, res) => {
  let err, createData;
  const data = req.body;

  [err, createData] = await to(User.create(data));
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!createData) {
    return ReE(
      res,
      { message: "create user failed" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return ReS(res, { message: "user created successfully" }, HttpStatus.OK);
};

module.exports.getData = async (req, res) => {
  let err, getData;
  const query = req.query || {};
  console.log(query);

  [err, getData] = await to(
    User.aggregate([
      { $match: query },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      { $sort: { state: 1, distric: 1 } },
    ])
  );
  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  if (!getData) {
    return ReE(
      res,
      { message: "couldn't get any data's" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  let result = getData.map(({ district }) => district);
  function getUnique(array) {
    var uniqueArray = [];
    for (var value of array) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    return uniqueArray;
  }
  function sperateRender() {
    let values = [];
    let unique = getUnique(result);
    unique.map((doc) => {
      let filter = getData.filter((docs) => {
        return docs.district === doc;
      });
      if (filter.length > 0) {
        filter.map((data) => {
          values.push(Object.values(data));
        });
      }
    });
    return values;
  }
  let datas = sperateRender();
  let district = [];
  getData.map((x) => {
    if (!district.includes(x.district)) {
      district.push(x.district);
    }
  });

  return ReS(
    res,
    { message: "user data's fetched successfully", data: datas, district: district },
    HttpStatus.OK
  );
};

module.exports.createListOfData = async (req, res) => {

  let err, exixitingUser;

  [err, exixitingUser] = await to(User.findOne());

  if(err){ return ReE(res,err,HttpStatus.INTERNAL_SERVER_ERROR) }

  if(exixitingUser){return ReE(res,{message:'record already here !'},HttpStatus.BAD_REQUEST)}

  let count = req.body.count || 5000
  
  for (let i = 0; i < count; i++) {
    let err, createData;
    let firstName = faker.name.firstName();
    let phone = faker.phone.phoneNumber("+91 ###-###-####");
    let age = faker.random.number({ min: 15, max: 80 });
    let newOne = faker.random.number({ min: 1, max: 100 });
    let gender;
    if (newOne%2 === 0) {
      gender = "Male";
    } else {
      gender = "Female";
    }
    let distric = "Chennai";
    if (i % 2 === 0) {
      distric = "Coimbatore";
    }
    if (i % 3 === 0) {
      distric = "Tirupur";
    }
    if (i % 4 === 0) {
      distric = "Namakkal";
    }
    if (i % 5 === 0) {
      distric = "Selam";
    }
    let area = faker.address.city();
    let state = faker.address.state();
    const data = {
      name: firstName,
      phone: phone,
      age: age,
      gender: gender,
      area: area,
      district: distric,
      state: state,
    };
    [err, createData] = await to(User.create(data));
    if (err) {
      return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  return ReS(res, { message: "user created successfully" }, HttpStatus.OK);
};


