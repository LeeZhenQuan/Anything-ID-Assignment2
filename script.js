setTimeout(myFunction, 30000);

function myFunction(){
  window.location.href = "home2.html";
}
$(document).ready(function () {
    const APIKEY = "61d29385ccd0211b3208956e";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
  
    $("#contact-submit").on("click", function (e) {
      e.preventDefault();
  
      let name = $("#xName").val();
      let email = $("#xEmail").val();
      let password = $("#xPassword").val();
  
      let jsondata = {
        "xName": name,
        "xEmail": email,
        "xPassword": password,
        "xMemberPlan": false,
        "xAddress": "Null",
        "xCard": "Null",
        "xPostalCode": "Null"
      };
  
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interectivedev-13c7.restdb.io/rest/contact",
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          $("#contact-submit").prop( "disabled", true);
          $("#add-contact-form").trigger("reset");
        }
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        
        $("#add-update-msg").show().fadeOut(3000);
  
        getContacts();
      });
    });
  
    function getContacts(limit = 10, all = true) {
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interectivedev-13c7.restdb.io/rest/contact",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
      $.ajax(settings).done(function (response) {
        let content = "";
        for (var i = 0; i < response.length && i < limit; i++) {
          content = `${content}<tr id='${response[i]._id}'>
          <td>${response[i].xName}</td>
          <td>${response[i].xEmail}</td>
          <td>${response[i].xPassword}</td>
          <td>${response[i].xMemberPlan}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
          <td><a href='#update-contact-container' class='update' 
          data-id='${response[i]._id}' data-name='${response[i].xName}' 
          data-email='${response[i].xEmail}' data-password='${response[i].xPassword}' 
          data-memberPlan='${response[i].xMemberPlan}'>Update</a></td></tr>`;
        }
        $("#contact-list tbody").html(content);
        $("#total-contacts").html(response.length);
      });
    }
    // delete this before submit
    $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      let xName = $(this).data("name");
      let xEmail = $(this).data("email");
      let xPassword = $(this).data("password");
      let xMemberPlan = $(this).data("memberPlan");
      let contactId = $(this).data("id");
  
      $("#update-xName").val(xName);
      $("#update-xEmail").val(xEmail);
      $("#update-xPassword").val(xPassword);
      $("#update-xMemberPlan").val(xMemberPlan);
      $("#update-contact-id").val(contactId);
      $("#update-contact-container").show();
  
    })
    //login page
    $(".login").submit(function(e){
      e.preventDefault();
      validation();
    });
    //update membership
    $("#purchase").submit(function (e) {
      console.log("fuck");
      e.preventDefault();
      let xName = sessionStorage.getItem("Name");
      let xEmail = sessionStorage.getItem("Email");
      let xPassword = sessionStorage.getItem("Password");
      let xAddress = $("#address").val();
      let xPostalCode= $("#postalcode").val();
      let xCard = $("#card").val()
      let contactId = sessionStorage.getItem("id");
      updateForm(contactId, xName, xEmail, xPassword, xAddress, xPostalCode, xCard);
    });
//This Put is for changing membership plan to true
    function updateForm(id,name, email, password, address,postalcode,card) {
      console.log("fuck");
      var jsondata = { 
        "xName": name,
        "xPassword": password,
        "xEmail": email,
        "xMemberPlan": true,
        "xAddress": address,
        "xCard": card, 
        "xPostalCode": postalcode
      };
       
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://interectivedev-13c7.restdb.io/rest/contact/${id}`,
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#update-contact-container").fadeOut(5000);
        getContacts();
      });
    }

    function validation(username, password)
    {
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interectivedev-13c7.restdb.io/rest/contact",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        var username = document.getElementById("UserName").value;
        var password= document.getElementById("Password").value;
        let login = false;
        for (let i = 0; i < response.length; i++) {
          const element = response[i];
          const xName = element.xName;
          const xPassword = element.xPassword;
          sessionStorage.setItem("id",element._id);
          sessionStorage.setItem("Name",element.xName);
          sessionStorage.setItem("Email",element.xEmail);
          sessionStorage.setItem("Password",element.xPassword);
          if(username == xName && password == xPassword)
          {
            login = true;
            location.href = "home2.html";
          }
        }
        if (login == false) {
        }
      });
    }
    
  })
function myFunction3() {
  document.getElementById("demo").innerHTML = "Hello Dear Visitor! Thank you for sending the email I wil get back to you shortly </br>"}
    
function sendEmail() 
    {
        window.location = "mailto:BetaID.NP@gmail.com?subject=Important! From Music website";
    }
  