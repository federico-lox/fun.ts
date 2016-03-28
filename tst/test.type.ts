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
}