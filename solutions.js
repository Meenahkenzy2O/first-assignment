// Problem 1
function deepEqual(a, b) {
  if (a === b) return true;
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// Problem 2
function diffObjects(oldObj, newObj) {
  const result = { added: {}, removed: {}, changed: {} };
  const oldKeys = new Set(Object.keys(oldObj));
  const newKeys = new Set(Object.keys(newObj));
  for (const key of newKeys) {
    if (!oldKeys.has(key)) result.added[key] = newObj[key];
    else if (oldObj[key] !== newObj[key]) result.changed[key] = { from: oldObj[key], to: newObj[key] };
  }
  for (const key of oldKeys) {
    if (!newKeys.has(key)) result.removed[key] = oldObj[key];
  }
  return result;
}

// Problem 3
function deepFreeze(obj) {
  Object.values(obj).forEach(value => {
    if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) deepFreeze(value);
  });
  return Object.freeze(obj);
}

// Problem 4
function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    get value() { return count; }
  };
}

// Problem 5
function validateSchema(obj, schema) {
  const errors = [];
  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) errors.push(`${key}: missing property`);
    else if (typeof obj[key] !== expectedType) errors.push(`${key}: expected ${expectedType}, got ${typeof obj[key]}`);
  }
  return errors;
}

// Tests
console.log(deepEqual({a:1,b:{c:2}}, {a:1,b:{c:2}}), deepEqual({a:1,b:{c:2}}, {a:1,b:{c:3}}), deepEqual({a:1},{a:1,b:2}));
console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica' },
  { name: 'Setemi', role: 'Senior Engineer', city: 'Kingston' }));
const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false });
config.api.baseUrl = 'https://changed.com';
config.debug = true;
console.log(config.api.baseUrl, config.debug, Object.isFrozen(config.api));
const counter = createCounter();
counter.increment(); counter.increment(); counter.decrement();
console.log(counter.value, counter.count);
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' };
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema));
console.log(validateSchema({ name: 'Ada', age: '21' }, schema));
