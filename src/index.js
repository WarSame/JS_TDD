export class StringCalculator {
    constructor(){
    }

    add(str){
        if (str === ""){
            return 0;
        }
        else {
            return this.parseValue(str);
        }
    }

    parseValue(str){
        const {delimiter, workStr} = this.getDelimiter(str);
        let sums = [];
        workStr.split("\n").forEach(element => {
            sums.push(...element.split(delimiter));
        });

        let sumsInt = sums.map(
            sum => parseInt(sum)
        )

        sumsInt = this.filterIneligibleVals(sumsInt);
        return sumsInt.reduce(
            function(accumulator, val){
                return accumulator + val;
            }
        );
    }

    filterIneligibleVals(vals){
        let outputVals = this.throwOnNegativeSums(vals);
        return this.ignoreOverOneThousand(outputVals);
    }

    ignoreOverOneThousand(vals){
        return vals.filter(val => {
            return val <= 1000
        })
    }

    throwOnNegativeSums(vals){
        let negativeVals = vals.filter(val => {
            return val < 0
        })
        
        if (negativeVals.length !== 0){
            throw Error("negatives not allowed: " + negativeVals.join());
        }
        return vals;
    }

    getDelimiter(str){
        let delimiter = ",";
        let lines = str.split("\n");
        let workStr = str;
        if (lines[0].startsWith("//")){
            delimiter = str.substring(str.indexOf("[") + 1, str.indexOf("]"));
            workStr = lines[1, lines.length-1];
        } 
        return {delimiter, workStr};
    }

}
