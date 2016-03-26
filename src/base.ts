namespace fun {
    /**
     * Returns the value passed in as is.
     */
    export function identity<T>(value: T): T {
        return value;
    }
}