function ConvertHandler() {
  
  this.getNum = function(input) {
    if (typeof input !== 'string') return 'invalid number';

    const firstCharIndex = input.search(/[a-zA-Z]/);
    let numStr;
    if (firstCharIndex === -1) {
      numStr = input.trim();
    } else {
      numStr = input.slice(0, firstCharIndex).trim();
    }

    if (numStr === '') return 1;

    const slashes = (numStr.match(/\//g) || []).length;
    if (slashes > 1) {
      return 'invalid number';
    }

    if (slashes === 1) {
      const parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid number';
      const num = parts[0].trim();
      const den = parts[1].trim();
      if (!num || !den) return 'invalid number';
      if (isNaN(num) || isNaN(den)) return 'invalid number';
      const n = parseFloat(num);
      const d = parseFloat(den);
      if (d === 0) return 'invalid number';
      const result = n / d;
      if (isNaN(result) || !isFinite(result)) return 'invalid number';
      return result;
    }

    if (isNaN(numStr)) return 'invalid number';
    const result = parseFloat(numStr);
    if (isNaN(result) || !isFinite(result)) return 'invalid number';
    return result;
  };
  
  this.getUnit = function(input) {
    if (typeof input !== 'string') return 'invalid unit';

    const firstCharIndex = input.search(/[a-zA-Z]/);
    if (firstCharIndex === -1) return 'invalid unit';

    const unitStr = input.slice(firstCharIndex).trim().toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unitStr)) {
      return 'invalid unit';
    }

    return unitStr === 'l' ? 'L' : unitStr;
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
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
