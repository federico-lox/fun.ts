/// <reference path="../typings/node.d.ts" />
/// <reference path="fixtures.ts" />

namespace test {
    // Just move along if source-map-support is not available
    try {
        require('source-map-support/register');
    } catch (e) { }

    const startTime = Date.now();

    process.on('exit', (code: number) => {
        if (code != 0) {
            process.stdout.write("\t\x1b[31mFAILED\x1b[0m\n");
        } else {
            process.stdout.write(`\tCompleted in ${Date.now() - startTime} ms\n`);
        }
    });

    export const assert: {
        fail<T>(actual?: T, expected?: T, message?: string, operator?: string): void;
        ok<T>(value: T, message?: string): void;
        equal<T>(actual: T, expected: T, message?: string): void;
        notEqual<T>(actual: T, expected: T, message?: string): void;
        deepEqual<T>(actual: T, expected: T, message?: string): void;
        notDeepEqual<T>(acutal: T, expected: T, message?: string): void;
        strictEqual<T>(actual: T, expected: T, message?: string): void;
        notStrictEqual<T>(actual: T, expected: T, message?: string): void;
        deepStrictEqual<T>(actual: T, expected: T, message?: string): void;
        notDeepStrictEqual<T>(actual: T, expected: T, message?: string): void;
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
        ifError<T>(value: T): void;
    } = require('assert');
}