/// <reference path="test.ts" />
/// <reference path="../src/collection.ts" />

namespace test.collection {
    import f = fun;

    namespace count {
        // Check void values
        assert.strictEqual(f.count(undefined), undefined);
        assert.strictEqual(f.count(null), undefined);

        // Check native types
        assert.strictEqual(f.count([]), 0);
        assert.strictEqual(f.count([1]), 1);
        assert.strictEqual(f.count(''), 0);
        assert.strictEqual(f.count('a'), 1);

        // Check dictionary
        assert.strictEqual(f.count(f.dictionary()), 0);
        assert.strictEqual(f.count(f.dictionary(['a', 1], ['b', 2])), 2);
        assert.strictEqual(f.count(f.immutableDictionary()), 0);
        assert.strictEqual(f.count(f.immutableDictionary(['a', 1], ['b', 2])), 2);

        // Check list
        assert.strictEqual(f.count(f.list()), 0);
        assert.strictEqual(f.count(f.list(1, 2)), 2);
        assert.strictEqual(f.count(f.immutableList()), 0);
        assert.strictEqual(f.count(f.immutableList(1, 2)), 2);

        // Check custom implementation
        assert.strictEqual(f.count(new fixtures.Countable()), Number.POSITIVE_INFINITY);
        assert.strictEqual(f.count(new fixtures.Collection()), Number.POSITIVE_INFINITY);
    }

    namespace getAt {
        // Check void index and structure
        assert.strictEqual(f.getAt(null, undefined), undefined);
        assert.strictEqual(f.getAt(undefined, null), undefined);


        // Check valid index on void structure
        assert.strictEqual(f.getAt(0, undefined), undefined);
        assert.strictEqual(f.getAt(0, null), undefined);
        assert.strictEqual(f.getAt('a', undefined), undefined);
        assert.strictEqual(f.getAt('a', null), undefined);

        // Check void index on non-void structure
        const
            emptyList = f.list<number>(),
            list = f.list(1, 2),
            emptyDict = f.dictionary<number>(),
            dict = f.dictionary(['a', 1], ['b', 2]);

        assert.strictEqual(f.getAt(undefined, emptyList), undefined);
        assert.strictEqual(f.getAt(undefined, list), undefined);
        assert.strictEqual(f.getAt(null, emptyList), undefined);
        assert.strictEqual(f.getAt(null, list), undefined);

        assert.strictEqual(f.getAt(undefined, emptyDict), undefined);
        assert.strictEqual(f.getAt(undefined, dict), undefined);
        assert.strictEqual(f.getAt(null, emptyDict), undefined);
        assert.strictEqual(f.getAt(null, dict), undefined);

        assert.strictEqual(f.getAt(-1, emptyList), undefined);
        assert.strictEqual(f.getAt(-1, list), undefined);
        assert.strictEqual(f.getAt(0.1, emptyList), undefined);
        assert.strictEqual(f.getAt(0.1, list), undefined);

        assert.strictEqual(f.getAt('', emptyDict), undefined);
        assert.strictEqual(f.getAt('', dict), undefined);

        // Check non-void index on non-void structure
        assert.strictEqual(f.getAt(0, emptyList), undefined);
        assert.strictEqual(f.getAt(0, list), 1);
        assert.strictEqual(f.getAt('a', emptyDict), undefined);
        assert.strictEqual(f.getAt('a', dict), 1);

        // Check custom implementation
        assert.strictEqual(f.getAt(0, new fixtures.Collection()), 1000);
        assert.strictEqual(f.getAt(0.1, new fixtures.Collection()), 1000);
        assert.strictEqual(f.getAt(-1, new fixtures.Collection()), 1000);
    }

    namespace getFrom {
        // Check void index and structure
        assert.deepStrictEqual(f.getFrom(null, undefined), undefined);
        assert.deepStrictEqual(f.getFrom(undefined), undefined);
        assert.deepStrictEqual(f.getFrom(undefined, null), undefined);
        assert.deepStrictEqual(f.getFrom(null), undefined);
        assert.deepStrictEqual(f.getFrom(null, undefined, null), undefined);


        // Check valid index on void structure
        assert.deepStrictEqual(f.getFrom(undefined, 0), undefined);
        assert.deepStrictEqual(f.getFrom(null, 0), undefined);
        assert.deepStrictEqual(f.getFrom(null, 0, 1), undefined);
        assert.deepStrictEqual(f.getFrom(undefined, 'a'), undefined);
        assert.deepStrictEqual(f.getFrom(null, 'a'), undefined);
        assert.deepStrictEqual(f.getFrom(null, 'a', 'b'), undefined);

        // Check void index on non-void structure
        const
            emptyList = f.list<number>(),
            list = f.list(1, 2),
            emptyDict = f.dictionary<number>(),
            dict = f.dictionary(['a', 1], ['b', 2]);

