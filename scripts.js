//generate a win counter
if (localStorage.getItem("winCounter")== null){
    var wins = 0
}
else{
    var wins = parseInt(localStorage.getItem("winCounter"))
}

//generate a win counter
if (localStorage.getItem("playCounter")== null){
    var plays = 0
}
else{
    var plays = parseInt(localStorage.getItem("playCounter"))
}

function randInt(min, max) { //random function
    return Math.floor(Math.random() * (max - min) + min);
} 

String.prototype.replaceAt = function(index, replacement) { //function for replacing Strings
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}

result = possibleResults[randInt(0,possibleResults.length)].toUpperCase()
console.log(result)
currentWordLine = 0;

function wordleInput(){
    var input = document.getElementById('wordleInputForm').value;

    document.getElementById('wordleInputForm').value = "" //clear input

    input = input.toUpperCase() //makes all letters of the input uppercase

    //checks if the length of the input word is exactly 5 letters
    if (input.length==5){
        winLetters = 0;
        resultTemp = result;
        isViableWord = true

        $(wordleInputForm).css("background-color", "rgba(39, 39, 39, 0.8)"); 

        for(var i = 0; i<5; i++){
            if (isNaN(input.charAt(i))){ //checks for numbers in input (usually words dont contain numbers)

                idNum = "#"+currentWordLine+i
                $(idNum).text(input.charAt(i));

                if(input.charAt(i) ==result.charAt(i)){ //if the letter matches its position with the result, color the box green
                    winLetters +=1;
                    resultTemp = resultTemp.replaceAt(resultTemp.indexOf(input.charAt(i)), "_" )
                    $(idNum).css("background-color","#538d4e"); 
                }
                else if(resultTemp.indexOf(input.charAt(i))!=-1){
                    resultTemp = resultTemp.replaceAt(resultTemp.indexOf(input.charAt(i)), "_" )
                    console.log(resultTemp)
                    $(idNum).css("background-color","#b59f3b"); 
                }
                else{
                    $(idNum).css("background-color","rgba(75, 75, 75, 0.8)"); 
                }

            }
            else{
                isViableWord = false
                $(wordleInputForm).css("background-color", "rgb(224, 39, 39)");
            }   
        }

        if(isViableWord){ //if the word contains no numbers, we go to the next line or win/lose condition

            if (winLetters==5){ //your input contained 5 winning letters
                wins+=1
                plays+=1
                localStorage.setItem("winCounter", wins);
                localStorage.setItem("playCounter", plays);

                var x = parseInt(localStorage.winCounter)
                var y = parseInt(localStorage.playCounter)
                var percent = Math.floor(x/y*100)

                $("#wordleInputForm").prop("disabled",true);
                $("#bttn").prop("disabled",true);

                $("#modalText").html("You won! <br><br> You have won "+localStorage.winCounter+" out of "+localStorage.playCounter+" ("+percent+"%) games so far!")
                $('#resultsModal').modal('show')

                
                
            }
            else if (currentWordLine>=4){ //inputs exceed max word line count
                plays+=1
                localStorage.setItem("playCounter", plays);

                $("#wordleInputForm").prop("disabled",true);
                $("#bttn").prop("disabled",true);
                
                var x = parseInt(localStorage.winCounter)
                var y = parseInt(localStorage.playCounter)
                var percent = Math.floor(x/y*100)

                $("#modalText").html("You lost! <br><br> The answer was <br>"+result+" <br><br> You have won " +localStorage.winCounter+" out of "+localStorage.playCounter+" ("+percent+"%) games so far!")
                $('#resultsModal').modal('show')
            }
            else{ //increase word line
                currentWordLine+=1;
            }
            
        }
    }
    else{
        $(wordleInputForm).css("background-color", "rgb(224, 39, 39)"); 
    }
}