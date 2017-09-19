import { WithEquality } from "./Comparison";
import { Option } from "./Option";
import { Value } from "./Value"
import { ISet } from "./ISet";
import { Vector } from "./Vector";

/**
 * A generic interface for a dictionary, mapping keys to values.
 * @type K the key type
 * @type V the value type
 */
export interface IMap<K,V> extends Value {

    /**
     * Get a Set containing all the keys in the map
     */
    keySet(): ISet<K>;

    /**
     * Get a Set containing all the values in the map
     */
    valueSet(): ISet<V>;

    /**
     * Get the value for the key you give, if the key is present.
     */
    get(k: K & WithEquality): Option<V>;

    /**
     * Add a new entry in the map. If there was entry with the same
     * key, it will be overwritten.
     * @param k the key
     * @param v the value
     * Equality requirements
     */
    put(k: K & WithEquality, v: V & WithEquality): IMap<K,V>;

    /**
     * Add a new entry in the map. If there was entry with the same
     * key, it will be overwritten.
     * @param k the key
     * @param v the value
     * No equality requirements
     */
    putStruct(k: K & WithEquality, v: V): IMap<K,V>;

    /**
     * Add a new entry in the map; in case there was already an
     * entry with the same key, the merge function will be invoked
     * with the old and the new value to produce the value to take
     * into account.
     * @param k the key
     * @param v the value
     * @param merge a function to merge old and new values in case of conflict.
     * Equality requirements
     */
    putWithMerge(k: K & WithEquality, v: V & WithEquality, merge: (v1: V&WithEquality, v2: V&WithEquality) => V): IMap<K,V>;

    /**
     * Add a new entry in the map; in case there was already an
     * entry with the same key, the merge function will be invoked
     * with the old and the new value to produce the value to take
     * into account.
     * @param k the key
     * @param v the value
     * @param merge a function to merge old and new values in case of conflict.
     * No equality requirements
     */
    putStructWithMerge(k: K & WithEquality, v: V, merge: (v1: V, v2: V) => V): IMap<K,V>;

    /**
     * Return a new map where each entry was transformed
     * by the mapper function you give. You return key,value
     * as pairs.
     * No equality requirements.
     */
    mapStruct<K2,V2>(fn:(k:K&WithEquality, v:V)=>[K2&WithEquality,V2]): IMap<K2,V2>;

    /**
     * Return a new map where each entry was transformed
     * by the mapper function you give. You return key,value
     * as pairs.
     * Equality requirements.
     */
    map<K2,V2>(fn:(k:K&WithEquality, v:V)=>[K2&WithEquality,V2&WithEquality]): IMap<K2,V2>;

    /**
     * Return a new map where keys are the same as in this one,
     * but values are transformed
     * by the mapper function you give. You return key,value
     * as pairs.
     * No equality requirements.
     */
    mapValuesStruct<V2>(fn:(v:V)=>V2): IMap<K,V2>;

    /**
     * Return a new map where keys are the same as in this one,
     * but values are transformed
     * by the mapper function you give. You return key,value
     * as pairs.
     * Equality requirements.
     */
    mapValues<V2>(fn:(v:V)=>V2&WithEquality): IMap<K,V2>;

    /**
     * Convert this map to a vector of key,value pairs.
     * Note that Map is already an iterable of key,value pairs!
     */
    toVector(): Vector<[K,V]>;

    /**
     * number of items in the map
     */
    length(): number;

    /**
     * true if the map is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Create a new map combining the entries of this map, and
     * the other map you give. In case an entry from this map
     * and the other map have the same key, the merge function
     * will be invoked to get a combined value.
     * @param other another map to merge with this one
     * @param merge a merge function to combine two values
     *        in case two entries share the same key.
     */
    mergeWith(other: IMap<K & WithEquality,V>, merge:(v1: V, v2: V) => V): IMap<K,V>;

    /**
     * Transform this value to another value type.
     * Enables fluent-style programming by chaining calls.
     */
    transform<U>(converter:(x:IMap<K,V>)=>U): U;
}
