
document.getElementById("form").addEventListener('submit', register)

function register(event){
const vardas = document.getElementById('nameinput').value
const lastname = document.getElementById('lastnameinput').value
const email = document.getElementById('emailinput').value
let personid = Math.floor(Math.random() * 10000) + 1;



event.preventDefault();
alert("Registracija sėkminga! galite grįžti ir prisijungti!")

fetch('https://testapi.io/api/eimantasgrauzlys/resource/Users', {
   method: 'POST',
   headers: {
     'Content-type': 'application/json'
   },
   body: JSON.stringify({
    Vardas: vardas,
     Pavarde: lastname,
     Email: email,
     Personid: personid
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

   document.getElementById("nameinput").value = "";
   document.getElementById('lastnameinput').value = "";
   document.getElementById("emailinput").value = "";

}


document.getElementById("loginform").addEventListener('submit', getusers)

function getusers(event)
{

event.preventDefault();
  const apiurl = "https://testapi.io/api/eimantasgrauzlys/resource/Users";
  fetch(apiurl)
  .then((res)=>{
    if(res.ok){
      return res.json();
    }
  })
  .then (result => logincheck(result.data));
}

function logincheck(users)
{
  var nameinput = document.getElementById('loginnameinput').value;
  var lastname = document.getElementById('loginlastnameinput').value;

  const inputnamebox = document.getElementById('loginnameinput');
  const inputlastnamebox = document.getElementById('loginlastnameinput');
  users.forEach(user => {
    if (user.Vardas == nameinput && user.Pavarde == lastname)
     {
      alert('Sekmingai prisijungta!')
      localStorage.setItem("loggeduserid", user.Personid);
      localStorage.setItem("loggeduservardas", user.Vardas);
      localStorage.setItem("loggeduserpavarde", user.Pavarde);
      localStorage.setItem("loggeduseremail", user.Email);
      
      window.location.href=("file:///Users/eimantasgrauzlys/Projects/ToDoWebsite/ToDoPage/index.html")
    } 
    else 
    {
       document.getElementById("loginerrorbox").innerHTML ="Blogi prisijungimo duomenys!";
       document.getElementById("loginerrorbox").style.color = "red";
      inputnamebox.style.backgroundColor = '#ff595e';
      inputlastnamebox.style.backgroundColor = '#ff595e';
    }
    
  });  
}


