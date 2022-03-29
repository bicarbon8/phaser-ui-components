import { Colors } from "../../src";

describe('Colors', () => {
    describe('isDark', () => {
        const vals: {input: number, expected: boolean}[] = [
            {input: 0x000000, expected: true},
            {input: 0xffffff, expected: false},
            {input: 0x777700, expected: true},
            {input: 0x8888ff, expected: false},
            {input: 0x012345, expected: true},
            {input: 0xfedcba, expected: false},
            {input: 0x000fff, expected: true},
            {input: 0x777777, expected: true},
            {input: 0x888888, expected: false}
        ];
        for (var i=0; i<vals.length; i++) {
            let v: {input: number, expected: boolean} = vals[i];
            it(`returns expected for - in: ${v.input.toString(16)}, ex: ${v.expected.toString()}`, () => {
                expect(Colors.isDark(v.input)).toBe(v.expected);
            });
        }
        
        it('can accept a number as input', () => {
            const darkNum: number = 0x707070;
            const lightNum: number = 0xf8f8f8;

            expect(Colors.isDark(darkNum)).toBe(true);
            expect(Colors.isDark(lightNum)).toBe(false);
        });

        it('can accept a string as input', () => {
            const darkStr: string = '#707070';
            const lightStr: string = '#f8f8f8';

            expect(Colors.isDark(darkStr)).toBe(true);
            expect(Colors.isDark(lightStr)).toBe(false);
        });
    });

    describe('toHexString', () => {
        const vals: {input: number, expected: string}[] = [
            {input: 0x000000, expected: '#000000'},
            {input: 0xffffff, expected: '#ffffff'},
            {input: 0x777700, expected: '#777700'},
            {input: 0x8888ff, expected: '#8888ff'},
            {input: 0x012345, expected: '#012345'},
            {input: 0xfedcba, expected: '#fedcba'},
            {input: 0x000fff, expected: '#000fff'},
            {input: 0x777777, expected: '#777777'},
            {input: 0x888888, expected: '#888888'}
        ];
        for (var i=0; i<vals.length; i++) {
            let v: {input: number, expected: string} = vals[i];
            it(`returns expected color string for - in: ${v.input.toString(16)}, ex: ${v.expected.toString()}`, () => {
                expect(Colors.toHexString(v.input)).toEqual(v.expected);
            });
        }
    });

    describe('toHexNumber', () => {
        const vals: {input: string, expected: number}[] = [
            {input: '#000000', expected: 0x000000},
            {input: '#ffffff', expected: 0xffffff},
            {input: '#777700', expected: 0x777700},
            {input: '#8888ff', expected: 0x8888ff},
            {input: '#012345', expected: 0x012345},
            {input: '#fedcba', expected: 0xfedcba},
            {input: '#000fff', expected: 0x000fff},
            {input: '#777777', expected: 0x777777},
            {input: '#888888', expected: 0x888888}
        ];
        for (var i=0; i<vals.length; i++) {
            let v: {input: string, expected: number} = vals[i];
            it(`returns expected color string for - in: ${v.input.toString()}, ex: ${v.expected.toString(16)}`, () => {
                expect(Colors.toHexNumber(v.input)).toEqual(v.expected);
            });
        }
    });

    describe('random', () => {
        it('can generate random colours', () => {
            const colours: Set<string> = new Set<string>();
            for (var i=0; i<10; i++) {
                colours.add(Colors.random());
            }

            expect(colours.size).toBe(10);
        });
    });
});