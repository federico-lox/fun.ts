/// <reference path="type.ts" />
/// <reference path="sequence.ts" />

namespace fun {
    export function getAt<I, T>(index: I, data: Sequence<T> | IndexableSequence<I, T>, otherwise?: T): AccessorResult<T | void> {
        if (!isVoid(index) && !isVoid(data)) {
            if (isIndexableSequence<I, T>(data)) {
                return data.__indexAccessor__(index, otherwise);
            } else if (isNumber(index) && isSequence(data)) {
                const seq = sequence(data);

                for (let c = 0, i = seq.next(); c <= (index as any) && !i.done; c++ , i = seq.next()) {
                    if (c === index as any) return { found: true, value: i.value };
                }
            }
        }

        return { found: false, value: otherwise };
    }

    export function putAt<I, T>(index: I, value: T, data: IndexMutableSequence<I, T>): MutatorResult<T | void> {
        if (!isVoid(index) && !isVoid(data) && isIndexMutableSequence<I, T>(data)) {
            return data.__indexMutator__(index, value);
        } else {
            return { succeeded: false, value: undefined };
        }
    }
}