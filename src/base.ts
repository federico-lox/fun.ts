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

    /**
     * Returns a function which return value is the parameter at the specified position or with the specified property name.
     *
     * @example
     * var f1 = parameter(1);
     * f1('a', 'b', 'c')
     * // returns 'b', i.e. the parameter at position 1
     * @example
     * var f2 = parameter('b');
     * f2({ a: 1, b: 2, c: 3 });
     * // returns 2, i.e. the value for the 'b' property
     */
    export function parameter<T>(property: string): (param: Object, ...rest: any[]) => T
    export function parameter<T>(position: number): (...params: any[]) => T
    export function parameter<T>(p: string | number): ((param: Object, ...rest: any[]) => T) | ((...params: any[]) => T) {
        if (typeof p === 'number') {
            return (...params: any[]) => params[p];
        } else if (typeof p === 'string') {
            return (param: Object, ...rest: any[]) => param != undefined ? param[p] : undefined;
        } else {
            return undefined;
        }
    }
}
