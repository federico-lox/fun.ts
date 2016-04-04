/// <reference path="type.ts" />

interface Object extends fun.Sequence<[string, any] | any> { }
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

    // TODO: Remove when switching to ES6 target
    export interface SequenceItem<T> {
        done: boolean;
        value?: T;
    }

    // TODO: Remove when switching to ES6 target
    export interface Sequencer<T> {
        next(): SequenceItem<T>;
    }

    // TODO: Remove when switching to ES6 target
    export interface Sequence<T> {
        __sequencer__(): Sequencer<T>;
    }

    // TODO: Refactor when switching to ES6 target
    export function isSequence(value: any): value is Sequence<any> {
        return value != undefined && value.__sequencer__ != undefined && value.__sequencer__.constructor === Function;
    }

    export function sequence<T>(target: Sequence<T>): Sequencer<T> {
        if (isSequence(target)) return target.__sequencer__() as Sequencer<T>;
        else return emptySequencer<T>();
    }

    function isIterable(value: any): boolean {
        // TypeScript 1.8.x fails compilation silently when using Symbol.iterator for ES3/5 targets.
        return Symbol != undefined
            && Symbol['iterator'] != undefined
            && value[Symbol['iterator']] != undefined
            && value[Symbol['iterator']].constructor === Function;
    }

    // TODO: Remove when switching to ES6 target
    function iterableSequencer<T>(target: any): Sequencer<T> {
        // TypeScript 1.8.x fails compilation silently when using Symbol.iterator for ES3/5 targets.
        return target[Symbol['iterator']]();
    }

    function emptySequencer<T>(): Sequencer<T> {
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
        // TODO: use string indexed interface instead of Object
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