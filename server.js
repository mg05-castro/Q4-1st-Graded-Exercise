// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/happy", (req, res) => {
  res.render("happy");
});

app.post("/happy", (req,res) => { // initializes the values for each variable
  let happyName = req.body.name,
      happyGender = req.body.gender,
      happyNum = req.body.number;
  let going = [];
  let notGoing = [];

  for(let i = 0; i<happyNum; i++){ //checks if i is less than number of guests going
    gName = req.body[`name${i}`];
    gCheck = req.body[`checkbox${i}`];
    if(gCheck){ //if guest is going
      gCheck = "On"
      going.push({gName, gCheck})
    }
    else{
      gCheck = "Off"
      notGoing.push({gName, gCheck})
    }
  }

  if (!happyName || !happyGender || going.length == 0)
    res.render("happy", {Error: "Input a valid value"})
  else{
    let BDsong = [
      "Happy", "birthday", "to", "you.", "Happy", "birthday", "to", "you.",
      "Happy", "birthday", "dear", `${happyName}.`, "Happy", "birthday", "to", "you!"];
  singing = [];
  line = 16;
  while (happyName>BDsong.length){ //if there are more than 16 guests
    line = line + 16
  }
  for (let i=0; i < line; i++) { //assigning the word(s) per guest
    gWord = BDsong[i%16];
    gPerson = going[i%going.length].gName;
    singing.push(gPerson, gWord)
  }

  let gJolly = going[line%going.length].gName;
  if (happyGender == "Male"){
    singing.push(gJolly, "For he's a jolly good fellow, For he's a jolly good fellow, For he's a jolly good fellow, which nobody can deny!")
  }
  else {
    singing.push(gJolly, "For she's a jolly good fellow, For she's a jolly good fellow, For she's a jolly good fellow, which nobody can deny!")
  }
  res.render("happy", {happyName, happyGender, happyNum, going, notGoing, singing})
  }
})
// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
