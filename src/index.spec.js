/* your test code goes here. */
import {StringCalculator} from "./index";

describe('stringCalculator.add', () =>{
    it('should return 0 if passed empty string', () => {
        let strCalc = new StringCalculator();
        let result = strCalc.add("");

        expect(result).toEqual(0);
    });

    it('should return the parsed value if passed single element', () =>{
        let strCalc = new StringCalculator();
        let result = strCalc.add("5");
        expect(result).toEqual(5);
    });

    it('should sum two ints when passed as comma separated string', () => {
        let strCalc = new StringCalculator();
        let result = strCalc.add("1,2");    
        
        expect(result).toEqual(3);
    });

    it('should sum an unknown number of ints when passed as comma separated string', () => {
        let strCalc = new StringCalculator();
        let result = strCalc.add("1,2,5,6,9,33");

        expect(result).toEqual(56);
    });

    it('should sum an unknown number of ints when passed as new-line separated string', ()=>{
        let strCalc = new StringCalculator();
        let result = strCalc.add("1\n3\n8\n4");

        expect(result).toEqual(16)
    });

    it('should sum a combination of commas and new-line seperated string', () => {
        let strCalc = new StringCalculator();
        let result = strCalc.add("1\n2,3");

        expect(result).toEqual(6)
    });

    it('should be be able to split input by delimiter denoted by //', () => {
        let strCalc = new StringCalculator();
        let result = strCalc.add("//;\n1;2");

        expect(result).toEqual(3);  
    })

    it('should throw error when negative input value entered', () => {
        let strCalc = new StringCalculator();

        expect(() => {strCalc.add("1,-2")}).toThrowError(new Error('negatives not allowed: -2'));
    })

    it('should throw error with all negative values when negative input value entered', ()=> {
        let strCalc = new StringCalculator();

        expect(() => {strCalc.add("1,-2\n-4")}).toThrowError(new Error('negatives not allowed: -2,-4'));
    })
})
