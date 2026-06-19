export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}

export function createArray(length, add) {
  if (!add) return Array.from({length: length}, (_, i) => i)
  return Array.from({length: length}, (_, i) => i + add)
}

export function greaterThan(value, compare, replaced) {
  if (typeof compare === 'function') return compare(value) ? value : replaced;
  if (typeof compare === 'number') return value > compare ? value : replaced;
  
  if (typeof compare === 'string') {
    try {
      const condition = new Function('value', `return value ${compare}`);
      return condition(value) ? value : replaced;
    } catch {
      console.warn('Invalid comparison string.');
      return replaced;
    }
  }
  
  return compare ? value : replaced;
}
