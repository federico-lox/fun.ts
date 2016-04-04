namespace test.fixtures {
    import f = fun;

    export class SimpleObject extends Object{
        public a = 1;
        public b = 2;

        foo(): void {
            void (0);
        }

        get name(): string {
            return "foo";
        }
    }

    export class SequenceObject implements f.Sequence<any> {
        public values = ['abc', 123];

        foo(): void {
            void (0);
        }

        get name(): string {
            return "bar";
        }

        __sequencer__(): any {
            let index = 0;
            return {
                next: () => ({
                    done: index >= this.values.length,
                    value: index < this.values.length ? this.values[index++] : undefined
                })
            };
        }
    }

    export function rootObject(): Object {
        return Object.create(null, { a: { value: 1 } });
    }
}