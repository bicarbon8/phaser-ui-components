export module Helpers {
    /**
     * returns the highest value from a passed in array of numbers or 0 if no
     * values passed in
     * @param values an array of numbers
     * @returns the highest value from the array or 0 if no values passed in
     */
    export function getHighest(...values: number[]): number {
        let highest: number = -Infinity;
        if (values) {
            for (var i=0; i<values.length; i++) {
                if (values[i] > highest) {
                    highest = values[i];
                }
            }
        }
        return highest;
    }

    /**
     * returns the lowest value from a passed in array of numbers or Infinity if no
     * values passed in
     * @param values an array of numbers
     * @returns the lowest value from the array or Infinity if no values passed in
     */
    export function getLowest(...values: number[]): number {
        let lowest: number = Infinity;
        if (values) {
            for (var i=0; i<values.length; i++) {
                if (values[i] < lowest) {
                    lowest = values[i];
                }
            }
        }
        return lowest;
    }
    
    export function merge<T extends object>(baseObj: T, mergeObj: T): T {
        let result: T = {} as T;
        if (mergeObj == null) return baseObj;
        if (baseObj == null) return mergeObj;
        if (typeof baseObj === 'function' && typeof mergeObj === 'function') {
            return mergeObj as T;
        }
        if (Array.isArray(baseObj) && Array.isArray(mergeObj)) {
            return mergeArray(Array.from(baseObj), Array.from(mergeObj)) as T;
        }
        for (const key in baseObj) {
            if (Object.prototype.hasOwnProperty.call(baseObj, key)) {
                let baseElement: unknown = baseObj[key];
                let mergeElement: unknown = mergeObj[key];
                if (mergeElement && typeof baseElement === 'object') {
                    mergeElement = merge(baseElement as object, mergeElement as object);
                    mergeObj[key] = mergeElement as T[Extract<keyof T, string>];
                }
            }
        }
        result = {...baseObj, ...mergeObj, ...result};
        return result;
    }

    function mergeArray(baseArray: Array<unknown>, mergeArray: Array<unknown>): Array<unknown> {
        return baseArray.concat(mergeArray);
    }
}