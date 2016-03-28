/// <reference path="test.ts" />
/// <reference path="../src/type.ts" />

namespace test.type {
    import f = fun;

    namespace isNil {
        assert.strictEqual(true, f.isVoid(null));
        assert.strictEqual(true, f.isVoid(undefined));

        assert.strictEqual(false, f.isVoid(0));
        assert.strictEqual(false, f.isVoid(1));

        assert.strictEqual(false, f.isVoid(''));
        assert.strictEqual(false, f.isVoid('a'));

        assert.strictEqual(false, f.isVoid(false));
        assert.strictEqual(false, f.isVoid(true));

        assert.strictEqual(false, f.isVoid([]));
        assert.strictEqual(false, f.isVoid([1]));

        assert.strictEqual(false, f.isVoid({}));
        assert.strictEqual(false, f.isVoid({ a: 1 }));

        assert.strictEqual(false, f.isVoid(() => { }));
    }

    namespace isString {
        assert.strictEqual(false, f.isString(null));
        assert.strictEqual(false, f.isString(undefined));

        assert.strictEqual(false, f.isString(0));
        assert.strictEqual(false, f.isString(1));

        assert.strictEqual(true, f.isString(''));
        assert.strictEqual(true, f.isString('a'));

        assert.strictEqual(false, f.isString(false));
        assert.strictEqual(false, f.isString(true));

        assert.strictEqual(false, f.isString([]));
        assert.strictEqual(false, f.isString([1]));

        assert.strictEqual(false, f.isString({}));
        assert.strictEqual(false, f.isString({ a: 1 }));

        assert.strictEqual(false, f.isString(() => { }));
    }

    namespace isNumber {
        assert.strictEqual(false, f.isNumber(null));
        assert.strictEqual(false, f.isNumber(undefined));

        assert.strictEqual(true, f.isNumber(0));
        assert.strictEqual(true, f.isNumber(1));
        assert.strictEqual(true, f.isNumber(-11));

        assert.strictEqual(true, f.isNumber(0.0));
        assert.strictEqual(true, f.isNumber(1.0));

        assert.strictEqual(false, f.isNumber(''));
        assert.strictEqual(false, f.isNumber('a'));

        assert.strictEqual(false, f.isNumber(false));
        assert.strictEqual(false, f.isNumber(true));

        assert.strictEqual(false, f.isNumber([]));
        assert.strictEqual(false, f.isNumber([1]));

        assert.strictEqual(false, f.isNumber({}));
        assert.strictEqual(false, f.isNumber({ a: 1 }));

        assert.strictEqual(false, f.isNumber(() => { }));
    }

    namespace isNumber {
        assert.strictEqual(false, f.isBoolean(null));
        assert.strictEqual(false, f.isBoolean(undefined));

        assert.strictEqual(false, f.isBoolean(0));
        assert.strictEqual(false, f.isBoolean(1));

        assert.strictEqual(false, f.isBoolean(''));
        assert.strictEqual(false, f.isBoolean('a'));

        assert.strictEqual(true, f.isBoolean(false));
        assert.strictEqual(true, f.isBoolean(true));

        assert.strictEqual(false, f.isBoolean([]));
        assert.strictEqual(false, f.isBoolean([1]));

        assert.strictEqual(false, f.isBoolean({}));
        assert.strictEqual(false, f.isBoolean({ a: 1 }));

        assert.strictEqual(false, f.isBoolean(() => { }));
    }

    namespace isArray {
        assert.strictEqual(false, f.isArray(null));
        assert.strictEqual(false, f.isArray(undefined));

        assert.strictEqual(false, f.isArray(0));
        assert.strictEqual(false, f.isArray(1));

        assert.strictEqual(false, f.isArray(''));
        assert.strictEqual(false, f.isArray('a'));

        assert.strictEqual(false, f.isArray(false));
        assert.strictEqual(false, f.isArray(true));

        assert.strictEqual(true, f.isArray([]));
        assert.strictEqual(true, f.isArray([1]));
        assert.strictEqual(true, f.isArray(new Array()));

        assert.strictEqual(false, f.isArray({}));
        assert.strictEqual(false, f.isArray({ a: 1 }));

        assert.strictEqual(false, f.isArray(() => { }));
    }

    namespace isFunction {
        assert.strictEqual(false, f.isFunction(null));
        assert.strictEqual(false, f.isFunction(undefined));

        assert.strictEqual(false, f.isFunction(0));
        assert.strictEqual(false, f.isFunction(1));

        assert.strictEqual(false, f.isFunction(''));
        assert.strictEqual(false, f.isFunction('a'));

        assert.strictEqual(false, f.isFunction(false));
        assert.strictEqual(false, f.isFunction(true));

        assert.strictEqual(false, f.isFunction([]));
        assert.strictEqual(false, f.isFunction([1]));

        assert.strictEqual(false, f.isFunction({}));
        assert.strictEqual(false, f.isFunction({ a: 1 }));

        assert.strictEqual(true, f.isFunction(() => { }));
        assert.strictEqual(true, f.isFunction(f.isFunction));
        assert.strictEqual(true, f.isFunction(Function.apply));

        const Dummy = function(value) {
            this.a = value;
        };

        assert.strictEqual(true, f.isFunction(Dummy));
        assert.strictEqual(false, f.isFunction(new Dummy(1)));
    }

    namespace isObject {
        assert.strictEqual(false, f.isObject(null));
        assert.strictEqual(false, f.isObject(undefined));

        assert.strictEqual(false, f.isObject(0));
        assert.strictEqual(false, f.isObject(1));

        assert.strictEqual(false, f.isObject(''));
        assert.strictEqual(false, f.isObject('a'));

        assert.strictEqual(false, f.isObject(false));
        assert.strictEqual(false, f.isObject(true));

        assert.strictEqual(false, f.isObject([]));
        assert.strictEqual(false, f.isObject([1]));

        assert.strictEqual(false, f.isObject(() => { }));
        assert.strictEqual(false, f.isObject(f.isFunction));
        assert.strictEqual(false, f.isObject(Function.apply));

        assert.strictEqual(true, f.isObject({}));
        assert.strictEqual(true, f.isObject({ a: 1 }));
        assert.strictEqual(true, f.isObject(Object.create({})));

        const Dummy = function(value) {
            this.a = value;
        };

        assert.strictEqual(false, f.isObject(new Dummy(1)));
        assert.strictEqual(false, f.isObject(new Date()));
        assert.strictEqual(false, f.isObject(new RegExp('a')));
    }
}