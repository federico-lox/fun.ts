/// <reference path="test.ts" />
/// <reference path="../src/base.ts" />

namespace test.base {
    import f = fun;

    namespace identity {
        assert.strictEqual(undefined, f.identity(undefined));
        assert.notStrictEqual(null, f.identity(undefined));
        assert.strictEqual(null, f.identity(null));
        assert.notStrictEqual(undefined, f.identity(null));

        assert.strictEqual(1, f.identity(1));
        assert.notStrictEqual(1, f.identity(0));

        assert.strictEqual(true, f.identity(true));
        assert.notStrictEqual(true, f.identity(false));

        assert.deepStrictEqual({ a: [1, 2] }, f.identity({ a: [1, 2] }));
        assert.notDeepStrictEqual({ a: [1, 2] }, f.identity({ a: [1, 3] }));
    }

    namespace constant {
        const
            retUndef = f.constant(undefined),
            retNull = f.constant(null),
            ret1 = f.constant(1);

        assert.strictEqual(undefined, retUndef());
        assert.strictEqual(null, retNull());

        assert.strictEqual(1, ret1());
        assert.strictEqual(1, ret1(undefined));
        assert.strictEqual(1, ret1(null));
        assert.strictEqual(1, ret1(2));
    }
}