// TODO: Refactor when switching to ES6 target
// Everything is iterable! Yay!
interface Object extends fun.Iterable<[string, any]> { }

// TODO: Remove when switching to ES6 target
interface Array<T> extends fun.Iterable<T> { }

// TODO: Remove when switching to ES6 target
interface String extends fun.Iterable<string> { }

namespace fun {
    //TODO: Refactor when switching to ES6 target
    Object.prototype.__iterator__ = isNativeIterable(Object.prototype) ? nativeIterator : stringIndexIterator;

    // TODO: Remove when switching to ES6 target
    Array.prototype.__iterator__ = isNativeIterable(Array.prototype) ? nativeIterator : integerIndexIterator;

    // TODO: Remove when switching to ES6 target
    String.prototype.__iterator__ = isNativeIterable(String.prototype) ? nativeIterator : integerIndexIterator;

    // TODO: Remove when switching to ES6 target
    export interface IteratorResult<T> {
        done: boolean;
        value?: T;
    }

    // TODO: Remove when switching to ES6 target
    export interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }

    // TODO: Remove when switching to ES6 target
    export interface Iterable<T> {
        __iterator__(): Iterator<T>;
    }

    // TODO: Refactor when switching to ES6 target
    export function isIterable<T>(value: any): value is Iterable<T> {
        return value != undefined && value.__iterator__ != undefined && value.__iterator__.constructor === Function;
    }

    // TODO: Refactor when switching to ES6 target
    export function iterator<T>(target: Iterable<T>): Iterator<T> {
        // Calling isIterable as the Iterable interface is empty,
        // see the Iterable interface definition for more context.
        return isIterable(target) ? target.__iterator__() : emptyIterator<T>();
    }

    // TODO: Remove when switching to ES6 target
    function isNativeIterable(value: any): boolean {
        // TypeScript 1.8.x fails compilation silently when using Symbol.iterator for ES3/5 targets.
        return Symbol != undefined
            && Symbol['iterator'] != undefined
            && value[Symbol['iterator']] != undefined
            && value[Symbol['iterator']].constructor === Function;
    }

    // TODO: Remove when switching to ES6 target
    function nativeIterator<T>(): Iterator<T> {
        // TypeScript 1.8.x fails compilation silently when using Symbol.iterator for ES3/5 targets.
        return this[Symbol['iterator']]();
    }

    function emptyIterator<T>(): Iterator<T> {
        return {
            next: () => ({ done: true, value: undefined })
        };
    }

    function integerIndexIterator<T>(): Iterator<T> {
        let index = 0;
        return {
            next: () => ({
                done: index >= this.length,
                value: index < this.length ? this[index++] : undefined
            })
        };
    }

    function stringIndexIterator<T>(): Iterator<[string, T]> {
        const keys = Object.keys(this);
        let index = 0;
        return {
            next: () => ({
                done: index >= keys.length,
                value: index < keys.length ? [keys[index], this[keys[index++]]] : undefined
            })
        };
    }
}