namespace fun {
    /**
     * Returns true if the value passed in is either null or undefined.
     */
    export function isVoid(value: any): value is void {
        // See https://basarat.gitbooks.io/typescript/content/docs/tips/null.html
        return value == undefined;
    }

    export function isString(value: any): value is string {
        // See http://jsperf.com/is-string-tests
        return typeof value === 'string';
    }

    export function isNumber(value: any): value is number {
        return typeof value === 'number';
    }

    export function isBoolean(value: any): value is boolean {
        return typeof value === 'boolean';
    }

    export function isArray<T>(value: any): value is Array<T> {
        // See http://jsperf.com/is-array-tests
        return value != undefined && value.constructor === Array;
    }

    export function isFunction(value: any): value is Function {
        // See http://jsperf.com/is-function-tests
        return value != undefined && value.constructor === Function;
    }

    /**
     * Returns true if value is a plain object (e.g. {a: 1}), false otherwise.
     */
    export function isObject(value: any): value is Object {
        // See http://jsperf.com/is-object-tests
        // See https://basarat.gitbooks.io/typescript/content/docs/tips/null.html
        return value != undefined && value.constructor === Object;
    }
}