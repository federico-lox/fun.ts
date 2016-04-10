/// <reference path="type.ts" />

namespace fun {
    export interface Countable {
        length: voidable<number>;
    }

    export interface IndexAccessible<I, T> {
        getAt(index: I): voidable<T>;
    }

    export interface IndexMutable<I, T> {
        putAt(index: I, value: T): IndexMutable<I, T>;
    }

    export function count(value: Countable): voidable<number> {
        return (value != undefined) ? value.length : undefined;
    }

    export function getAt<I, T>(index: I, data: IndexAccessible<I, T>): voidable<T> {
        return data != undefined ? data.getAt(index) : undefined;
    }

    export function getFrom<I, T>(data: IndexAccessible<I, T>, ...indexes: I[]): voidable<voidable<T>[]> {
        if (indexes.length > 0 && data != undefined) {
            const
                length = indexes.length,
                // see http://jsperf.com/new-array-vs-splice-vs-slice/113
                values: voidable<T>[] = new Array<T>(length);

            for (let i = 0; i < length; i++) values[i] = data.getAt(indexes[i]);
            return values;
        } else {
            return undefined;
        }
    }

    export function putAt<I, T, C extends IndexMutable<I, T>>(index: I, value: T, data: C): voidable<C> {
        return (data != undefined) ? data.putAt(index, value) as C : undefined;
    }

    export function putInto<I, T, C extends IndexMutable<I, T>>(data: C, ...pairs: [I, T][]): voidable<C> {
        if (pairs.length > 0 && data != undefined) {
            let ref: C;
            for (const [index, value] of pairs) ref = data.putAt(index, value) as C;
            return ref;
        } else {
            return undefined;
        }
    }
}