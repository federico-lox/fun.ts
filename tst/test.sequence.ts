/// <reference path="test.ts" />
/// <reference path="../src/sequence.ts" />

namespace test.iterator {
    import f = fun;

    namespace isSequence {
        assert.strictEqual(f.isSequence(1), true);
        assert.strictEqual(f.isSequence(0), true);
        assert.strictEqual(f.isSequence(-1), true);

        assert.strictEqual(f.isSequence(true), true);
        assert.strictEqual(f.isSequence(false), true);

        assert.strictEqual(f.isSequence('abc'), true);
        assert.strictEqual(f.isSequence(''), true);

        assert.strictEqual(f.isSequence([1, 2, 3]), true);
        assert.strictEqual(f.isSequence([]), true);

        assert.strictEqual(f.isSequence({ a: 1, b: 2, c: 3 }), true);
        assert.strictEqual(f.isSequence({}), true);

        assert.strictEqual(f.isSequence(() => 1), true);
        assert.strictEqual(f.isSequence(() => { }), true);

        assert.strictEqual(f.isSequence(new Date()), true);
        assert.strictEqual(f.isSequence(new RegExp('.*')), true);
        assert.strictEqual(f.isSequence(new Error('test')), true);

        assert.strictEqual(f.isSequence(fixtures.rootObject()), false);
        assert.strictEqual(f.isSequence(new fixtures.SimpleObject()), true);
        assert.strictEqual(f.isSequence(new fixtures.SequenceObject()), true);
    }

    namespace sequence {
        namespace number {
            const seqNum = f.sequence(1);
            assert.deepStrictEqual(seqNum.next(), { done: true, value: 1 });
        }

        namespace boolean {
            const seqNum = f.sequence(true);
            assert.deepStrictEqual(seqNum.next(), { done: true, value: true });
        }

        namespace string {
            let index = 0;

            const
                str = "abc",
                iterStr = f.sequence(str);

            for (let i = iterStr.next(); i.done == false; i = iterStr.next(), index++) {
                assert.strictEqual(i.value, str[index]);
            }

            assert.strictEqual(index, str.length);
        }

        namespace array {
            let index = 0;

            const
                arr = [1, 2, 3],
                iterArr = f.sequence(arr);

            for (let i = iterArr.next(); i.done == false; i = iterArr.next(), index++) {
                assert.strictEqual(i.value, arr[index]);
            }

            assert.strictEqual(index, arr.length);
        }

        namespace object {
            let index = 0;

            const
                obj = { a: 1, b: 2, c: 3 },
                keys = Object.keys(obj),
                iterObj = f.sequence<[string, number]>(obj);

            for (let i = iterObj.next(); i.done == false; i = iterObj.next(), index++) {
                assert.deepEqual(i.value, [keys[index], obj[keys[index]]]);
            }

            assert.strictEqual(index, keys.length);
        }

        namespace function_ {
            const
                f1 = () => 1,
                seqFunc1 = f.sequence<number>(f1),
                res1 = f1();

            assert.deepStrictEqual(seqFunc1.next(), { done: true, value: res1 });
        }

        namespace date {
            const
                date = new Date('Mar 25 1990'),
                seqDate = f.sequence(date);
            assert.deepStrictEqual(seqDate.next(), { done: true, value: date });
        }

        namespace regexp {
            const
                rx = new RegExp('.*'),
                seqRx = f.sequence(rx);
            assert.deepStrictEqual(seqRx.next(), { done: true, value: rx });
        }

        namespace error {
            const
                err = new Error('test'),
                seqErr = f.sequence(err);
            assert.deepStrictEqual(seqErr.next(), { done: true, value: err });
        }

        namespace class_ {
            const
                ref = new fixtures.SimpleObject(),
                seqRef = f.sequence<fixtures.SimpleObject>(ref);
            assert.deepStrictEqual(seqRef.next(), { done: true, value: ref });
        }

        namespace sequenceObject {
            let index = 0;

            const
                seq = new fixtures.SequenceObject(),
                arr = seq.values,
                seqObj = f.sequence<any>(seq);

            for (let i = seqObj.next(); i.done == false; i = seqObj.next(), index++) {
                assert.strictEqual(i.value, arr[index]);
            }

            assert.strictEqual(index, arr.length);
        }
    }
}