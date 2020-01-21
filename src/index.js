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
        const {delimiters, workStr} = this.getDelimiter(str)

        let vals = this.splitStringIntoArrayByDelims(workStr, delimiters);


        let valsInt = vals.map(
            val => parseInt(val)
        )

        valsInt = this.filterIneligibleVals(valsInt);
        return valsInt.reduce(
            function(accumulator, val){
                return accumulator + val;
            }, 0
        );
    }

    splitStringIntoArrayByDelims(workStr, delimiters){
        let vals = [workStr];
        delimiters.forEach(delimiter => {
            vals = this.splitStringsByDelimiter(vals, delimiter);
        });
        
        return vals;
    }

    splitStringsByDelimiter(strings, delimiter){
        let workArr = [];
        

        strings.forEach(string => {
            workArr.push(...string.split(delimiter));
        });

        return workArr;
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
        let delimiters = [","];
        let lines = str.split("\n");
        let workStr = str;
        if (lines[0].startsWith("//")){
            delimiters = this.getDelimitersFromFirstLine(lines[0]);
            workStr = lines[1, lines.length-1];
        } 
        delimiters.push("\n");
        return {delimiters, workStr};
    }

    getDelimitersFromFirstLine(line){
        let workStr = line.substring(3);
        return workStr.split("[").map(val => {return val.replace("\]", "")});
    }

}
