'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    try {
      const input = req.query.input;
      const initUnit = convertHandler.getUnit(input);
      if (initUnit === 'invalid unit' || initUnit === 'invalid number') {
        res.send({ string: initUnit });
        return;
      }
      const initNum = convertHandler.getNum(input);
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
