namespace fun {
    /**
     * Returns true if the value passed in is either null or undefined.
     */
    export function isNil(value: any): value is void {
        // See https://basarat.gitbooks.io/typescript/content/docs/tips/null.html
        return value == undefined;
    }

    export function isString(value: any): value is string {
        return typeof value === 'string';
    }

    export function isNumber(value: any): value is number {
        return typeof value === 'number';
    }    
}