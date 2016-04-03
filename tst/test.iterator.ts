/// <reference path="test.ts" />
/// <reference path="../src/iterator.ts" />

namespace test.iterator {
    import f = fun;

    class Foo {
        public a = 1;
        public b = 2;

        test(): void {
            void (0);
        }

        get name(): string {
            return "bar";
        }
    }

    namespace isIterable {
        const
            arr = [1, 2, 3],
            str = "abc",
            obj = { a: 1, b: 2, c: 3 },
            foo = new Foo(),
            dat = new Date(),
            orphanObj = Object.create(null, { a: { value: 1 } });

        assert.strictEqual(f.isIterable(arr), true);
        assert.strictEqual(f.isIterable(str), true);
        assert.strictEqual(f.isIterable(obj), true);
        assert.strictEqual(f.isIterable(foo), true);
        assert.strictEqual(f.isIterable(dat), true);
        assert.strictEqual(f.isIterable(orphanObj), false);
    }

    namespace iterator {
        namespace array {
            let index = 0;

            const
                arr = [1, 2, 3],
                iterArr = f.iterator(arr);

            for (let i = iterArr.next(); i.done == false; i = iterArr.next(), index++) {
                assert.strictEqual(i.value, arr[index]);
            }

            assert.strictEqual(index, arr.length);
        }

        namespace string {
            let index = 0;

            const str = "abc",
                iterStr = f.iterator(str);

            for (let i = iterStr.next(); i.done == false; i = iterStr.next(), index++) {
                assert.strictEqual(i.value, str[index]);
            }

            assert.strictEqual(index, str.length);
        }

        namespace object {
            let index = 0;

            const
                obj = { a: 1, b: 2, c: 3 },
                keys = Object.keys(obj),
                values = [1, 2, 3],
                iterObj = f.iterator(obj);

            for (let i = iterObj.next(); i.done == false; i = iterObj.next(), index++) {
                assert.deepEqual(i.value, [keys[index], values[index]]);
            }

            assert.strictEqual(index, keys.length);
        }

        namespace _class {
            let index = 0;

            const
                foo = new Foo(),
                keys = Object.keys(foo),
                values = [foo.a, foo.b],
                iterObj = f.iterator(foo);

            for (let i = iterObj.next(); i.done == false; i = iterObj.next(), index++) {
                assert.deepEqual(i.value, [keys[index], values[index]]);
            }

            assert.strictEqual(index, keys.length);
        }

        namespace orphanObject {
            const
                obj = Object.create(null, { a: { value: 1 } }),
                iterDat = f.iterator(obj);

            assert.deepStrictEqual(iterDat.next(), { done: true, value: undefined });
        }

        namespace date {
            const
                dat = new Date(),
                iterDat = f.iterator(dat);

            assert.deepStrictEqual(iterDat.next(), { done: true, value: undefined });
        }
    }
}