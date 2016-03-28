namespace fun {
    /**
     * Returns true if the value passed in is either null or undefined.
     */
    export function isVoid(value: any): value is void {
        // See https://basarat.gitbooks.io/typescript/content/docs/tips/null.html
        return value == undefined;
    }

    export function isString(value: any): value is string {
        return typeof value === 'string';
    }

    export function isNumber(value: any): value is number {
        return typeof value === 'number';
    }

    export function isBoolean(value: any): value is boolean {
        return typeof value === 'boolean';
    }

    export function isArray<T>(value: any): value is Array<T> {
        return Array.isArray(value);
    }

    export function isFunction(value: any): value is Function {
        // Avoid typeof bugs (e.g. some versions of IE 11, PhantomJS)
        return typeof value === 'function' && typeof value.call === 'function' && typeof value.apply === 'function';
    }
}