namespace fun {
    /**
     * Returns true if the value passed in is either null or undefined.
     */
    export function isNil(value: any): value is void {
        // See https://basarat.gitbooks.io/typescript/content/docs/tips/null.html
        return value == undefined;
    }
}