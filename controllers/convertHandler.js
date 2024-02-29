function ConvertHandler() {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const units = {
    gal: { returnUnit: 'L', spellOut: 'gallons', convertNum: galToL, convertOp: '*' },
    L: { returnUnit: 'gal', spellOut: 'liters', convertNum: galToL, convertOp: '/' },
    lbs: { returnUnit: 'kg', spellOut: 'pounds', convertNum: lbsToKg, convertOp: '*' },
    kg: { returnUnit: 'lbs', spellOut: 'kilograms', convertNum: lbsToKg, convertOp: '/' },
    mi: { returnUnit: 'km', spellOut: 'miles', convertNum: miToKm, convertOp: '*' },
    km: { returnUnit: 'mi', spellOut: 'kilometers', convertNum: miToKm, convertOp: '/' }
  };

  this.roundNumber = function (number) {
    const digits = 5;
    const roundedNum = Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    return roundedNum;
  };

  this.getNum = function (input) {
    let numString = input;
    if (/[a-zA-Z]/.test(input)) {
      const unitStartIndex = input.match(/[a-zA-Z]/).index;
      numString = input.slice(0, unitStartIndex);
    }
    if (numString === '') return 1;
    const numRegex = /^\d*\.?\d*\/?\d*\.?\d*$/;
    if (!numRegex.test(numString)) return 'invalid number';
    if (/\//.test(numString)) {
      const [num1, num2] = numString.split('/');
      return this.roundNumber(Number(num1) / Number(num2));
    }
    return this.roundNumber(numString);
  };

  this.getUnit = function (input) {
    if (!/[a-zA-Z]/.test(input)) {
      return 'invalid unit';
    }
    const unitStartIndex = input.match(/[a-zA-Z]/).index;
    const unitString = input.slice(unitStartIndex).toLowerCase();
    const unitRegex = new RegExp('^(' + Object.keys(units).join('|') + ')$', 'i');
    if (!unitRegex.test(unitString)) return 'invalid unit';
    if (unitString === 'l') return 'L';
    return unitString;
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit].returnUnit;
  };

  this.spellOutUnit = function (unit) {
    return units[unit].spellOut;
  };

  this.convert = function (initNum, initUnit) {
    switch (units[initUnit].convertOp) {
      case '*':
        return this.roundNumber(initNum * units[initUnit].convertNum);
      case '/':
        return this.roundNumber(initNum / units[initUnit].convertNum);
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number') {
      return 'invalid number';
    }
    if (initUnit === 'invalid unit') {
      return 'invalid unit';
    }
    const string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return string;
  };
}

module.exports = ConvertHandler;
