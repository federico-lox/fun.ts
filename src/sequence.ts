/// <reference path="type.ts" />

interface Number extends fun.Sequence<number> { }
interface Boolean extends fun.Sequence<boolean> { }
interface String extends fun.Sequence<string>, fun.IndexableSequence<number, string> { }
interface Array<T> extends fun.Sequence<T>, fun.IndexableSequence<number, T>, fun.IndexMutableSequence<number, T> { }
interface Function extends fun.Sequence<any> { }
interface Date extends fun.Sequence<Date> { }
interface RegExp extends fun.Sequence<RegExp> { }
interface Error extends fun.Sequence<Error> { }
interface Object extends fun.Sequence<any> { }// Makes everything a sequence by default

namespace fun {
    Number.prototype.__sequencer__ = valueSequencer;
    Boolean.prototype.__sequencer__ = valueSequencer;
    String.prototype.__sequencer__ = valuesSequencer;
    String.prototype.__indexAccessor__ = vectorAccessor;
    Array.prototype.__sequencer__ = valuesSequencer;
    Array.prototype.__indexAccessor__ = vectorAccessor;
    Array.prototype.__indexMutator__ = indexMutator;
    Function.prototype.__sequencer__ = callSequencer;
    Date.prototype.__sequencer__ = referenceSequencer;
    RegExp.prototype.__sequencer__ = referenceSequencer;
    Error.prototype.__sequencer__ = referenceSequencer;
    Object.prototype.__sequencer__ = referenceSequencer;

    export interface SequenceEntry<T> {
        // TODO: Remove when switching to ES6 target
        done: boolean;
        value: T;
    }

    export interface Sequencer<T> {
        // TODO: Remove when switching to ES6 target
        next(): SequenceEntry<T>;
    }

    export interface Sequence<T> {
        // TODO: Remove when switching to ES6 target
        __sequencer__(): Sequencer<T>;
    }

    export interface AccessorResult<T> {
        found: boolean;
        value: T;
    }

    export interface IndexableSequence<I, T> {
        __indexAccessor__(index: I, otherwise?: T): AccessorResult<T>;
    }

    export interface MutatorResult<T> {
        succeeded: boolean,
        value: T
    }

    export interface IndexMutableSequence<I, T> {
        __indexMutator__(index: I, value: T): MutatorResult<T>;
    }

    export function isSequence<T>(value: any): value is Sequence<T> {
        // TODO: Refactor when switching to ES6 target
        return value != undefined && value.__sequencer__ != undefined && value.__sequencer__.constructor === Function;
    }

    export function isIndexableSequence<I, T>(value: any): value is IndexableSequence<I, T> {
        return value != undefined && value.__indexAccessor__ != undefined && value.__indexAccessor__.constructor === Function;
    }

    export function isIndexMutableSequence<I, T>(value: any): value is IndexMutableSequence<I, T> {
        return value != undefined && value.__indexMutator__ != undefined && value.__indexMutator__.constructor === Function;
    }

    export function sequence<T>(target: Sequence<T>): Sequencer<T> {
        if (isSequence(target)) return target.__sequencer__() as Sequencer<T>;
        else return emptySequencer<T>();
    }

    export function emptySequencer<T>(): Sequencer<T> {
        // TODO: turn returned iterators into immutable objects, that's the advantage over the native Iterator protocol.
        return {
            next: () => ({ done: true, value: undefined })
        };
    }

    export function valueSequencer<T>(): Sequencer<T> {
        let count = 0;
        return {
            next: () => ({
                done: count === 1 ? true : false,
                value: count++ === 1 ? undefined : this.valueOf()
            })
        }
    }

    export function referenceSequencer<T>(): Sequencer<T> {
        let count = 0;
        return {
            next: () => ({
                done: count === 1 ? true : false,
                value: count++ === 1 ? undefined : this
            })
        }
    }

    export function valuesSequencer<T>(): Sequencer<T> {
        let index = 0;
        return {
            next: () => ({
                done: index >= this.length,
                value: index < this.length ? this[index++] : undefined
            })
        };
    }

    export function propertiesSequencer<T>(): Sequencer<[string, T]> {
        const keys = Object.keys(this);
        let index = 0;
        return {
            next: () => ({
                done: index >= keys.length,
                value: index < keys.length ? [keys[index], this[keys[index++]]] : undefined
            })
        };
    }

    export function callSequencer<T>(): Sequencer<T> {
        let count = 0;
        return {
            next: () => ({
                done: count === 1 ? true : false,
                value: count++ === 1 ? undefined : this()
            })
        }
    }

    export function vectorAccessor<T>(index: number, otherwise?: T): AccessorResult<T> {
        if (index >= 0 && index < this.length) return { found: true, value: this[index] };
        else return { found: false, value: otherwise };
    }

    export function propertyAccessor<T>(key: string, otherwise?: T): AccessorResult<T> {
        if (this.hasOwnProperty(key)) return { found: true, value: this[key] };
        else return { found: false, value: otherwise };
    }

    export function indexMutator<T>(index: string | number, value: T): MutatorResult<T> {
        if (!isVoid(index)) {
            this[index] = value;
            return { succeeded: true, value: value }
        } else {
            return { succeeded: false, value: undefined };
        }
    }
}