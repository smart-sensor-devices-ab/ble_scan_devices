import * as my_dongle from 'bleuio'
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
my_dongle.at_gapscan(10).then((data)=>{
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
my_dongle.at_findscandata('',100).then((data)=>{
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

document.getElementById('stopProcess').addEventListener('click', function(){
   console.log(my_dongle.stop()) 
})

