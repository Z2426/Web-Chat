function CountSpacefirst(string){
    var count = 0;
    for(let i = 0; i < string.trim().length;i++){
        if(string[i] == " "){
            count = i;
        }
    }
    return count;
}

function CountOneSpace(string){
    var count = 0;
    for(let i = 0; i < string.trim().length;i++){
        if(string[i] == " "){
            count ++;
        }
    }
    if(count == 1){
        return true;
    }
    return false;
}

module.exports = {
    CountSpacefirst: CountSpacefirst,
    CountOneSpace: CountOneSpace
}