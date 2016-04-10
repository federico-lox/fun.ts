/// <reference path="type.ts" />
/// <reference path="collection.ts" />

namespace fun {
    export abstract class Dictionary<T> implements Countable, IndexAccessible<string, T>, IndexMutable<string, T> {
        get length(): voidable<number> { return undefined; }
        abstract getAt(index: string): voidable<T>;
        abstract putAt(index: string, value: T): Dictionary<T>;
    }

    export function dictionary<T>(...properties: [string, T][]): Dictionary<T> {
        return new MutableDictionary<T>(createRootObject(properties));
    }

    export function immutableDictionary<T>(...properties: [string, T][]): Dictionary<T> {
        return new ImmutableDictionary<T>(createRootObject(properties, true));
    }

    export function isDictionary<T>(value: any): value is Dictionary<T> {
        return value instanceof Dictionary;
    }

    interface RootObject<T> {
        constructor: void;
        [key: string]: voidable<T>;
    }

    class MutableDictionary<T> extends Dictionary<T> {
        protected data: RootObject<T>;

        constructor(data?: RootObject<T>) {
            super();
            if (data == undefined) this.data = createRootObject<T>();
            else this.data = data;
        }

        get length(): voidable<number> { return Object.keys(this.data).length; }
        getAt(index: string): voidable<T> { return this.data[index]; }

        putAt(index: string, value: T): Dictionary<T> {
            if (this.isValidIndex(index)) this.data[index] = value;
            return this;
        }

        protected isValidIndex(index: string): boolean {
            return index != undefined && index.length > 0;
        }
    }

    class ImmutableDictionary<T> extends MutableDictionary<T> {
        /*
        // Leaving this around in case the implementation will switch to leverage
        // the prototype chain rathen than shallow copies for enforcing immutability.
        protected listIndexes(): string[] {
            const
                indexes: string[] = [];

            // for ... in iterates across all enumerable properties in the prototype chain
            // this is what you want if you're cloning an object using Object.create(sourceObject);
            for (const prop in this.data) {
                indexes.push(prop);
            }

            return indexes;
        }*/

        putAt(index: string, value: T): Dictionary<T> {
            if (this.isValidIndex(index)) {
                let copy: RootObject<T> = createRootObject<T>();
                // http://jsperf.com/object-clone-performance-test
                for (const prop in this.data) copy[prop] = this.data[prop];
                copy[index] = value;
                return new ImmutableDictionary<T>(copy);
            } else {
                return this;
            }
        }
    }

    function createRootObject<T>(properties?: [string, T][], readonly: boolean = false): RootObject<T> {
        const
            enumerable = true,
            writable = !readonly,
            configurable = false;

        let propMap: PropertyDescriptorMap = {};

        if (properties != undefined) {
            for (const [label, value] of properties) {
                propMap[label] = { value, enumerable, writable, configurable };
            }
        }

        const object = Object.create(null, propMap);
        if (readonly) return Object.freeze(object);
        else return object;
    }
}