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

        assert.strictEqual(false, f.isString([]));
        assert.strictEqual(false, f.isString([1]));

        assert.strictEqual(false, f.isString({}));
        assert.strictEqual(false, f.isString({ a: 1 }));

        assert.strictEqual(false, f.isString(() => { }));
    }
}