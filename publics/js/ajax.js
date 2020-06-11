
// function showHint(str) {
//   var xhttp;
//   if (str.length == 0) { 
//     document.getElementById("txtHint").innerHTML = "";
//     return;
//   }
//   xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//       document.getElementById("txtHint").innerHTML = xhttp.responseText;
//     }
//   };
//   xhttp.open("GET", "gethint.php?q="+str, true);
//   xhttp.send();   
// }

// function ajax() {

//     let url = 'http://localhost:3000/ajax';
//     let xhr = new XMLHttpRequest();
//     let output = document.getElementById("content");
//     xhr.onreadystatechange = handleResult;
//     xhr.open('GET',url)
//     xhr.send()

//     function handleResult(){
//         if(xhr.readyState === XMLHttpRequest.DONE){
//             output.innerHTML = xhr.responseText;
//         }
//     }
   
// }
function ajax() {
    
    var xmlHttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp=new XMLHttpRequest();
    }
    xmlHttp.onreadystatechange=function() {
        // 4 == XMLHttpRequest.Done
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            document.getElementById("content").innerHTML=xmlHttp.responseText;
        }

    }
    xmlHttp.open("GET","http://localhost:3000/ajax",true);
    xmlHttp.send();

}

