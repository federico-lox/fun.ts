/// <reference path="test.ts" />
/// <reference path="../src/data.ts" />

namespace test.data {
    import f = fun;

    namespace getAt {
        assert.deepStrictEqual(f.getAt(1, undefined), { found: false, value: undefined });

        const arr = [1, 2, 3];
        assert.deepStrictEqual(f.getAt(null, arr), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(undefined, arr), { found: false, value: undefined });

        assert.deepStrictEqual(f.getAt(0, arr), { found: true, value: 1 });
        assert.deepStrictEqual(f.getAt(1, arr), { found: true, value: 2 });
        assert.deepStrictEqual(f.getAt(10, arr), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(-1, arr), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(-1, arr, 1), { found: false, value: 1 });

        const str = 'abc';
        assert.deepStrictEqual(f.getAt(0, str), { found: true, value: 'a' });
        assert.deepStrictEqual(f.getAt(1, str), { found: true, value: 'b' });
        assert.deepStrictEqual(f.getAt(10, str), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(-1, str), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(-1, str, 'd'), { found: false, value: 'd' });

        const obj = { a: 'x', b: 'y', c: 'z' };
        assert.deepStrictEqual(f.getAt(0, obj), { found: true, value: obj });
        assert.deepStrictEqual(f.getAt(1, obj), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt('a', obj), { found: false, value: undefined });

        const date = new Date();
        assert.deepStrictEqual(f.getAt(0, date), { found: true, value: date });
        assert.deepStrictEqual(f.getAt(1, date), { found: false, value: undefined });

        const cls = new fixtures.SimpleObject();
        assert.deepStrictEqual(f.getAt(0, cls), { found: true, value: cls });
        assert.deepStrictEqual(f.getAt(1, cls), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt('a', cls), { found: false, value: undefined });

        const seq: f.Sequence<any> = new fixtures.Sequence();
        assert.deepStrictEqual(f.getAt(0, seq), { found: true, value: 'abc' });
        assert.deepStrictEqual(f.getAt(1, seq), { found: true, value: 123 });
        assert.deepStrictEqual(f.getAt(2, seq), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt('a', seq), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt('a', seq, 1), { found: false, value: 1 });

        const idxSeq: f.IndexableSequence<number, string | number> = new fixtures.IndexableSequence();
        assert.deepStrictEqual(f.getAt(0, idxSeq), { found: true, value: 'abc' });
        assert.deepStrictEqual(f.getAt(1, idxSeq), { found: true, value: 123 });
        assert.deepStrictEqual(f.getAt(2, idxSeq), { found: false, value: undefined });
        assert.deepStrictEqual(f.getAt(2, idxSeq, 1), { found: false, value: 1 });
    }

    namespace putAt {
        assert.deepStrictEqual(f.putAt(1, undefined, undefined), { succeeded: false, value: undefined });
        assert.deepStrictEqual(f.putAt(1, null, null), { succeeded: false, value: undefined });

        const arr = [1, 2, 3];
        assert.deepStrictEqual(f.putAt(1, -1, arr), { succeeded: true, value: -1 });
        assert.deepStrictEqual(f.putAt(undefined, -1, arr), { succeeded: false, value: undefined });
        assert.deepStrictEqual(f.putAt(4, -1, arr), { succeeded: true, value: -1 });
        assert.deepStrictEqual(arr, [1, -1, 3, , -1]);

        let cls = new fixtures.IndexMutableSequence();
        assert.deepStrictEqual(f.putAt(0, 'cba', cls), { succeeded: true, value: 'cba' });
        assert.deepStrictEqual(f.putAt(5, { a: 1 }, cls), { succeeded: true, value: { a: 1 } });
        assert.deepStrictEqual(f.putAt(undefined, -1, cls), { succeeded: false, value: undefined });
        assert.deepStrictEqual(f.putAt(2, undefined, cls), { succeeded: true, value: undefined });
        assert.deepStrictEqual(cls.values, ['cba', 123, undefined, , , { a: 1 }]);
    }
}