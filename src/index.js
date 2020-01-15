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

        this.throwOnNegativeSums(sumsInt);

        return sumsInt.reduce(
            function(accumulator, val){
                return accumulator + val;
            }
        );
    }

    throwOnNegativeSums(sums){
        let negativeSums = sums.filter(sum => {
            return sum < 0
        })
        
        if (negativeSums.length !== 0){
            throw Error("negatives not allowed: " + negativeSums.join());
        }
    }

    getDelimiter(str){
        let delimiter = ",";
        let workStr = str;
        if (str.startsWith("//")){
            delimiter = str.substring(2, 3);
            workStr = str.substring(str.indexOf("\n") + 1)
        } 
        return {delimiter, workStr};
    }
}
