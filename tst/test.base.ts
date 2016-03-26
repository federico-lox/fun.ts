/// <reference path="test.ts" />
/// <reference path="../src/base.ts" />

namespace test.base {
    import f = fun;

    namespace identity {
        assert.equal(undefined, f.identity(undefined));
        assert.equal(null, f.identity(null));

        assert.equal(1, f.identity(1));
        assert.notEqual(1, f.identity(0));

        assert.equal(true, f.identity(true));
        assert.notEqual(true, f.identity(false));

        assert.deepEqual({ a: [1, 2] }, f.identity({ a: [1, 2] }));
        assert.notDeepEqual({ a: [1, 2] }, f.identity({ a: [1, 3] }));
    }
}