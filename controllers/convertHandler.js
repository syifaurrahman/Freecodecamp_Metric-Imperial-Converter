function ConvertHandler() {

  this.getNum = function(input) {
    // Find index where the unit starts (first letter)
    let numStr = input.match(/^[^a-zA-Z]*/)[0];

    // Default to 1 if no number provided
    if (!numStr) return 1;

    // Check for double fraction (e.g. 3/2/3)
    if ((numStr.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    // Handle fraction (e.g. 1/2)
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }

    return parseFloat(numStr);
  };

  this.getUnit = function(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    // Extract unit part (all letters at end of string)
    let unitStr = input.match(/[a-zA-Z]+$/);
    if (!unitStr) return 'invalid unit';

    let unit = unitStr[0].toLowerCase();

    if (!validUnits.includes(unit)) return 'invalid unit';

    // Liters should be uppercase 'L'
    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L':   'gal',
      'mi':  'km',
      'km':  'mi',
      'lbs': 'kg',
      'kg':  'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L':   'liters',
      'mi':  'miles',
      'km':  'kilometers',
      'lbs': 'pounds',
      'kg':  'kilograms'
    };
    return spellMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL   = 3.78541;
    const lbsToKg  = 0.453592;
    const miToKm   = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL;        break;
      case 'L':   result = initNum / galToL;        break;
      case 'mi':  result = initNum * miToKm;        break;
      case 'km':  result = initNum / miToKm;        break;
      case 'lbs': result = initNum * lbsToKg;       break;
      case 'kg':  result = initNum / lbsToKg;       break;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
