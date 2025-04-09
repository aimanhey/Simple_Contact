const express = require("express");
const app = express();
app.use(express.urlencoded());
app.use(express.json());
const cors = require("cors");
app.use(cors());

function add(x, y) {
  let z = x + y;

  return z;
}

function myarray() {
  x = ["like", "okey", "school", 100, "oke"];

  for (let i = 0; i < x.length; i++) {
    if (x[i] == "oke") {
      console.log(true);
      return true;
    }
    //
  }
  return false;
}

function sortMyArray() {
  x = 1-0.1;
  /*
   if(x==1){
       return true;
   }else{
       return false;
   }*/

  //hjk = x === 2 ? true : false;

  return x;
}

anyway =() =>{
    
}



function myFunc(){
    x="My name is Aiman";
    return x.split(" ")//.reverse().join(" ");
}

app.post("/a", (req, res) => {
  var get = req.body.x;
  var getss = req.body.z;

  let y = add(get, getss);
  console.log(y);

  let d = myFunc();
  //res.sendStatus(200).send(y);
  res.json({ status: true, result: d });
});

app.listen(8080, "127.0.0.1");
console.log(`Server is running on port: `);
