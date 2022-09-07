var coursename = window.document.getElementById("coursename");
var coursecat = window.document.getElementById("coursecat");
var courseprice = window.document.getElementById("courseprice");
var coursedes = window.document.getElementById("coursedes");
var btnadd = window.document.getElementById("click");
var btnde = window.document.getElementById("click-delete");
var btncl=window.document.getElementById("click-clear");
var data =window.document.getElementById("data");
var namealert=window.document.getElementById("nameAlert");
var pricealert=window.document.getElementById("priceAlert");
var cataalert=window.document.getElementById("catAlert");
var desalert=window.document.getElementById("desAlert");
var courses = [];
var current;

if(localStorage.getItem("courselist")==null){
    courses=[];
}else{
    courses = JSON.parse(localStorage.getItem("courselist"));
    read();/*dispaly*/
}

btnadd.onclick = function(){
    if(btnadd.innerHTML=="Add Course"){
        add();
    }else{
        updatecourses();
        btnadd.innerHTML="Add Course";
    }
    read();
    clear();
}

btnde.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't  to delete this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          localStorage.removeItem("courselist"); 
          courses =[];
          data.innerHTML=" ";
        }
      });
    
}
btncl.onclick = function(){
clear();
}

function read(){
    /* to print*/
    var result="";
    for(var i=0; i<courses.length ;i++){
        result+=`<tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].cat}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].des}</td>
        <td>
        <button type="button" onclick="getcoursesdata(${i})"  class="btn btn-outline-success">update</button>
        <button type="button" onclick="deletecourse(${i})" class="btn btn-outline-danger">delete</button>
        </td>
        </tr>`;
    }
    data.innerHTML=result;
}
function add(){
    var course = {
        name : coursename.value,
        cat : coursecat.value,
        price: courseprice.value,
        des : coursedes.value
    };
    courses.push(course);
    localStorage.setItem("courselist",JSON.stringify(courses));
    read();
}

function clear(){
    coursename.value=" ";
    coursecat.value=" ";
    courseprice.value=" ";
    coursedes.value=" ";
}

function deletecourse(index){
    Swal.fire(
        'Good job!',
        'You deleted the cousre!',
        'success'
      )
courses.splice(index,1);
localStorage.setItem("courselist",JSON.stringify(courses));
read();
}
function getcoursesdata(index){
    coursename.value=courses[index].name;
    coursecat.value=courses[index].cat;
    courseprice.value=courses[index].price;
    coursedes.value=courses[index].des;
    btnadd.innerHTML="updatecourse";
    current=index;
}
function updatecourses(){
    var course = {
        name : coursename.value,
        cat : coursecat.value,
        price: courseprice.value,
        des : coursedes.value
    };
    courses[current].name=course.name;
    courses[current].cat=course.cat;
    courses[current].price=course.price;
    courses[current].des=course.des;
    localStorage.setItem("courselist",JSON.stringify(courses));

}

function search(index){
    var result="";
    for(var i=0; i<courses.length ;i++){
        if(courses[i].name.toLowerCase().includes(index.toLowerCase())){
            result+=`<tr>
            <td>${i+1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].des}</td>
            <td>
            <button type="button" onclick="updatecourse(${i})"  class="btn btn-outline-success">update</button>
            <button type="button" onclick="deletecourse(${i})" class="btn btn-outline-danger">delete</button>
            </td>
            </tr>`;
        }
    }
    data.innerHTML=result;
}

 coursename.onkeyup =  function()  {
    var namepat = /^[A-Z][a-z]{2,9}$/;
    if(namepat.test(coursename.value)){
        btnadd.removeAttribute("disabled");
        coursename.classList.add('is-valid');
        coursename.classList.remove('is-invalid');
        namealert.classList.add('d-none');
    }else{
        btnadd.setAttribute("disabled","disabled");
        coursename.classList.replace("is-valid","is-invalid");
        namealert.classList.add('d-block');
        namealert.classList.remove('d-none');
    }
}

courseprice.onkeyup = function(){
    var pricepat=/^[0-9]{2,9}$/;
    if(pricepat.test(courseprice.value)){
        btnadd.removeAttribute("disabled");
        courseprice.classList.add('is-valid');
        courseprice.classList.remove('is-invalid');
        pricealert.classList.add('d-none');
    }else{
        btnadd.setAttribute("disabled","disabled");
        courseprice.classList.replace("is-valid","is-invalid");
        pricealert.classList.add('d-block');
        pricealert.classList.remove('d-none');
    }
}
coursecat.onkeyup = function(){
    var catpat=/[a-z]/;
    if(catpat.test(coursecat.value)){
        btnadd.removeAttribute("disabled");
        coursecat.classList.add('is-valid');
        coursecat.classList.remove('is-invalid');
        cataalert.classList.add('d-none');
    }else{
        btnadd.setAttribute("disabled","disabled");
        coursecat.classList.replace("is-valid","is-invalid");
        cataalert.classList.add('d-block');
        cataalert.classList.remove('d-none');
    }
}
coursedes.onkeyup = function(){
    var despat=/[a-zA-Z0-9]{1}/;
    if(despat.test(coursedes.value)){
        btnadd.removeAttribute("disabled");
        coursedes.classList.add('is-valid');
        coursedes.classList.remove('is-invalid');
        desalert.classList.add('d-none');
    }else{
        btnadd.setAttribute("disabled","disabled");
        coursedes.classList.replace("is-valid","is-invalid");
        desalert.classList.add('d-block');
        desalert.classList.remove('d-none');
    }
}