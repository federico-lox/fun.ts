/// <reference path="test.ts" />
/// <reference path="../src/list.ts" />

namespace test.list {
    import f = fun;

    namespace mutableList {
        namespace empty {
            const list = f.list<number>();

            // Check length
            assert.strictEqual(list.length, 0);

            // Check values at index
            assert.strictEqual(list.getAt(0), undefined);
            assert.strictEqual(list.getAt(-1), undefined);
            assert.strictEqual(list.getAt(0.1), undefined);
            assert.strictEqual(list.getAt(undefined), undefined);
            assert.strictEqual(list.getAt(null), undefined);

            // Check value mutation at index
            assert.strictEqual(list.putAt(0, 3), list);
            assert.strictEqual(list.getAt(0), 3);
            assert.deepStrictEqual(list, f.list(3));

            // Check mutation with void index
            assert.strictEqual(list.putAt(undefined, 1), list);
            assert.strictEqual(list.putAt(null, 1), list);
            assert.strictEqual(list.putAt(-1, 1), list);
            assert.deepStrictEqual(list, f.list(3));

            // Check mutation with void values
            assert.strictEqual(list.putAt(0, undefined), list);
            assert.deepStrictEqual(list, f.list(undefined));
            assert.strictEqual(list.putAt(1, null), list);
            assert.deepStrictEqual(list, f.list(undefined, null));
        }

        namespace nonEmpty {
            var list = f.list(1, 2);

            // Check length
            assert.strictEqual(list.length, 2);

            //Check values at index
            assert.strictEqual(list.getAt(0), 1);
            assert.strictEqual(list.getAt(1), 2);
            assert.strictEqual(list.getAt(2), undefined);
            assert.strictEqual(list.getAt(-1), undefined);
            assert.strictEqual(list.getAt(0.1), undefined);
            assert.strictEqual(list.getAt(undefined), undefined);
            assert.strictEqual(list.getAt(null), undefined);

            // Check value mutation at index
            assert.strictEqual(list.putAt(0, 3), list);
            assert.strictEqual(list.getAt(0), 3);
            assert.deepStrictEqual(list, f.list(3, 2));
            assert.strictEqual(list.putAt(2, 1), list);
            assert.strictEqual(list.getAt(2), 1);
            assert.deepStrictEqual(list, f.list(3, 2, 1));

            // Check mutation with void index
            assert.strictEqual(list.putAt(undefined, 1), list);
            assert.strictEqual(list.putAt(null, 1), list);
            assert.strictEqual(list.putAt(-1, 1), list);
            assert.deepStrictEqual(list, f.list(3, 2, 1));

            // Check mutation with void values
            assert.strictEqual(list.putAt(0, undefined), list);
            assert.deepStrictEqual(list, f.list(undefined, 2, 1));
            assert.strictEqual(list.putAt(1, null), list);
            assert.deepStrictEqual(list, f.list(undefined, null, 1));
        }
    }

    namespace immutableList {
        namespace empty {
            const list = f.immutableList<number>();

            // Check length
            assert.strictEqual(list.length, 0);

            // Check values at index
            assert.strictEqual(list.getAt(0), undefined);
            assert.strictEqual(list.getAt(-1), undefined);
            assert.strictEqual(list.getAt(0.1), undefined);
            assert.strictEqual(list.getAt(undefined), undefined);
            assert.strictEqual(list.getAt(null), undefined);

            // Check value mutation at index
            const list2 = list.putAt(0, 3);

            assert.notStrictEqual(list2, list);
            assert.notDeepStrictEqual(list2, list);

            assert.strictEqual(list.getAt(0), undefined);
            assert.strictEqual(list2.getAt(0), 3);

            assert.deepStrictEqual(list, f.immutableList());
            assert.deepStrictEqual(list2, f.immutableList(3));

            // Check mutation with void index
            assert.strictEqual(list.putAt(undefined, 1), list);
            assert.strictEqual(list.putAt(null, 1), list);
            assert.strictEqual(list.putAt(-1, 1), list);
            assert.deepStrictEqual(list, f.immutableList());

            // Check mutation with void values
            const
                list3 = list2.putAt(0, undefined),
                list4 = list3.putAt(1, null);

            assert.notStrictEqual(list3, list2);
            assert.notDeepStrictEqual(list3, list2);
            assert.notStrictEqual(list4, list3);
            assert.notDeepStrictEqual(list4, list3);

            assert.strictEqual(list2.getAt(0), 3);
            assert.strictEqual(list3.getAt(0), undefined);
            assert.strictEqual(list4.getAt(0), undefined);

