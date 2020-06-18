// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//this function returns the password
function generatePassword(){
  
  let boxesChecked = isChecked(); //Find the checked boxes
  let passwordLength = getPasswordLength(); //Get length of desired password
  let types = getCriteria();//Generates seeding array
  let proceed = isValidInput(boxesChecked, passwordLength);//validates user inputs.
  let special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", "?"];
  
  //the wait is over, if everything is valid, time to build a password.
  if(proceed){ 
    
    //use the array and start generating passwords
    //array shows ON or OFF states, loops over states adding random chars till above max
    let rawPass = []; 
    let ltr = "a";
    let count = 0; //I need a count

    while(count < passwordLength){
    //lower case ascii 97 to 122 status: working
    if(types[0] == 1){
      ltr = Math.floor((Math.random() * 25)+ 97);
      rawPass.push(String.fromCharCode(ltr));
      count++;
    }
    //upper case ascii 65 to 90 status: working
    if(types[1] == 1){
      ltr = Math.floor((Math.random() * 25)+ 65);
      rawPass.push(String.fromCharCode(ltr));
      count++; 
    }
    //numbers 0 to 9 status: working
    if(types[2] == 1){
      ltr = Math.floor((Math.random() * 8) + 1);
      rawPass.push(ltr);
      count++;
    }
    //special characters enumerated staus: working
    if(types[3] == 1){
      ltr = Math.floor((Math.random() * 12) + 1);
      rawPass.push(special[ltr]);
      count++;
    }
    }
    //randomize the array
    rawPass = shuffle(rawPass);
    //Depending on the number of digits we may need to trim.
    rawPass = passTrimmer(rawPass, passwordLength);
    let passwordComplete = finalizePassword(rawPass);
    return passwordComplete;
  }
  else{
    return "";
  }
}

//Turns the array into a string
function finalizePassword(pass){
  let password = "";
  for(var i = 0; i < pass.length; i++){
    password += pass[i];
  }
  return password;
}

//In case password exceeds desired length this will remove some elements
function passTrimmer(pass, x){
  //Password is the proper length do nothing.
  if(pass.length == x){
    return pass;
  }
  else{ //Remove the last element of array until the right size.
    while(pass.length != x){
      pass.pop();
    }
    return pass;
  }  
}

//Uses Fisher-Yates shuffle to randomize picked password.
function shuffle(myArray){
  let ctr = myArray.length, temp, index;
  while(ctr > 0){
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = myArray[ctr];
    myArray[ctr] = myArray[index];
    myArray[index] = temp;
  }
  return myArray;
}

//Generates a random number
function randomNumber(min, max){
  return (Math.floor(Math.random() * (max - min + 1) + min));
}

//Function will validate use input. Status working.
function isValidInput(boxesChecked, num){
  if(!boxesChecked){
    alert("You must check at least one box.");
    return false;
  }
  try{
    if(num == "") throw "empty.";
    if(isNaN(num)) throw "not a number.";
    if(num < 8) throw "a miniumn of 8 characters.";
    if(num > 128) throw "a maximum of 128 characters.";
  }catch(err){
    alert("Password length is " + err);
    return false;
  }
  return true;
}

//function gets the password length. 
function getPasswordLength(){

  let input = prompt("Please enter desired password length. Min 8 Max 128");
  input = Math.floor(input); //just in case they did a decimal.
  return input; //input validated later.
}

//Makes sure at least one checkbox has been selected. Status working!
function isChecked(){
  
  //if any not checked
  if( !document.getElementById("lower").checked && !document.getElementById("upper").checked && !document.getElementById("number").checked && !document.getElementById("special").checked){
    return false;
  }else{
    return true;
  }
}

//Gets status of checkboxes to generate password. Validates min one has been checked. Status working.
function getCriteria(){
  
  //Since we want to allow multiple selections lets use an array. to pass yes or no back.
  let choices = [];
  //check to see which boxes are checked, 1 if yes, 0 if no
  if(document.getElementById("lower").checked){
    choices.push(1);
  }else{
    choices.push(0)
  }
  if(document.getElementById("upper").checked){
    choices.push(1);
  }else{
    choices.push(0)
  }
  if(document.getElementById("number").checked){
    choices.push(1);
  }else{
    choices.push(0)
  }
  if(document.getElementById("special").checked){
    choices.push(1);
  }else{
    choices.push(0)
  }
  return choices;
}