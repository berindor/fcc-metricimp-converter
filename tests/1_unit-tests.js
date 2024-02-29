const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Read numbers', function () {
    test('read whole number input', function () {
      assert.strictEqual(convertHandler.getNum('5gal'), 5, 'number in "5gal" is 5');
    });
    test('read decimal number input', function () {
      assert.strictEqual(convertHandler.getNum('3.14gal'), 3.14, 'number in "3.14gal" is 3.14');
    });
    test('read fractional input', function () {
      assert.strictEqual(convertHandler.getNum('7/4gal'), 1.75, 'number in "7/4gal" is 1.75');
    });
    test('read fractional input with decimals', function () {
      assert.strictEqual(convertHandler.getNum('1.25/0.25gal'), 5, 'number in "1.25/0.25gal" is 5');
    });
    test('return error on double fraction', function () {
      assert.strictEqual(convertHandler.getNum('2/3/4gal'), 'invalid number', 'number in "2/3/4gal" is "invalid number"');
    });
    test('default 1 when no numerical input', function () {
      assert.strictEqual(convertHandler.getNum('gal'), 1, 'number in "gal" is 1');
    });
  });
  suite('Read units', function () {
    test('read each valid input unit', function () {
      assert.strictEqual(convertHandler.getUnit('5gal'), 'gal', 'unit in "5gal" is "gal"');
      assert.strictEqual(convertHandler.getUnit('5L'), 'L', 'unit in "5L" is "L"');
      assert.strictEqual(convertHandler.getUnit('5l'), 'L', 'unit in "5l" is "L"');
      assert.strictEqual(convertHandler.getUnit('5lbs'), 'lbs', 'unit in "5lbs" is "lbs"');
      assert.strictEqual(convertHandler.getUnit('5Kg'), 'kg', 'unit in "5Kg" is "kg"');
      assert.strictEqual(convertHandler.getUnit('5mi'), 'mi', 'unit in "5mi" is "mi"');
      assert.strictEqual(convertHandler.getUnit('5km'), 'km', 'unit in "5km" is "km"');
    });
    test('return error when invalid input unit', function () {
      assert.strictEqual(convertHandler.getUnit('5lb'), 'invalid unit', 'unit in "5lb" is "invalid unit"');
      assert.strictEqual(convertHandler.getUnit('5s'), 'invalid unit', 'unit in "5s" is "invalid unit"');
      assert.strictEqual(convertHandler.getUnit('5gal3'), 'invalid unit', 'unit in "5gal3" is "invalid unit"');
    });
    test('return correct return unit', function () {
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'returnUnit of "gal" is "L"');
      assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'returnUnit of "L" is "gal"');
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'returnUnit of "lbs" is "kg"');
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'returnUnit of "kg" is "lbs"');
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'returnUnit of "mi" is "km"');
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'returnUnit of "km" is "mi"');
    });
    test('return the correct spelled-out string', function () {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'unit "gal" stands for "gallons"');
      assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', 'unit "L" stands for "liters"');
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'unit "lbs" stands for "pounds"');
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'unit "kg" stands for "kilograms"');
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', 'unit "mi" stands for "miles"');
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'unit "km" stands for "kilometers"');
    });
  });
  suite('Convert correctly', function () {
    const approxDelta = 0.000005;
    test('correctly converts gal to L', function () {
      assert.approximately(convertHandler.convert(5, 'gal'), 5 * 3.78541, approxDelta, '5 gal approx. equals 5 * 3.78541 L');
    });
    test('correctly converts L to gal', function () {
      assert.approximately(convertHandler.convert(5, 'L'), 5 / 3.78541, approxDelta, '5 L approx. equals 5 / 3.78541 gal');
    });
    test('correctly converts lbs to kg', function () {
      assert.approximately(convertHandler.convert(5, 'lbs'), 5 * 0.453592, approxDelta, '5 lbs approx. equals 5 * 0.453592 kg');
    });
    test('correctly converts kg to lbs', function () {
      assert.approximately(convertHandler.convert(5, 'kg'), 5 / 0.453592, approxDelta, '5 kg approx. equals 5 / 0.453592 lbs');
    });
    test('correctly converts mi to km', function () {
      assert.approximately(convertHandler.convert(5, 'mi'), 5 * 1.60934, approxDelta, '5 mi approx. equals 5 * 1.60934 km');
    });
    test('correctly converts km to mi', function () {
      assert.approximately(convertHandler.convert(5, 'km'), 5 / 1.60934, approxDelta, '5 km approx. equals 5 * 1.60934 mi');
    });
  });
});
