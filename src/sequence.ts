/// <reference path="type.ts" />

interface Object extends fun.Sequence<[string, any] | any> { } // Makes everything a sequence by default
interface Number extends fun.Sequence<number> { }
interface Boolean extends fun.Sequence<boolean> { }
interface String extends fun.Sequence<string> { }
interface Array<T> extends fun.Sequence<T> { }
interface Function extends fun.Sequence<any> { }
interface Date extends fun.Sequence<Date> { }
interface RegExp extends fun.Sequence<RegExp> { }
interface Error extends fun.Sequence<Error> { }

namespace fun {
    Object.prototype.__sequencer__ = objectSequencer;
    Number.prototype.__sequencer__ = valueSequencer;
    Boolean.prototype.__sequencer__ = valueSequencer;
    String.prototype.__sequencer__ = valuesSequencer;
    Array.prototype.__sequencer__ = valuesSequencer;
    Function.prototype.__sequencer__ = callSequencer;
    Date.prototype.__sequencer__ = referenceSequencer;
    RegExp.prototype.__sequencer__ = referenceSequencer;
    Error.prototype.__sequencer__ = referenceSequencer;

    export interface SequenceItem<T> {
        // TODO: Remove when switching to ES6 target
        done: boolean;
        value?: T;
    }

    export interface Sequencer<T> {
        // TODO: Remove when switching to ES6 target
        next(): SequenceItem<T>;
    }

    export interface Sequence<T> {
        // TODO: Remove when switching to ES6 target
        __sequencer__(): Sequencer<T>;
    }

    export function isSequence(value: any): value is Sequence<any> {
        // TODO: Refactor when switching to ES6 target
        return value != undefined && value.__sequencer__ != undefined && value.__sequencer__.constructor === Function;
    }

    export function sequence<T>(target: Sequence<T>): Sequencer<T> {
        if (isSequence(target)) return target.__sequencer__() as Sequencer<T>;
        else return emptySequencer<T>();
    }

    function emptySequencer<T>(): Sequencer<T> {
        // TODO: turn returned iterators into immutable objects, that's the advantage over the native Iterator protocol.
        return {
            next: () => ({ done: true, value: undefined })
        };
    }

    function valueSequencer<T>(): Sequencer<T> {
        return {
            next: () => ({
                done: true,
                value: this.valueOf()
            })
        }
    }

    function referenceSequencer<T>(): Sequencer<T> {
        return {
            next: () => ({
                done: true,
                value: this
            })
        }
    }

    function valuesSequencer<T>(): Sequencer<T> {
        let index = 0;
        return {
            next: () => ({
                done: index >= this.length,
                value: index < this.length ? this[index++] : undefined
            })
        };
    }

    function propertiesSequencer<T>(): Sequencer<[string, T]> {
        const keys = Object.keys(this);
        let index = 0;
        return {
            next: () => ({
                done: index >= keys.length,
                value: index < keys.length ? [keys[index], this[keys[index++]]] : undefined
            })
        };
    }

    function callSequencer<T>(): Sequencer<T> {
        return {
            next: () => ({
                done: true,
                value: this()
            })
        }
    }

    function objectSequencer<T>(): Sequencer<[string, T] | T> {
        return this.constructor === Object ? propertiesSequencer.call(this) : referenceSequencer.call(this);
    }
}