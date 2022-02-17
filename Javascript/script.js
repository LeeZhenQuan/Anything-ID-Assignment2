
$(document).ready(function () {
  $('#loading').hide();
    const APIKEY = "61d29385ccd0211b3208956e";
    $("#update-contact-container").hide();
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
        "xPostalCode": "Null",
        "xMembershipType": "Null"
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
      });
    });

    //login page
    $(".login").submit(function(e){
      e.preventDefault();
      validation();
    });
    //update membership
    $("#purchase").submit(async function (e) {
      e.preventDefault();
      let memberPlan = true;
      let xName = sessionStorage.getItem("Name");
      let xEmail = sessionStorage.getItem("Email");
      let xPassword = sessionStorage.getItem("Password");
      let xAddress = $("#address").val();
      let xPostalCode= $("#postalcode").val();
      let xCard = $("#card").val()
      let contactId = sessionStorage.getItem("id");
      let xMembershipType = $("#MembershipType").val();
      await updateForm(contactId, xName, xEmail, xPassword, memberPlan, xAddress, xPostalCode, xCard, xMembershipType);
      location.href = "home2.html";
    });
    //update profile unlocked
    $("#unlock-update").click(function(e){
      e.preventDefault();
      $("#xName").attr("disabled",false);
      $("#xEmail").attr("disabled",false);
      $("#xPassword").attr("disabled",false);
      $("#xAddress").attr("disabled",false);
      $("#xPostalCode").attr("disabled",false);
      $("#xCard").attr("disabled",false);
    })
    //loading page will show your profile infor
    $("#update-form div").ready(function(e){
      const form = $("#update-form div")
      form.find("#xName").val(sessionStorage.getItem("Name"));
      form.find("#xEmail").val(sessionStorage.getItem("Email"));
      form.find("#xPassword").val(sessionStorage.getItem("Password"));
      form.find("#xAddress").val(sessionStorage.getItem("Address"));
      form.find("#xPostalCode").val(sessionStorage.getItem("PostalCode"));
      form.find("#xCard").val(sessionStorage.getItem("CreditCard"));
      form.find("#xMemberShipType").val(sessionStorage.getItem("MembershipType"));
      form.find("#xMembership").val(sessionStorage.getItem("memberPlan"))
    })
    $("#update-form").submit(async function(e){
      e.preventDefault();
      let xName = sessionStorage.getItem("Name");
      let xEmail = sessionStorage.getItem("Email");
      let xPassword = sessionStorage.getItem("Password");
      let xMemberPlan = sessionStorage.getItem("memberPlan");
      let xAddress = $("#xAddress").val();
      let xPostalCode= $("#xPostalCode").val();
      let xCard = $("#xCard").val()
      let xMembershipType = sessionStorage.getItem("MembershipType");
      let contactId = sessionStorage.getItem("id");
      await updateForm(contactId, xName, xEmail, xPassword, xMemberPlan, xAddress, xPostalCode, xCard, xMembershipType);
      location.href = "home2.html";
    })
//This Put is for changing membership plan to true
    async function updateForm(id,name, email, password,memberPlan, address,postalcode,card,MembershipType) {
      var jsondata = { 
        "xName": name,
        "xPassword": password,
        "xEmail": email,
        "xMemberPlan": memberPlan,
        "xAddress": address,
        "xCard": card, 
        "xPostalCode": postalcode,
        "xMembershipType": MembershipType
      };
      sessionStorage.setItem("memberPlan",memberPlan);
      sessionStorage.setItem("Address",address);
      sessionStorage.setItem("PostalCode",postalcode);
      sessionStorage.setItem("CreditCard",card);
      sessionStorage.setItem("MembershipType",MembershipType);
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
      return $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
    function showlottie(){
      $('#loading').show();
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
        "beforeSend":showlottie()
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
          if(username == xName && password == xPassword)
          {
            login = true;
            sessionStorage.setItem("id",element._id);
            sessionStorage.setItem("Name",element.xName);
            sessionStorage.setItem("Email",element.xEmail);
            sessionStorage.setItem("Password",element.xPassword);
            sessionStorage.setItem("memberPlan",element.xMemberPlan);
            sessionStorage.setItem("Address",element.xAddress);
            sessionStorage.setItem("PostalCode",element.xPostalCode);
            sessionStorage.setItem("CreditCard",element.xCard);
            sessionStorage.setItem("MembershipType",element.xMembershipType);
            location.href = "home2.html";
          }
        }
        if (login == false) {
          alert("Invalid Username Or Password!");
          location.href="login.html";
        }
      });
    }
  })
function myFunction3() {
  document.getElementById("demo").innerHTML = "Hello Dear Visitor! Thank you for sending the email I wil get back to you shortly </br>"
}
function sendEmail() {
  window.location = "mailto:BetaID.NP@gmail.com?subject=Important! From Music website";
}



  