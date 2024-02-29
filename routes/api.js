'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    try {
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        res.send('invalid number and unit');
        return;
      }
      if (initNum === 'invalid number') {
        res.send('invalid number');
        return;
      }
      if (initUnit === 'invalid unit') {
        res.send('invalid unit');
        return;
      }
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
