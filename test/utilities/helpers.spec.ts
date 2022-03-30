import { TextButtonOptions } from "../../src/button/text-button-options";
import { Colors } from "../../src/color/colors";
import { Helpers } from "../../src/utilities/helpers";

describe('Helpers', () => {
    describe('merge', () => {
        it('can handle null mergeObj', () => {
            const mergeObj: TextButtonOptions = null;
            const baseObj: TextButtonOptions = TextButtonOptions.DEFAULT();
            const actual: TextButtonOptions = Helpers.merge(baseObj, mergeObj);
    
            expect(actual.x).toBe(baseObj.x);
            expect(actual.y).toBe(baseObj.y);
            expect(actual.padding).toBe(baseObj.padding);
            expect(actual.textStyle.fontFamily).toEqual(baseObj.textStyle.fontFamily);
            expect(actual.textStyle.fontSize).toEqual(baseObj.textStyle.fontSize);
            expect(actual.textStyle.color).toEqual('#000000');
        });

        it('can handle null baseObj', () => {
            const mergeObj: TextButtonOptions = {
                x: 1,
                padding: 2,
                textStyle: {fontSize: '60px'}
            };
            const baseObj: TextButtonOptions = null;
            const actual: TextButtonOptions = Helpers.merge(baseObj, mergeObj);
    
            expect(actual.x).toBe(1);
            expect(actual.y).toBeUndefined();
            expect(actual.padding).toBe(2);
            expect(actual.textStyle.fontFamily).toBeUndefined();
            expect(actual.textStyle.fontSize).toEqual(mergeObj.textStyle.fontSize);
            expect(actual.textStyle.color).toBeUndefined();
        });
        
        it('can merge complex objects', () => {
            const mergeObj: TextButtonOptions = {
                x: 1,
                padding: 2,
                textStyle: {fontSize: '60px'}
            };
            const baseObj: TextButtonOptions = TextButtonOptions.DEFAULT();
            const actual: TextButtonOptions = Helpers.merge(baseObj, mergeObj);
    
            expect(actual.x).toBe(1);
            expect(actual.y).toBe(0);
            expect(actual.padding).toBe(2);
            expect(actual.textStyle.fontFamily).toEqual(baseObj.textStyle.fontFamily);
            expect(actual.textStyle.fontSize).toEqual(mergeObj.textStyle.fontSize);
            expect(actual.textStyle.color).toEqual('#000000');
        });

        it('does not modify the mergeObj', () => {
            const mergeObj: TextButtonOptions = {
                x: 1,
                padding: 2,
                textStyle: {fontSize: '60px'}
            };
            const baseObj: TextButtonOptions = TextButtonOptions.DEFAULT();
    
            expect(mergeObj.x).toBe(1);
            expect(mergeObj.y).toBeUndefined();
            expect(mergeObj.padding).toBe(2);
            expect(mergeObj.textStyle.fontFamily).toBeUndefined();
            expect(mergeObj.textStyle.fontSize).toEqual(mergeObj.textStyle.fontSize);
            expect(mergeObj.textStyle.color).toBeUndefined();
        });

        it('can merge arrays', () => {
            const mergeObj: {x?: number, y?: number, arr?: string[]} = {
                x: 2,
                arr: ['one', 'three']
            };
            const baseObj: {x?: number, y?: number, arr?: string[]} = {
                x: 0,
                y: 0,
                arr: ['two']
            };
            const actual: {x?: number, y?: number, arr?: string[]} = Helpers.merge(baseObj, mergeObj);

            expect(actual.x).toBe(mergeObj.x);
            expect(actual.y).toBe(baseObj.y);
            const expectedArr: string[] = ['one', 'two', 'three'];
            for (var i=0; i<expectedArr.length; i++) {
                expect(actual.arr.includes(expectedArr[i])).toBeTrue();
            }
        });
    });
});