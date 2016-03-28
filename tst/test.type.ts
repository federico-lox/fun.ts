/// <reference path="test.ts" />
/// <reference path="../src/type.ts" />

namespace test.type {
    import f = fun;

    namespace isNil {
        assert.strictEqual(true, f.isNil(null));
        assert.strictEqual(true, f.isNil(undefined));

        assert.strictEqual(false, f.isNil(0));
        assert.strictEqual(false, f.isNil(1));

        assert.strictEqual(false, f.isNil(''));
        assert.strictEqual(false, f.isNil('a'));

        assert.strictEqual(false, f.isNil(false));
        assert.strictEqual(false, f.isNil(true));

        assert.strictEqual(false, f.isNil([]));
        assert.strictEqual(false, f.isNil([1]));

        assert.strictEqual(false, f.isNil({}));
        assert.strictEqual(false, f.isNil({ a: 1 }));

        assert.strictEqual(false, f.isNil(() => { }));
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
}