        assert.deepStrictEqual(f.getFrom(emptyList, undefined), [undefined]);
        assert.deepStrictEqual(f.getFrom(list, undefined), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyList, null), [undefined]);
        assert.deepStrictEqual(f.getFrom(list, null), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyList), undefined);
        assert.deepStrictEqual(f.getFrom(list), undefined);

        assert.deepStrictEqual(f.getFrom(emptyDict, undefined), [undefined]);
        assert.deepStrictEqual(f.getFrom(dict, undefined), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyDict, null), [undefined]);
        assert.deepStrictEqual(f.getFrom(dict, null), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyDict), undefined);
        assert.deepStrictEqual(f.getFrom(dict), undefined);

        assert.deepStrictEqual(f.getFrom(emptyList, -1, 0.1), [undefined, undefined]);
        assert.deepStrictEqual(f.getFrom(list, -1, 0.1), [undefined, undefined]);

        assert.deepStrictEqual(f.getFrom(emptyDict, ''), [undefined]);
        assert.deepStrictEqual(f.getFrom(dict, ''), [undefined]);

        // Check non-void index on non-void structure
        assert.deepStrictEqual(f.getFrom(emptyList, 0), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyList, 0, 1), [undefined, undefined]);
        assert.deepStrictEqual(f.getFrom(list, 0), [1]);
        assert.deepStrictEqual(f.getFrom(list, 0, 1, 2), [1, 2, undefined]);
        assert.deepStrictEqual(f.getFrom(emptyDict, 'a'), [undefined]);
        assert.deepStrictEqual(f.getFrom(emptyDict, 'a', 'b'), [undefined, undefined]);
        assert.deepStrictEqual(f.getFrom(dict, 'a'), [1]);
        assert.deepStrictEqual(f.getFrom(dict, 'a', 'b', 'c'), [1, 2, undefined]);

        // Check custom implementation
        assert.deepStrictEqual(f.getFrom(new fixtures.Collection(), 0, 1, 2), [1000, 1000, 1000]);
        assert.deepStrictEqual(f.getFrom(new fixtures.Collection(), 0.1, -1), [1000, 1000]);
    }

    namespace putAt {
        // Check void index, value and structure
        assert.strictEqual(f.putAt(undefined, undefined, undefined), undefined);
        assert.strictEqual(f.putAt(undefined, undefined, null), undefined);
        assert.strictEqual(f.putAt(undefined, null, null), undefined);
        assert.strictEqual(f.putAt(null, null, null), undefined);
        assert.strictEqual(f.putAt(null, null, undefined), undefined);
        assert.strictEqual(f.putAt(null, undefined, undefined), undefined);

        // Check void index and structure
        assert.strictEqual(f.putAt(null, 1, undefined), undefined);
        assert.strictEqual(f.putAt(undefined, 1, null), undefined);
        assert.strictEqual(f.putAt(null, 'a', undefined), undefined);
        assert.strictEqual(f.putAt(undefined, 'a', null), undefined);

        // Check valid index and void value on void structure
        assert.strictEqual(f.putAt(0, undefined, undefined), undefined);
        assert.strictEqual(f.putAt(0, null, undefined), undefined);
        assert.strictEqual(f.putAt(0, undefined, null), undefined);
        assert.strictEqual(f.putAt(0, null, null), undefined);

        assert.strictEqual(f.putAt('a', undefined, undefined), undefined);
        assert.strictEqual(f.putAt('a', null, undefined), undefined);
        assert.strictEqual(f.putAt('a', undefined, null), undefined);
        assert.strictEqual(f.putAt('a', null, null), undefined);

        // Check valid index and value on void structure
        assert.strictEqual(f.putAt(0, 1, undefined), undefined);
        assert.strictEqual(f.putAt(0, 1, null), undefined);

        assert.strictEqual(f.putAt('a', 1, undefined), undefined);
        assert.strictEqual(f.putAt('a', 1, null), undefined);

        // Check void index with non-void value and structure
        const
            emptyList = f.list<number>(),
            list = f.list(1, 2),
            emptyDict = f.dictionary<number>(),
            dict = f.dictionary(['a', 1], ['b', 2]);

        assert.deepStrictEqual(f.putAt(undefined, 1, emptyList) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putAt(undefined, 1, list) as f.List<number>, f.list(1, 2));
        assert.deepStrictEqual(f.putAt(null, 1, emptyList) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putAt(null, 1, list) as f.List<number>, f.list(1, 2));

        assert.deepStrictEqual(f.putAt(undefined, 1, emptyDict) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putAt(undefined, 1, dict) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));
        assert.deepStrictEqual(f.putAt(null, 1, emptyDict) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putAt(null, 1, dict) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));

        assert.deepStrictEqual(f.putAt(-1, 1, emptyList) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putAt(-1, 1, list) as f.List<number>, f.list(1, 2));
        assert.deepStrictEqual(f.putAt(0.1, 1, emptyList) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putAt(0.1, 1, list) as f.List<number>, f.list(1, 2));

        assert.deepStrictEqual(f.putAt('', 1, emptyDict) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putAt('', 1, dict) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));

        // Check non-void index with non-void value and structure
        assert.deepStrictEqual(f.putAt(0, 1, emptyList), f.list(1));
        assert.deepStrictEqual(f.putAt(0, 3, list), f.list(3, 2));
        assert.deepStrictEqual(f.putAt(2, 1, list), f.list(3, 2, 1));
        assert.deepStrictEqual(f.putAt('a', 1, emptyDict), f.dictionary(['a', 1]));
        assert.deepStrictEqual(f.putAt('a', 3, dict), f.dictionary(['a', 3], ['b', 2]));
        assert.deepStrictEqual(f.putAt('c', 1, dict), f.dictionary(['a', 3], ['b', 2], ['c', 1]));
    }

    namespace putInto {
        // Check void index, value and structure
        assert.strictEqual(f.putInto(undefined, undefined), undefined);
        assert.strictEqual(f.putInto(undefined, null), undefined);
        assert.strictEqual(f.putInto(null, undefined), undefined);
        assert.strictEqual(f.putInto(null, null), undefined);
        assert.strictEqual(f.putInto(undefined), undefined);
        assert.strictEqual(f.putInto(null), undefined);
        assert.strictEqual(f.putInto(undefined, [undefined, undefined]), undefined);
        assert.strictEqual(f.putInto(null, [null, null]), undefined);

        // Check void index and structure

        assert.strictEqual(f.putInto(null, [null, 1]), undefined);
        assert.strictEqual(f.putInto(null, [null, 'a']), undefined);
        assert.strictEqual(f.putInto(undefined, [undefined, 1]), undefined);
        assert.strictEqual(f.putInto(undefined, [undefined, 'a']), undefined);

        // Check valid index and void value on void structure
        assert.strictEqual(f.putInto(undefined, [0, undefined]), undefined);
        assert.strictEqual(f.putInto(null, [0, null]), undefined);
        assert.strictEqual(f.putInto(undefined, ['a', undefined]), undefined);
        assert.strictEqual(f.putInto(null, ['a', null]), undefined);

        // Check valid index and value on void structure
        assert.strictEqual(f.putInto(undefined, [0, 1]), undefined);
        assert.strictEqual(f.putInto(null, [0, 1]), undefined);
        assert.strictEqual(f.putInto(undefined, ['a', 1]), undefined);
        assert.strictEqual(f.putInto(null, ['a', 1]), undefined);

        // Check void index with non-void value and structure
        const
            emptyList = f.list<number>(),
            list = f.list(1, 2),
            emptyDict = f.dictionary<number>(),
            dict = f.dictionary(['a', 1], ['b', 2]);

        assert.deepStrictEqual(f.putInto(emptyList, [undefined, 1]) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putInto(list, [undefined, 1]) as f.List<number>, f.list(1, 2));
        assert.deepStrictEqual(f.putInto(emptyList, [null, 1]) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putInto(list, [null, 1]) as f.List<number>, f.list(1, 2));

        assert.deepStrictEqual(f.putInto(emptyDict, [undefined, 1]) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putInto(dict, [undefined, 1]) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));
        assert.deepStrictEqual(f.putInto(emptyDict, [null, 1]) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putInto(dict, [null, 1]) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));

        assert.deepStrictEqual(f.putInto(emptyList, [-1, 1]) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putInto(list, [-1, 1]) as f.List<number>, f.list(1, 2));
        assert.deepStrictEqual(f.putInto(emptyList, [0.1, 1]) as f.List<number>, f.list());
        assert.deepStrictEqual(f.putInto(list, [0.1, 1]) as f.List<number>, f.list(1, 2));

        assert.deepStrictEqual(f.putInto(emptyDict, ['', 1]) as f.Dictionary<number>, f.dictionary());
        assert.deepStrictEqual(f.putInto(dict, ['', 1]) as f.Dictionary<number>, f.dictionary(['a', 1], ['b', 2]));

        // Check non-void index with non-void value and structure
        assert.deepStrictEqual(f.putInto(emptyList, [0, 1]), f.list(1));
        assert.deepStrictEqual(f.putInto(list, [0, 3], [2, 1]), f.list(3, 2, 1));
        assert.deepStrictEqual(f.putInto(emptyDict, ['a', 1]), f.dictionary(['a', 1]));
        assert.deepStrictEqual(f.putInto(dict, ['a', 3], ['c', 1]), f.dictionary(['a', 3], ['b', 2], ['c', 1]));

        //Check non-void index with void value and non-void structure
        assert.deepStrictEqual(f.putInto(emptyList, [1, undefined]), f.list(1, undefined));
        assert.deepStrictEqual(f.putInto(emptyList, [0, null]), f.list<number>(null, undefined));
        assert.deepStrictEqual(f.putInto(emptyDict, ['b', undefined]), f.dictionary(['a', 1], ['b', undefined]));
        assert.deepStrictEqual(f.putInto(emptyDict, ['a', null]), f.dictionary<number>(['a', null], ['b', undefined]));
    }
}