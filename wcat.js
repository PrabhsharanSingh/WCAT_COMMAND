let fs=require("fs");
let inputArr=process.argv.slice(2);
//Segregate -> options 
//Segregate -> files
let optionsArr=[]
let filesArr=[]
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar == '-'){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

for(let i=0;i<filesArr.length;i++){
    if(fs.existsSync(filesArr[i]) == false){
        console.log("File does not exist");
        return;
    }
}

let content="";
for(let i=0;i<filesArr.length;i++){
    let filePath=filesArr[i];
    if(fs.existsSync(filePath)){

        content=content+fs.readFileSync(filesArr[i])+"\r\n";

    }else{
        console.log("File doesn't exist");
        return;
}
}
let contentArr=content.split("\r\n");

let isPresent=optionsArr.includes("-s");
if(isPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i]=null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i]=null;
        }
    }

    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}
//console.log(contentArr.join("\n"));
let indexOfN = optionsArr.indexOf("-n");
let indexOfB = optionsArr.indexOf("-b");
let finalOption = "";
if(indexOfB>-1 && indexOfN>-1){
    if(indexOfN > indexOfB){
        finalOption = "-b";
    }else{
        finalOption = "-n";
    }
}else{
    if(indexOfN>-1){
        finalOption="-n";
    }else if(indexOfB>-1){
        finalOption="-b";
    }
}

if(finalOption != ""){
    if(finalOption == "-n"){
        modifyContentByN(contentArr);
    }else if(finalOption == "-b"){
        modifyContentByB(contentArr);
    }
}

function modifyContentByN(contentArr){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i] = (i+1)+"."+contentArr[i];
    }
}

function modifyContentByB(contentArr){
    let num=1;
    for(let i=0;i<contentArr.length;i++){
        //let num=1;
        if(contentArr[i].length != 0){
            contentArr[i] = num +"."+contentArr[i];
            num++;
        }
    }
}

console.log(contentArr);
//console.log(contentArr.join("\n"));