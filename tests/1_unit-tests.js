const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Read numbers', function () {
    test('read whole number input', function () {
      assert.strictEqual(ConvertHandler.getNum('5gal'), 5, 'number in "5gal" is 5');
    });
    test('read decimal number input', function () {
      assert.strictEqual(ConvertHandler.getNum('3.14gal'), 3.14, 'number in "3.14gal" is 3.14');
    });
    test('read fractional input', function () {
      assert.strictEqual(ConvertHandler.getNum('7/4gal'), 1.75, 'number in "7/4gal" is 1.75');
    });
    test('read fractional input with decimals', function () {
      assert.strictEqual(ConvertHandler.getNum('1.25/0.25gal'), 5, 'number in "1.25/0.25gal" is 5');
    });
    test('return error on double fraction', function () {
      assert.strictEqual(ConvertHandler.getNum('2/3/4gal'), 'invalid number', 'number in "2/3/4gal" is "invalid number"');
    });
    test('default 1 when no numerical input', function () {
      assert.strictEqual(ConvertHandler.getNum('gal'), 1, 'number in "gal" is 1');
    });
  });
  suite('Read units', function () {
    test('read each valid input unit', function () {
      assert.strictEqual(ConvertHandler.getUnit('5gal'), 'gal', 'unit in "5gal" is "gal"');
      assert.strictEqual(ConvertHandler.getUnit('5L'), 'L', 'unit in "5L" is "gal"');
      assert.strictEqual(ConvertHandler.getUnit('5lbs'), 'lbs', 'unit in "5lbs" is "lbs"');
      assert.strictEqual(ConvertHandler.getUnit('5kg'), 'kg', 'unit in "5kg" is "kg"');
      assert.strictEqual(ConvertHandler.getUnit('5mi'), 'mi', 'unit in "5mi" is "mi"');
      assert.strictEqual(ConvertHandler.getUnit('5km'), 'km', 'unit in "5km" is "km"');
    });
    test('return error when invalid input unit', function () {
      assert.strictEqual(ConvertHandler.getUnit('5lb'), 'invalid unit', 'unit in "5lb" is "invalid unit"');
      assert.strictEqual(ConvertHandler.getUnit('5s'), 'invalid unit', 'unit in "5s" is "invalid unit"');
    });
    test('return correct return unit', function () {
      assert.strictEqual(ConvertHandler.getReturnUnit('gal'), 'L', 'returnUnit of "gal" is "L"');
      assert.strictEqual(ConvertHandler.getReturnUnit('L'), 'gal', 'returnUnit of "L" is "gal"');
      assert.strictEqual(ConvertHandler.getReturnUnit('lbs'), 'kg', 'returnUnit of "lbs" is "kg"');
      assert.strictEqual(ConvertHandler.getReturnUnit('kg'), 'lbs', 'returnUnit of "kg" is "lbs"');
      assert.strictEqual(ConvertHandler.getReturnUnit('mi'), 'km', 'returnUnit of "mi" is "km"');
      assert.strictEqual(ConvertHandler.getReturnUnit('km'), 'mi', 'returnUnit of "km" is "mi"');
    });
    test('return the correct spelled-out string', function () {
      assert.strictEqual(ConvertHandler.spellOutUnit('gal'), 'gallons', 'unit "gal" stands for "gallons"');
      assert.strictEqual(ConvertHandler.spellOutUnit('L'), 'liters', 'unit "L" stands for "liters"');
      assert.strictEqual(ConvertHandler.spellOutUnit('mi'), 'miles', 'unit "mi" stands for "miles"');
      assert.strictEqual(ConvertHandler.spellOutUnit('km'), 'kilometers', 'unit "km" stands for "kilometers"');
      assert.strictEqual(ConvertHandler.spellOutUnit('lbs'), 'pounds', 'unit "lbs" stands for "pounds"');
      assert.strictEqual(ConvertHandler.spellOutUnit('kg'), 'kilograms', 'unit "kg" stands for "kilograms"');
    });
  });
  suite('Convert correctly', function () {
    test('correctly converts gal to L', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'gal'), 5 * 3.78541, '5 gal equals 5 * 3.78541 L');
    });
    test('correctly converts L to gal', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'L'), 5 / 3.78541, '5 L equals 5 / 3.78541 gal');
    });
    test('correctly converts lbs to kg', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'lbs'), 5 * 0.453592, '5 lbs equals 5 * 0.453592 kg');
    });
    test('correctly converts kg to lbs', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'kg'), 5 / 0.453592, '5 kg equals 5 / 0.453592 lbs');
    });
    test('correctly converts mi to km', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'mi'), 5 * 1.60934, '5 mi equals 5 * 1.60934 km');
    });
    test('correctly converts km to mi', function () {
      assert.strictEqual(ConvertHandler.convert(5, 'km'), 5 / 1.60934, '5 km equals 5 * 1.60934 mi');
    });
  });
});
