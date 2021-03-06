/// <reference path="test.ts" />
/// <reference path="../src/function.ts" />

namespace test.function_ {
    import f = fun;

    namespace arity {
        assert.strictEqual(f.arity(() => void (0)), 0);
        assert.notStrictEqual(f.arity(() => void (0)), 1);
        assert.strictEqual(f.arity(x => void (0)), 1);
        assert.notStrictEqual(f.arity(x => void (0)), 0);
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

    namespace hasArity {
        assert.strictEqual(f.hasArity(0, () => void (0)), true);
        assert.notStrictEqual(f.hasArity(1, () => void (0)), true);
        assert.strictEqual(f.hasArity(1, x => void (0)), true);
        assert.notStrictEqual(f.hasArity(0, x => void (0)), true);
    }

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

    namespace noop {
        assert.strictEqual(undefined, f.noop());
        assert.strictEqual(undefined, f.noop(1));
        assert.strictEqual(undefined, f.noop(1, 2, 3));
    }

    namespace parameter {
        const
            params = [1, "a", { a: 1 }],
            param = { a: 1, b: '2', c: [3] };

        assert.strictEqual(1, f.parameter(0).apply(null, params));
        assert.strictEqual('a', f.parameter(1).apply(null, params));
        assert.deepStrictEqual({ a: 1 }, f.parameter(2).apply(null, params));
        assert.strictEqual(undefined, f.parameter(3).apply(null, params));

        assert.strictEqual(1, f.parameter('a').call(null, param));
        assert.strictEqual('2', f.parameter('b').call(null, param));
        assert.deepStrictEqual([3], f.parameter('c').call(null, param));
        assert.strictEqual(undefined, f.parameter('d').apply(null, params));

        assert.strictEqual(undefined, f.parameter(0).call(null));
        assert.strictEqual(undefined, f.parameter('a').call(null));
    }
}