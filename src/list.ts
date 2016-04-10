/// <reference path="type.ts" />
/// <reference path="collection.ts" />

namespace fun {
    export abstract class List<T> implements Countable, IndexAccessible<number, T>, IndexMutable<number, T>  {
        get length(): voidable<number> { return undefined; }
        abstract getAt(index: number): voidable<T>;
        abstract putAt(index: number, value: T): List<T>;
    }

    export function immutableList<T>(...values: T[]): List<T> {
        return new ImmutableList<T>(shallowCopy<T>(values));
    }

    export function isList<T>(value: any): value is List<T> {
        return value instanceof List;
    }

    export function list<T>(...values: T[]): List<T> {
        return new MutableList<T>(shallowCopy(values));
    }

    class MutableList<T> extends List<T> {
        protected data: T[];

        constructor(data?: T[]) {
            super();
            if (data == undefined) this.data = [];
            else this.data = data;
        }

        get length(): voidable<number> { return this.data.length; }
        getAt(index: number): voidable<T> { return this.data[index]; }

        putAt(index: number, value: T): List<T> {
            if (this.isValidIndex(index)) this.data[index] = value;
            return this;
        }

        protected isValidIndex(index: number): boolean {
            // only positive integers are allowed
            return index != undefined && index >= 0 && index % 1 === 0;
        }
    }

    class ImmutableList<T> extends MutableList<T> {
        putAt(index: number, value: T): List<T> {
            if (this.isValidIndex(index)) {
                const copy = shallowCopy(this.data);
                copy[index] = value;
                return new ImmutableList<T>(copy as T[]);
            } else {
                return this;
            }
        }
    }

    function shallowCopy<T>(source: T[]): T[] {
        const
            length = source != undefined ? source.length : 0,
            // see http://jsperf.com/new-array-vs-splice-vs-slice/113
            copy: T[] = new Array(length);

        let i = length;
        while (i--) copy[i] = source[i];
        return copy;
    }
}