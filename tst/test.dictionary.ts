/// <reference path="test.ts" />
/// <reference path="../src/dictionary.ts" />

namespace test.dictionary {
    import f = fun;

    namespace mutableDictionary {
        namespace empty {
            const dict = f.dictionary<number>();

            // Check length
            assert.strictEqual(dict.length, 0);

            // Check values at index
            assert.strictEqual(dict.getAt('a'), undefined);
            assert.strictEqual(dict.getAt(''), undefined);
            assert.strictEqual(dict.getAt(undefined), undefined);
            assert.strictEqual(dict.getAt(null), undefined);

            // Check value mutation at index
            assert.strictEqual(dict.putAt('a', 3), dict);
            assert.strictEqual(dict.getAt('a'), 3);
            assert.deepStrictEqual(dict, f.dictionary(['a', 3]));

            // Check mutation with void index
            assert.strictEqual(dict.putAt(undefined, 1), dict);
            assert.strictEqual(dict.putAt(null, 1), dict);
            assert.strictEqual(dict.putAt('', 1), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', 3]));

            // Check mutation with void values
            assert.strictEqual(dict.putAt('a', undefined), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', undefined]));
            assert.strictEqual(dict.putAt('b', null), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', undefined], ['b', null]));
        }

        namespace nonEmpty {
            var dict = f.dictionary(['a', 1], ['b', 2]);

            // Check length
            assert.strictEqual(dict.length, 2);

            //Check values at index
            assert.strictEqual(dict.getAt('a'), 1);
            assert.strictEqual(dict.getAt('b'), 2);
            assert.strictEqual(dict.getAt('c'), undefined);
            assert.strictEqual(dict.getAt(''), undefined);
            assert.strictEqual(dict.getAt(undefined), undefined);
            assert.strictEqual(dict.getAt(null), undefined);

            // Check value mutation at index
            assert.strictEqual(dict.putAt('a', 3), dict);
            assert.strictEqual(dict.getAt('a'), 3);
            assert.deepStrictEqual(dict, f.dictionary(['a', 3], ['b', 2]));
            assert.strictEqual(dict.putAt('c', 1), dict);
            assert.strictEqual(dict.getAt('c'), 1);
            assert.deepStrictEqual(dict, f.dictionary(['a', 3], ['b', 2], ['c', 1]));

            // Check mutation with void index
            assert.strictEqual(dict.putAt(undefined, 1), dict);
            assert.strictEqual(dict.putAt(null, 1), dict);
            assert.strictEqual(dict.putAt('', 1), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', 3], ['b', 2], ['c', 1]));

            // Check mutation with void values
            assert.strictEqual(dict.putAt('a', undefined), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', undefined], ['b', 2], ['c', 1]));
            assert.strictEqual(dict.putAt('b', null), dict);
            assert.deepStrictEqual(dict, f.dictionary(['a', undefined], ['b', null], ['c', 1]));
        }
    }

    namespace immutableDictionary {
        namespace empty {
            const dict = f.immutableDictionary<number>();

            // Check length
            assert.strictEqual(dict.length, 0);

            // Check values at index
            assert.strictEqual(dict.getAt('a'), undefined);
            assert.strictEqual(dict.getAt(''), undefined);
            assert.strictEqual(dict.getAt(undefined), undefined);
            assert.strictEqual(dict.getAt(null), undefined);

            // Check value mutation at index
            const dict2 = dict.putAt('a', 3);

            assert.notStrictEqual(dict2, dict);
            assert.notDeepStrictEqual(dict2, dict);

            assert.strictEqual(dict.getAt('a'), undefined);
            assert.strictEqual(dict2.getAt('a'), 3);

            assert.deepStrictEqual(dict, f.immutableDictionary());
            assert.deepStrictEqual(dict2, f.immutableDictionary(['a', 3]));

            // Check mutation with void index
            assert.strictEqual(dict.putAt(undefined, 1), dict);
            assert.strictEqual(dict.putAt(null, 1), dict);
            assert.strictEqual(dict.putAt('', 1), dict);
            assert.deepStrictEqual(dict, f.immutableDictionary());

            // Check mutation with void values
            const
                dict3 = dict2.putAt('a', undefined),
                dict4 = dict3.putAt('b', null);

            assert.notStrictEqual(dict3, dict2);
            assert.notDeepStrictEqual(dict3, dict2);
            assert.notStrictEqual(dict4, dict3);
            assert.notDeepStrictEqual(dict4, dict3);

            assert.strictEqual(dict2.getAt('a'), 3);
            assert.strictEqual(dict3.getAt('a'), undefined);
            assert.strictEqual(dict4.getAt('a'), undefined);

            assert.strictEqual(dict2.getAt('b'), undefined);
            assert.strictEqual(dict3.getAt('b'), undefined);
            assert.strictEqual(dict4.getAt('b'), null);

            assert.deepStrictEqual(dict2, f.immutableDictionary(['a', 3]));
            assert.deepStrictEqual(dict3, f.immutableDictionary(['a', undefined]));
            assert.deepStrictEqual(dict4, f.immutableDictionary(['a', undefined], ['b', null]));
        }

        namespace nonEmpty {
            const dict = f.immutableDictionary<number>(['a', 1], ['b', 2]);

            // Check length
            assert.strictEqual(dict.length, 2);

            // Check values at index
            assert.strictEqual(dict.getAt('a'), 1);
            assert.strictEqual(dict.getAt('b'), 2);
            assert.strictEqual(dict.getAt('c'), undefined);
            assert.strictEqual(dict.getAt(''), undefined);
            assert.strictEqual(dict.getAt(undefined), undefined);
            assert.strictEqual(dict.getAt(null), undefined);

            // Check value mutation at index
            const
                dict2 = dict.putAt('a', 3),
                dict3 = dict2.putAt('c', 1);

            assert.notStrictEqual(dict2, dict);
            assert.notDeepStrictEqual(dict2, dict);
            assert.notStrictEqual(dict3, dict2);
            assert.notDeepStrictEqual(dict3, dict2);

            assert.strictEqual(dict.getAt('a'), 1);
            assert.strictEqual(dict2.getAt('a'), 3);
            assert.strictEqual(dict3.getAt('a'), 3);
            assert.strictEqual(dict.getAt('b'), 2);
            assert.strictEqual(dict2.getAt('b'), 2);
            assert.strictEqual(dict3.getAt('b'), 2);
            assert.strictEqual(dict.getAt('c'), undefined);
            assert.strictEqual(dict2.getAt('c'), undefined);
            assert.strictEqual(dict3.getAt('c'), 1);

            assert.deepStrictEqual(dict, f.immutableDictionary(['a', 1], ['b', 2]));
            assert.deepStrictEqual(dict2, f.immutableDictionary(['a', 3], ['b', 2]));
            assert.deepStrictEqual(dict3, f.immutableDictionary(['a', 3], ['b', 2], ['c', 1]));

            // Check mutation with void index
            assert.strictEqual(dict.putAt(undefined, 1), dict);
            assert.strictEqual(dict.putAt(null, 1), dict);
            assert.strictEqual(dict.putAt('', 1), dict);
            assert.deepStrictEqual(dict, f.immutableDictionary(['a', 1], ['b', 2]));

            // Check mutation with void values
            const
                dict4 = dict3.putAt('a', undefined),
                dict5 = dict4.putAt('b', null);

            assert.notStrictEqual(dict4, dict3);
            assert.notDeepStrictEqual(dict4, dict3);
            assert.notStrictEqual(dict5, dict4);
            assert.notDeepStrictEqual(dict5, dict4);

            assert.strictEqual(dict3.getAt('a'), 3);
            assert.strictEqual(dict4.getAt('a'), undefined);
            assert.strictEqual(dict5.getAt('a'), undefined);

            assert.strictEqual(dict3.getAt('b'), 2);
            assert.strictEqual(dict4.getAt('b'), 2);
            assert.strictEqual(dict5.getAt('b'), null);

            assert.strictEqual(dict3.getAt('c'), 1);
            assert.strictEqual(dict4.getAt('c'), 1);
            assert.strictEqual(dict5.getAt('c'), 1);

            assert.deepStrictEqual(dict3, f.immutableDictionary(['a', 3], ['b', 2], ['c', 1]));
            assert.deepStrictEqual(dict4, f.immutableDictionary(['a', undefined], ['b', 2], ['c', 1]));
            assert.deepStrictEqual(dict5, f.immutableDictionary(['a', undefined], ['b', null], ['c', 1]));
        }
    }

    namespace isDictionary {
        // Check void values
        assert.strictEqual(f.isDictionary(undefined), false);
        assert.strictEqual(f.isDictionary(null), false);

        // Check native types
        assert.strictEqual(f.isDictionary(true), false);
        assert.strictEqual(f.isDictionary(1), false);
        assert.strictEqual(f.isDictionary([]), false);
        assert.strictEqual(f.isDictionary(''), false);
        assert.strictEqual(f.isDictionary({}), false);
        assert.strictEqual(f.isDictionary(() => void (0)), false);

        // Check native objects
        assert.strictEqual(f.isDictionary(new Date()), false);
        assert.strictEqual(f.isDictionary(new RegExp('.*')), false);
        assert.strictEqual(f.isDictionary(new Error()), false);

        // Check dictionary and list
        assert.strictEqual(f.isDictionary(f.dictionary()), true);
        assert.strictEqual(f.isDictionary(f.immutableDictionary()), true);
        assert.strictEqual(f.isDictionary(f.list()), false);
        assert.strictEqual(f.isDictionary(f.immutableList()), false);

        // Check custom implementation
        assert.strictEqual(f.isDictionary(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isDictionary(fixtures.rootObject()), false);
        assert.strictEqual(f.isDictionary(new fixtures.Countable()), false);
        assert.strictEqual(f.isDictionary(new fixtures.Collection()), false);
    }
}