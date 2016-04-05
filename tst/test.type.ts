/// <reference path="test.ts" />
/// <reference path="../src/type.ts" />

namespace test.type {
    import f = fun;

    namespace isVoid {
        assert.strictEqual(f.isVoid(null), true);
        assert.strictEqual(f.isVoid(undefined), true);

        assert.strictEqual(f.isVoid(1), false);
        assert.strictEqual(f.isVoid(0), false);
        assert.strictEqual(f.isVoid(-1), false);
        assert.strictEqual(f.isVoid(0.1), false);

        assert.strictEqual(f.isVoid(true), false);
        assert.strictEqual(f.isVoid(false), false);

        assert.strictEqual(f.isVoid('abc'), false);
        assert.strictEqual(f.isVoid(''), false);

        assert.strictEqual(f.isVoid([1, 2, 3]), false);
        assert.strictEqual(f.isVoid([]), false);

        assert.strictEqual(f.isVoid({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isVoid({}), false);

        assert.strictEqual(f.isVoid(() => 1), false);
        assert.strictEqual(f.isVoid(() => { }), false);

        assert.strictEqual(f.isVoid(new Date()), false);
        assert.strictEqual(f.isVoid(new RegExp('.*')), false);
        assert.strictEqual(f.isVoid(new Error('test')), false);

        assert.strictEqual(f.isVoid(fixtures.rootObject()), false);
        assert.strictEqual(f.isVoid(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isVoid(new fixtures.SequenceObject()), false);
    }

    namespace isString {
        assert.strictEqual(f.isString(null), false);
        assert.strictEqual(f.isString(undefined), false);

        assert.strictEqual(f.isString(1), false);
        assert.strictEqual(f.isString(0), false);
        assert.strictEqual(f.isString(-1), false);
        assert.strictEqual(f.isString(0.1), false);

        assert.strictEqual(f.isString(true), false);
        assert.strictEqual(f.isString(false), false);

        assert.strictEqual(f.isString('abc'), true);
        assert.strictEqual(f.isString(''), true);

        assert.strictEqual(f.isString([1, 2, 3]), false);
        assert.strictEqual(f.isString([]), false);

        assert.strictEqual(f.isString({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isString({}), false);

        assert.strictEqual(f.isString(() => 1), false);
        assert.strictEqual(f.isString(() => { }), false);

        assert.strictEqual(f.isString(new Date()), false);
        assert.strictEqual(f.isString(new RegExp('.*')), false);
        assert.strictEqual(f.isString(new Error('test')), false);

        assert.strictEqual(f.isString(fixtures.rootObject()), false);
        assert.strictEqual(f.isString(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isString(new fixtures.SequenceObject()), false);
    }

    namespace isNumber {
        assert.strictEqual(f.isNumber(null), false);
        assert.strictEqual(f.isNumber(undefined), false);

        assert.strictEqual(f.isNumber(1), true);
        assert.strictEqual(f.isNumber(0), true);
        assert.strictEqual(f.isNumber(-1), true);
        assert.strictEqual(f.isNumber(0.1), true);

        assert.strictEqual(f.isNumber(true), false);
        assert.strictEqual(f.isNumber(false), false);

        assert.strictEqual(f.isNumber('abc'), false);
        assert.strictEqual(f.isNumber(''), false);

        assert.strictEqual(f.isNumber([1, 2, 3]), false);
        assert.strictEqual(f.isNumber([]), false);

        assert.strictEqual(f.isNumber({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isNumber({}), false);

        assert.strictEqual(f.isNumber(() => 1), false);
        assert.strictEqual(f.isNumber(() => { }), false);

        assert.strictEqual(f.isNumber(new Date()), false);
        assert.strictEqual(f.isNumber(new RegExp('.*')), false);
        assert.strictEqual(f.isNumber(new Error('test')), false);

        assert.strictEqual(f.isNumber(fixtures.rootObject()), false);
        assert.strictEqual(f.isNumber(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isNumber(new fixtures.SequenceObject()), false);
    }

    namespace isBoolean {
        assert.strictEqual(f.isBoolean(null), false);
        assert.strictEqual(f.isBoolean(undefined), false);

        assert.strictEqual(f.isBoolean(1), false);
        assert.strictEqual(f.isBoolean(0), false);
        assert.strictEqual(f.isBoolean(-1), false);
        assert.strictEqual(f.isBoolean(0.1), false);

        assert.strictEqual(f.isBoolean(true), true);
        assert.strictEqual(f.isBoolean(false), true);

        assert.strictEqual(f.isBoolean('abc'), false);
        assert.strictEqual(f.isBoolean(''), false);

        assert.strictEqual(f.isBoolean([1, 2, 3]), false);
        assert.strictEqual(f.isBoolean([]), false);

        assert.strictEqual(f.isBoolean({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isBoolean({}), false);

        assert.strictEqual(f.isBoolean(() => 1), false);
        assert.strictEqual(f.isBoolean(() => { }), false);

        assert.strictEqual(f.isBoolean(new Date()), false);
        assert.strictEqual(f.isBoolean(new RegExp('.*')), false);
        assert.strictEqual(f.isBoolean(new Error('test')), false);

        assert.strictEqual(f.isBoolean(fixtures.rootObject()), false);
        assert.strictEqual(f.isBoolean(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isBoolean(new fixtures.SequenceObject()), false);
    }

    namespace isArray {
        assert.strictEqual(f.isArray(null), false);
        assert.strictEqual(f.isArray(undefined), false);

        assert.strictEqual(f.isArray(1), false);
        assert.strictEqual(f.isArray(0), false);
        assert.strictEqual(f.isArray(-1), false);
        assert.strictEqual(f.isArray(0.1), false);

        assert.strictEqual(f.isArray(true), false);
        assert.strictEqual(f.isArray(false), false);

        assert.strictEqual(f.isArray('abc'), false);
        assert.strictEqual(f.isArray(''), false);

        assert.strictEqual(f.isArray([1, 2, 3]), true);
        assert.strictEqual(f.isArray([]), true);

        assert.strictEqual(f.isArray({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isArray({}), false);

        assert.strictEqual(f.isArray(() => 1), false);
        assert.strictEqual(f.isArray(() => { }), false);

        assert.strictEqual(f.isArray(new Date()), false);
        assert.strictEqual(f.isArray(new RegExp('.*')), false);
        assert.strictEqual(f.isArray(new Error('test')), false);

        assert.strictEqual(f.isArray(fixtures.rootObject()), false);
        assert.strictEqual(f.isArray(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isArray(new fixtures.SequenceObject()), false);
    }

    namespace isFunction {
        assert.strictEqual(f.isFunction(null), false);
        assert.strictEqual(f.isFunction(undefined), false);

        assert.strictEqual(f.isFunction(1), false);
        assert.strictEqual(f.isFunction(0), false);
        assert.strictEqual(f.isFunction(-1), false);
        assert.strictEqual(f.isFunction(0.1), false);

        assert.strictEqual(f.isFunction(true), false);
        assert.strictEqual(f.isFunction(false), false);

        assert.strictEqual(f.isFunction('abc'), false);
        assert.strictEqual(f.isFunction(''), false);

        assert.strictEqual(f.isFunction([1, 2, 3]), false);
        assert.strictEqual(f.isFunction([]), false);

        assert.strictEqual(f.isFunction({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isFunction({}), false);

        assert.strictEqual(f.isFunction(() => 1), true);
        assert.strictEqual(f.isFunction(() => { }), true);

        assert.strictEqual(f.isFunction(new Date()), false);
        assert.strictEqual(f.isFunction(new RegExp('.*')), false);
        assert.strictEqual(f.isFunction(new Error('test')), false);

        assert.strictEqual(f.isFunction(fixtures.rootObject()), false);
        assert.strictEqual(f.isFunction(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isFunction(new fixtures.SequenceObject()), false);
    }

    namespace isObject {
        assert.strictEqual(f.isObject(null), false);
        assert.strictEqual(f.isObject(undefined), false);

        assert.strictEqual(f.isObject(1), false);
        assert.strictEqual(f.isObject(0), false);
        assert.strictEqual(f.isObject(-1), false);
        assert.strictEqual(f.isObject(0.1), false);

        assert.strictEqual(f.isObject(true), false);
        assert.strictEqual(f.isObject(false), false);

        assert.strictEqual(f.isObject('abc'), false);
        assert.strictEqual(f.isObject(''), false);

        assert.strictEqual(f.isObject([1, 2, 3]), false);
        assert.strictEqual(f.isObject([]), false);

        assert.strictEqual(f.isObject({ a: 1, b: 2, c: 3 }), true);
        assert.strictEqual(f.isObject({}), true);

        assert.strictEqual(f.isObject(() => 1), false);
        assert.strictEqual(f.isObject(() => { }), false);

        assert.strictEqual(f.isObject(new Date()), false);
        assert.strictEqual(f.isObject(new RegExp('.*')), false);
        assert.strictEqual(f.isObject(new Error('test')), false);

        assert.strictEqual(f.isObject(fixtures.rootObject()), false);
        assert.strictEqual(f.isObject(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isObject(new fixtures.SequenceObject()), false);
    }

    namespace isDate {
        assert.strictEqual(f.isDate(null), false);
        assert.strictEqual(f.isDate(undefined), false);

        assert.strictEqual(f.isDate(1), false);
        assert.strictEqual(f.isDate(0), false);
        assert.strictEqual(f.isDate(-1), false);
        assert.strictEqual(f.isDate(0.1), false);

        assert.strictEqual(f.isDate(true), false);
        assert.strictEqual(f.isDate(false), false);

        assert.strictEqual(f.isDate('abc'), false);
        assert.strictEqual(f.isDate(''), false);

        assert.strictEqual(f.isDate([1, 2, 3]), false);
        assert.strictEqual(f.isDate([]), false);

        assert.strictEqual(f.isDate({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isDate({}), false);

        assert.strictEqual(f.isDate(() => 1), false);
        assert.strictEqual(f.isDate(() => { }), false);

        assert.strictEqual(f.isDate(new Date()), true);
        assert.strictEqual(f.isDate(new RegExp('.*')), false);
        assert.strictEqual(f.isDate(new Error('test')), false);

        assert.strictEqual(f.isDate(fixtures.rootObject()), false);
        assert.strictEqual(f.isDate(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isDate(new fixtures.SequenceObject()), false);
    }

    namespace isRegExp {
        assert.strictEqual(f.isRegExp(null), false);
        assert.strictEqual(f.isRegExp(undefined), false);

        assert.strictEqual(f.isRegExp(1), false);
        assert.strictEqual(f.isRegExp(0), false);
        assert.strictEqual(f.isRegExp(-1), false);
        assert.strictEqual(f.isRegExp(0.1), false);

        assert.strictEqual(f.isRegExp(true), false);
        assert.strictEqual(f.isRegExp(false), false);

        assert.strictEqual(f.isRegExp('abc'), false);
        assert.strictEqual(f.isRegExp(''), false);

        assert.strictEqual(f.isRegExp([1, 2, 3]), false);
        assert.strictEqual(f.isRegExp([]), false);

        assert.strictEqual(f.isRegExp({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isRegExp({}), false);

        assert.strictEqual(f.isRegExp(() => 1), false);
        assert.strictEqual(f.isRegExp(() => { }), false);

        assert.strictEqual(f.isRegExp(new Date()), false);
        assert.strictEqual(f.isRegExp(new RegExp('.*')), true);
        assert.strictEqual(f.isRegExp(new Error('test')), false);

        assert.strictEqual(f.isRegExp(fixtures.rootObject()), false);
        assert.strictEqual(f.isRegExp(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isRegExp(new fixtures.SequenceObject()), false);
    }

    namespace isError {
        assert.strictEqual(f.isError(null), false);
        assert.strictEqual(f.isError(undefined), false);

        assert.strictEqual(f.isError(1), false);
        assert.strictEqual(f.isError(0), false);
        assert.strictEqual(f.isError(-1), false);
        assert.strictEqual(f.isError(0.1), false);

        assert.strictEqual(f.isError(true), false);
        assert.strictEqual(f.isError(false), false);

        assert.strictEqual(f.isError('abc'), false);
        assert.strictEqual(f.isError(''), false);

        assert.strictEqual(f.isError([1, 2, 3]), false);
        assert.strictEqual(f.isError([]), false);

        assert.strictEqual(f.isError({ a: 1, b: 2, c: 3 }), false);
        assert.strictEqual(f.isError({}), false);

        assert.strictEqual(f.isError(() => 1), false);
        assert.strictEqual(f.isError(() => { }), false);

        assert.strictEqual(f.isError(new Date()), false);
        assert.strictEqual(f.isError(new RegExp('.*')), false);
        assert.strictEqual(f.isError(new Error('test')), true);
        assert.strictEqual(f.isError(new SyntaxError('test')), true);

        assert.strictEqual(f.isError(fixtures.rootObject()), false);
        assert.strictEqual(f.isError(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isError(new fixtures.SequenceObject()), false);
    }
}