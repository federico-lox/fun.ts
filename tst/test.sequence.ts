/// <reference path="test.ts" />
/// <reference path="../src/sequence.ts" />

namespace test.iterator {
    import f = fun;

    namespace isSequence {
        assert.strictEqual(f.isSequence(undefined), false);
        assert.strictEqual(f.isSequence(null), false);

        assert.strictEqual(f.isSequence(1), true);
        assert.strictEqual(f.isSequence(0), true);
        assert.strictEqual(f.isSequence(-1), true);
        assert.strictEqual(f.isSequence(0.1), true);

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
        assert.strictEqual(f.isSequence(new fixtures.Sequence()), true);
    }

    namespace emptySequencer {
        assert.deepStrictEqual(f.emptySequencer().next(), { done: true, value: undefined });
    }

    namespace valueSequencer {
        const sequencer = f.valueSequencer.call(1);
        assert.deepStrictEqual(sequencer.next(), { done: false, value: 1 });
        assert.deepStrictEqual(sequencer.next(), { done: true, value: undefined });
    }

    namespace referenceSequencer {
        const
            date = new Date(),
            sequencer = f.referenceSequencer.call(date);
        assert.deepStrictEqual(sequencer.next(), { done: false, value: date });
        assert.deepStrictEqual(sequencer.next(), { done: true, value: undefined });
    }

    namespace valuesSequencer {
        let index = 0;

        const
            arr = [1, 2, 3],
            sequencer = f.valuesSequencer.call(arr);

        for (let i = sequencer.next(); i.done == false; i = sequencer.next(), index++) {
            assert.strictEqual(i.value, arr[index]);
        }

        assert.strictEqual(index, arr.length);
    }

    namespace propertiesSequencer {
        let index = 0;

        const
            props = { a: 1, b: 2, c: 3 },
            keys = Object.keys(props),
            sequencer: f.Sequencer<[string, number]> = f.propertiesSequencer.call(props);

        for (let i = sequencer.next(); i.done == false; i = sequencer.next(), index++) {
            assert.deepStrictEqual(i.value, [keys[index], props[keys[index]]]);
        }

        assert.strictEqual(index, keys.length);
    }

    namespace callSequencer {
        const
            f1 = () => 1,
            sequencer = f.callSequencer.call(f1);
        assert.deepStrictEqual(sequencer.next(), { done: false, value: 1 });
        assert.deepStrictEqual(sequencer.next(), { done: true, value: undefined });
    }

    namespace sequence {
        namespace number {
            const seqNum = f.sequence(1);
            assert.deepStrictEqual(seqNum.next(), { done: false, value: 1 });
            assert.deepStrictEqual(seqNum.next(), { done: true, value: undefined });
        }

        namespace boolean {
            const seqBool = f.sequence(true);
            assert.deepStrictEqual(seqBool.next(), { done: false, value: true });
            assert.deepStrictEqual(seqBool.next(), { done: true, value: undefined });
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
                seqObj = f.sequence(obj);

            assert.deepStrictEqual(seqObj.next(), { done: false, value: obj });
            assert.deepStrictEqual(seqObj.next(), { done: true, value: undefined });
        }

        namespace function_ {
            const
                f1 = () => 1,
                seqFunc1 = f.sequence<number>(f1),
                res1 = f1();

            assert.deepStrictEqual(seqFunc1.next(), { done: false, value: res1 });
            assert.deepStrictEqual(seqFunc1.next(), { done: true, value: undefined });
        }

        namespace date {
            const
                date = new Date('Mar 25 1990'),
                seqDate = f.sequence(date);

            assert.deepStrictEqual(seqDate.next(), { done: false, value: date });
            assert.deepStrictEqual(seqDate.next(), { done: true, value: undefined });
        }

        namespace regexp {
            const
                rx = new RegExp('.*'),
                seqRx = f.sequence(rx);

            assert.deepStrictEqual(seqRx.next(), { done: false, value: rx });
            assert.deepStrictEqual(seqRx.next(), { done: true, value: undefined });
        }

        namespace error {
            const
                err = new Error('test'),
                seqErr = f.sequence(err);

            assert.deepStrictEqual(seqErr.next(), { done: false, value: err });
            assert.deepStrictEqual(seqErr.next(), { done: true, value: undefined });
        }

        namespace class_ {
            const
                ref = new fixtures.SimpleObject(),
                seqRef = f.sequence<fixtures.SimpleObject>(ref);

            assert.deepStrictEqual(seqRef.next(), { done: false, value: ref });
            assert.deepStrictEqual(seqRef.next(), { done: true, value: undefined });
        }

        namespace sequenceObject {
            let index = 0;

            const
                seq = new fixtures.Sequence(),
                arr = seq.values,
                seqObj = f.sequence<any>(seq);

            for (let i = seqObj.next(); i.done == false; i = seqObj.next(), index++) {
                assert.strictEqual(i.value, arr[index]);
            }

            assert.strictEqual(index, arr.length);
        }
    }

    namespace vectorAccessor {
        assert.deepStrictEqual(f.vectorAccessor.call([1, 2, 3], 1), { found: true, value: 2 });
        assert.deepStrictEqual(f.vectorAccessor.call([1, 2, 3], 3, -1), { found: false, value: -1 });
    }

    namespace propertyAccessor {
        assert.deepStrictEqual(f.propertyAccessor.call({ a: 1 }, 'a'), { found: true, value: 1 });
        assert.deepStrictEqual(f.propertyAccessor.call({ a: 1 }, 'b', -1), { found: false, value: -1 });
    }

    namespace indexMutator {
        const
            obj = { a: 1, b: 2, c: 3 },
            arr = [1, 2, 3];

        assert.deepStrictEqual(f.indexMutator.call(obj, 'a', -1), { succeeded: true, value: -1 });
        assert.deepStrictEqual(f.indexMutator.call(obj, null, -1), { succeeded: false, value: undefined });
        assert.deepStrictEqual(f.indexMutator.call(obj, undefined, -1), { succeeded: false, value: undefined });
        assert.deepStrictEqual(obj, { a: -1, b: 2, c: 3 });

        assert.deepStrictEqual(f.indexMutator.call(arr, 1, -1), { succeeded: true, value: -1 });
        assert.deepStrictEqual(f.indexMutator.call(arr, 4, -1), { succeeded: true, value: -1 });
        assert.deepStrictEqual(f.indexMutator.call(arr, null, -1), { succeeded: false, value: undefined });
        assert.deepStrictEqual(f.indexMutator.call(arr, undefined, -1), { succeeded: false, value: undefined });
        assert.deepStrictEqual(arr, [1, -1, 3, , -1]);
    }
}