/// <reference path="../typings/node.d.ts" />

namespace test {
    require('source-map-support/register');

    const startTime = Date.now();

    process.on('exit', (code: number) => {
        if (code != 0) {
            process.stdout.write("\t\x1b[31mFAILED\x1b[0m\n");
        } else {
            process.stdout.write(`\tCompleted in ${Date.now() - startTime} ms\n`);
        }
    });

    export const assert: {
        fail(actual?: any, expected?: any, message?: string, operator?: string): void;
        ok(value: any, message?: string): void;
        equal(actual: any, expected: any, message?: string): void;
        notEqual(actual: any, expected: any, message?: string): void;
        deepEqual(actual: any, expected: any, message?: string): void;
        notDeepEqual(acutal: any, expected: any, message?: string): void;
        strictEqual(actual: any, expected: any, message?: string): void;
        notStrictEqual(actual: any, expected: any, message?: string): void;
        deepStrictEqual(actual: any, expected: any, message?: string): void;
        notDeepStrictEqual(actual: any, expected: any, message?: string): void;
        throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };
        doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        }
        ifError(value: any): void;
    } = require('assert');
}