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

        return sums.reduce(
            function(accumulator, val){
                let workSum = accumulator + parseInt(val);
                return workSum;
            }, 
            0
        );
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
