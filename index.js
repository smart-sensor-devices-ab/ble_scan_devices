import * as my_dongle from 'bleuio'
import {companyData} from './companydata'
document.getElementById('connect').addEventListener('click', function(){
  my_dongle.at_connect()
})
/* document.getElementById('deviceinfo').addEventListener('click', function(){
  my_dongle.ati().then((data)=>console.log(data))
}) */
document.getElementById('central').addEventListener('click', function(){
    my_dongle.at_central().then((data)=>console.log(data))
})
document.getElementById('scan').addEventListener('click', function(){
  var showhidescanning = document.getElementById("scanningProgress");
  showhidescanning.style.display = "block";
  var table = document.getElementById('outputTable');
  var tr=''
  table.innerHTML = tr;
my_dongle.at_gapscan(5).then((data)=>{
  //console.log(data)
  
   tr += "<table class='table table-striped'>";
  for (var i = 0; i < data.length; i++) {
      tr += "<tr><td>" + data[i] + "</td></tr>";    
  }
   tr += "</table>";
  table.innerHTML = tr;
  showhidescanning.style.display = "none";

})
})

document.getElementById('findscandata').addEventListener('click', function(){
  var showhidescanning = document.getElementById("scanningProgress");
  showhidescanning.style.display = "block";
  var table = document.getElementById('outputTable');
  var tr=''
  table.innerHTML = tr;
my_dongle.at_findscandata('',2000).then((data)=>{
  //console.log(data)
  let advData=[]
  data.map(x=>{
    if(x[0]==='[' && x.includes('ADV')){
      advData.push({
        id: x.split(" ")[0],
        adv:x.split(' ').pop(),
        identifier:getID(x.split(' ').pop())
      })
    }
  })
  let dataFiltered = filterByReference(advData,companyData)

   tr += "<table class='table table-striped'>";
  for (var i = 0; i < dataFiltered.length; i++) {

      tr += "<tr><td>id = " + dataFiltered[i].id + ", adv = "+dataFiltered[i].adv +", company = "+dataFiltered[i].company +" </td></tr>";    
  }
   tr += "</table>";
  table.innerHTML = tr;
  showhidescanning.style.display = "none";

})
})

document.getElementById('stopProcess').addEventListener('click', function(){
   console.log(my_dongle.stop()) 
})

const getID = (data)=>{
  let indentifierReversed
  let length =data.substr(0, 2) 
  
  let pl =parseInt(data.substr(parseInt(length, 16)*2+2,2 ),16) 
  let startsFrom = parseInt(length, 16)*2+4
  
  let fd=data.substr(startsFrom, pl) 
  
  let flagPosition = fd.indexOf("FF")
  if(flagPosition!==-1){
  let identifier = fd.substr(flagPosition+2, flagPosition+4) 
  indentifierReversed = identifier[2]+identifier[3]+identifier[0]+identifier[1]
  }else{
    indentifierReversed='-'
  }
  return indentifierReversed
  }

  const filterByReference = (arr1, arr2) => {
       let res = [];
       let b=[]
       res = arr1.map(x=>{
         arr2.find(y=>{
        //console.log(y.Hexadecimal)
          if(y.Hexadecimal.includes(x.identifier)){
          b.push({
          adv:x.adv,
          id:x.id,
          company:y.Company
          })
          }else if(x.identifier==='-'){
            b.push({
              adv:x.adv,
              id:x.id,
              company:'Unknown'
              })
          }
        })
       })
       const filtered = [...b.reduce((a,c)=>{
        a.set(c.id, c);
        return a;
      }, new Map()).values()];
       return filtered;
    }
    //let r = filterByReference(ar1,ar2)
