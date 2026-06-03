/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Maybe<T> = T | undefined;
/** A function type which is assignable to any other function type (and any function is assignable to). */
type Callback = (...args: Array<any>) => any;
type defined = {};
interface IterableFunction<T> extends Iterable<T> {
  (): T;
}
