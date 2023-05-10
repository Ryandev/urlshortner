/* eslint-disable-next-line @typescript-eslint/no-type-alias, @typescript-eslint/ban-types */
type ImmutablePrimitive = Function | boolean | number | string | null | undefined;

/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type Immutable<T> = T extends ImmutablePrimitive
    ? T
    : T extends (infer U)[]
    ? ImmutableArray<U>
    : T extends Map<infer K, infer V>
    ? ImmutableMap<K, V>
    : T extends Set<infer M>
    ? ImmutableSet<M>
    : ImmutableObject<T>;

/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type ImmutableArray<T> = readonly Immutable<T>[];
/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
/* eslint-disable-next-line @typescript-eslint/no-type-alias */
export type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };
