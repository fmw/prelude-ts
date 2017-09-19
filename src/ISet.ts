import { WithEquality } from "./Comparison";
import { Value} from "./Value";

/**
 * A generic interface for set-like implementations.
 * @type T the item type
 */
export interface ISet<T> extends Value {

    /**
     * Returns the number of elements in the set.
     */
    length(): number;

    /**
     * true if the set is empty, false otherwise.
     */
    isEmpty(): boolean;

    /**
     * Add an element to this set.
     */
    add(elt: T & WithEquality): ISet<T>;

    /**
     * Add multiple elements to this set.
     */
    addAll(elts: Iterable<T & WithEquality>): ISet<T>;

    /**
     * Returns true if the element you give is present in
     * the set, false otherwise.
     */
    contains(elt: T & WithEquality): boolean;

    /**
     * Return a new collection where each element was transformed
     * by the mapper function you give.
     * The resulting set may be smaller than the source.
     */
    map<U>(mapper:(v:T)=>U&WithEquality): ISet<U>;

    /**
     * Returns a new Set containing the difference
     * between this set and the other Set passed as parameter.
     */
    diff(other: ISet<T&WithEquality>): ISet<T>;

    /**
     * Returns a new set with all the elements of the current
     * Set, minus the elements of the iterable you give as a parameter.
     * If you call this function with a HashSet as parameter,
     * rather call 'diff', as it'll be faster.
     */
    removeAll(elts: Iterable<T&WithEquality>): ISet<T>;

    /**
     * Returns true if the predicate returns true for all the
     * elements in the collection.
     */
    allMatch(predicate:(v:T)=>boolean): boolean;

    /**
     * Returns true if there the predicate returns true for any
     * element in the collection.
     */
    anyMatch(predicate:(v:T)=>boolean): boolean;

    /**
     * Transform this value to another value type.
     * Enables fluent-style programming by chaining calls.
     */
    transform<U>(converter:(x:ISet<T>)=>U): U;

    /**
     * Converts this set to an array
     */
    toArray(): Array<T & WithEquality>;
}
