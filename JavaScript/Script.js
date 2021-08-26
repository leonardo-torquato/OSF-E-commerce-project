//email validation
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validate() {
  const $result = $("#validationcheck");
  const email = $("#email").val();
  $result.text("");
  if (validateEmail(email)) {
    $result.text("this email is valid!");
    $result.css("color", "green");
  } else {
    $result.text("this email is not valid");
    $result.css("color", "red");
  }
  if (email == ""){
    $result.text("");
  }
  return false;
}
$("#email").on("input", validate);

//password visibility
$("#togglepassword").click(function visible() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  });

//current year copyright
$('#copyright').html("<p> &copy; Copyright "+ new Date().getFullYear() + "<br> All Rights Reserved.</p>");
  