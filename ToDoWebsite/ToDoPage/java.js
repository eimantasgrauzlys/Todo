// Sukuria uzdarymo mygtuka i priskiria prie kiekvieno
let myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Uzhidina pazymeta eilute paspaudtus x
let close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Prideda varnele prie pazymetos eilutes
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);



function getloggeduserinfo()
{
  let username = localStorage.getItem("loggeduservardas");
  let userid = localStorage.getItem("loggeduserid");
  document.getElementById("user").innerHTML ="Vartotojas: " + username;

  const apiurl = "https://testapi.io/api/eimantasgrauzlys/resource/Contents";
  fetch(apiurl)
  .then((res)=>{
    if(res.ok){
      return res.json();
    }
  })
  .then (result => contentcheck(result.data));
}

function contentcheck(users)
{
  let userid = localStorage.getItem("loggeduserid");
  users.forEach(user => {
    if (user.Taskid == userid)
  {
  const li = document.createElement("li");
  const taskValue = document.createTextNode("Užduotis: "+ user.Content + " | Kategorija: " + user.Type + " | Atlikti iki: " + user.Enddate);
    
    li.appendChild(taskValue);
    document.getElementById("myUL").appendChild(li);
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  }
  });
}
getloggeduserinfo();



function newElement() {

  const mycontentinput = document.getElementById('myInput').value
  const mycategoryinput = document.getElementById('myCategory').value
  const myenddateinput = document.getElementById('myDate').value
  let userid = localStorage.getItem("loggeduserid");
  
  alert("Sekmingai pridėta uzduotis!")
  
  fetch('https://testapi.io/api/eimantasgrauzlys/resource/Contents', {
   method: 'POST',
   headers: {
     'Content-type': 'application/json'
   },
   body: JSON.stringify({
     Taskid: userid,
    Type: mycategoryinput,
     Content: mycontentinput,
     Enddate: myenddateinput,
   })
  })
   .then((response) => {
     if (response.ok) {
       console.log('ok');
       return response.json();
       
     } else {
       console.log('not okay');
     }
   })
   .then((result) => {
     console.log(result);
   })
   .catch((err) => {
     console.log(err);
   })

  var li = document.createElement("li");
  const inputValue = document.getElementById("myInput").value;
  const inputcategory = document.getElementById("myCategory").value;
  const inputdate = document.getElementById("myDate").value;
  
const taskValue = document.createTextNode("Užduotis: "+ inputValue + " | Kategorija: " + inputcategory + " | Atlikti iki: " + inputdate);

  li.appendChild(taskValue);
  if (inputValue === '') {
    alert("Jūs neįvedėte užduoties!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  document.getElementById("myCategory").value = "";
  document.getElementById("myDate").value = "";
  

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}