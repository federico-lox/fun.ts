namespace test.fixtures {
    import f = fun;

    export class SimpleObject extends Object {
        public a = 1;
        public b = 2;

        foo(): void {
            void (0);
        }

        get name(): string {
            return "foo";
        }
    }

    export class Sequence implements f.Sequence<string | number> {
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

    export class IndexableSequence extends Sequence implements f.IndexableSequence<number, string | number>{
        get __indexAccessor__(): (index: number, otherwise?: string | number) => f.AccessorResult<string | number> {
            return f.vectorAccessor.bind(this.values);
        }
    }

    export class IndexMutableSequence extends IndexableSequence implements f.IndexMutableSequence<number, any> {
        get __indexMutator__(): (index: number, value: any) => f.MutatorResult<any> {
            return f.indexMutator.bind(this.values);
        }
    }

    export function rootObject(): Object {
        return Object.create(null, { a: { value: 1 } });
    }
}