namespace fun {
    /**
     * Returns the value passed in as is.
     */
    export function identity<T>(value: T): T {
        return value;
    }

    /**
     * Returns a function which return value is constant
     */
    export function constant<T>(value: T): (...params: any[]) => T {
        return (...params: any[]) => value;
    }
}
