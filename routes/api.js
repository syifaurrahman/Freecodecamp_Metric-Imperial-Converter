'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const isNumInvalid = initNum === 'invalid number';
    const isUnitInvalid = initUnit === 'invalid unit';

    if (isNumInvalid && isUnitInvalid) {
      return res.send('invalid number and unit');
    }
    if (isNumInvalid) {
      return res.send('invalid number');
    }
    if (isUnitInvalid) {
      return res.send('invalid unit');
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
