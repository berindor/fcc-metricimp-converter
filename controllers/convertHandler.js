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

  const unitEndRegex = new RegExp('(' + Object.keys(units).join('|') + ')$', 'i');
  const remainsNumRegex = new RegExp('^d*.?d*/?d.?d*$');

  numInputToNumber = function (input) {
    const divideRegex = /\//;
    if (divideRegex.test(input)) {
      const [num1, num2] = input.split('/');
      return numInputToNumber(num1) / numInputToNumber(num2);
    }
    const dotRegex = /\./;
    if (dotRegex.test(input)) {
      const [num1, num2] = input.split('.');
      const num2Arr = num2.split('');
      return numInputToNumber(num1) + numInputToNumber(num2) * Math.pow(10, -num2Arr.length);
    }
  };

  this.getNum = function (input) {
    const endsInValidUnit = unitEndRegex.test(input);
    if (!endsInValidUnit) return 'invalid unit';
    const remainingPart = input.replace(unitEndRegex, '');
    if (remainingPart === '') return 1;
    const validNumberInput = remainsNumRegex.test(remainingPart);
    if (!validNumberInput) return 'invalid number';
    return numInputToNumber(remainingPart);
  };

  this.getUnit = function (input) {
    const endsInValidUnit = unitEndRegex.test(input);
    if (!endsInValidUnit) return 'invalid unit';
    const remainingPart = input.replace(unitEndRegex, '');
    const validNumberInput = remainsNumRegex.test(remainingPart);
    if (!validNumberInput) return 'invalid number';
    let unit = input.match(unitEndRegex);
    unit = unit.toLowerCase();
    if (unit === 'l') return 'L';
    return unit;
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
        return initNum * units[initUnit].convertNum;
      case '/':
        return initNum / units[initUnit].convertNum;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number') {
      return 'invalid number';
    }
    if (initUnit === 'invalid unit') {
      return 'invalid unit';
    }
    const string = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return string;
  };
}

module.exports = ConvertHandler;