            assert.strictEqual(list2.getAt(1), undefined);
            assert.strictEqual(list3.getAt(1), undefined);
            assert.strictEqual(list4.getAt(1), null);

            assert.deepStrictEqual(list2, f.immutableList(3));
            assert.deepStrictEqual(list3, f.immutableList(undefined));
            assert.deepStrictEqual(list4, f.immutableList(undefined, null));
        }

        namespace nonEmpty {
            const list = f.immutableList<number>(1, 2);

            // Check length
            assert.strictEqual(list.length, 2);

            // Check values at index
            assert.strictEqual(list.getAt(0), 1);
            assert.strictEqual(list.getAt(1), 2);
            assert.strictEqual(list.getAt(2), undefined);
            assert.strictEqual(list.getAt(-1), undefined);
            assert.strictEqual(list.getAt(0.1), undefined);
            assert.strictEqual(list.getAt(undefined), undefined);
            assert.strictEqual(list.getAt(null), undefined);

            // Check value mutation at index
            const
                list2 = list.putAt(0, 3),
                list3 = list2.putAt(2, 1);

            assert.notStrictEqual(list2, list);
            assert.notDeepStrictEqual(list2, list);
            assert.notStrictEqual(list3, list2);
            assert.notDeepStrictEqual(list3, list2);

            assert.strictEqual(list.getAt(0), 1);
            assert.strictEqual(list2.getAt(0), 3);
            assert.strictEqual(list3.getAt(0), 3);
            assert.strictEqual(list.getAt(1), 2);
            assert.strictEqual(list2.getAt(1), 2);
            assert.strictEqual(list3.getAt(1), 2);
            assert.strictEqual(list.getAt(2), undefined);
            assert.strictEqual(list2.getAt(2), undefined);
            assert.strictEqual(list3.getAt(2), 1);

            assert.deepStrictEqual(list, f.immutableList(1, 2));
            assert.deepStrictEqual(list2, f.immutableList(3, 2));
            assert.deepStrictEqual(list3, f.immutableList(3, 2 , 1));

            // Check mutation with void index
            assert.strictEqual(list.putAt(undefined, 1), list);
            assert.strictEqual(list.putAt(null, 1), list);
            assert.strictEqual(list.putAt(-1, 1), list);
            assert.deepStrictEqual(list, f.immutableList(1, 2));

            // Check mutation with void values
            const
                list4 = list3.putAt(0, undefined),
                list5 = list4.putAt(1, null);

            assert.notStrictEqual(list4, list3);
            assert.notDeepStrictEqual(list4, list3);
            assert.notStrictEqual(list5, list4);
            assert.notDeepStrictEqual(list5, list4);

            assert.strictEqual(list3.getAt(0), 3);
            assert.strictEqual(list4.getAt(0), undefined);
            assert.strictEqual(list5.getAt(0), undefined);

            assert.strictEqual(list3.getAt(1), 2);
            assert.strictEqual(list4.getAt(1), 2);
            assert.strictEqual(list5.getAt(1), null);

            assert.strictEqual(list3.getAt(2), 1);
            assert.strictEqual(list4.getAt(2), 1);
            assert.strictEqual(list5.getAt(2), 1);

            assert.deepStrictEqual(list3, f.immutableList(3, 2, 1));
            assert.deepStrictEqual(list4, f.immutableList(undefined, 2, 1));
            assert.deepStrictEqual(list5, f.immutableList(undefined, null, 1));
        }
    }

    namespace isList {
        // Check void values
        assert.strictEqual(f.isList(undefined), false);
        assert.strictEqual(f.isList(null), false);

        // Check native types
        assert.strictEqual(f.isList(true), false);
        assert.strictEqual(f.isList(1), false);
        assert.strictEqual(f.isList([]), false);
        assert.strictEqual(f.isList(''), false);
        assert.strictEqual(f.isList({}), false);
        assert.strictEqual(f.isList(() => void (0)), false);

        // Check native objects
        assert.strictEqual(f.isList(new Date()), false);
        assert.strictEqual(f.isList(new RegExp('.*')), false);
        assert.strictEqual(f.isList(new Error()), false);

        // Check dictionary and list
        assert.strictEqual(f.isList(f.dictionary()), false);
        assert.strictEqual(f.isList(f.immutableDictionary()), false);
        assert.strictEqual(f.isList(f.list()), true);
        assert.strictEqual(f.isList(f.immutableList()), true);

        // Check custom implementation
        assert.strictEqual(f.isList(new fixtures.SimpleObject()), false);
        assert.strictEqual(f.isList(fixtures.rootObject()), false);
        assert.strictEqual(f.isList(new fixtures.Countable()), false);
        assert.strictEqual(f.isList(new fixtures.Collection()), false);
    }
}