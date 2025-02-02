$(function () {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;

  $("#txtDate").attr("min", maxDate);
  $("#txtDate2").attr("min", maxDate);
});

$("#roomBooking").submit((e) => {
  e.preventDefault();

  $(".default-btn").prop("disabled", true);
  $("#txtDate").prop("disabled", true);
  $("#txtDate2").prop("disabled", true);
  $("#user").prop("disabled", true);
  $("#room").prop("disabled", true);

  $.ajax({
    url: `/roomBooking/${$("#id").val()}`,
    data: {
      checkIn: $("#txtDate").val(),
      checkOut: $("#txtDate2").val(),
      user: $("#user").val(),
      room: $("#room").val(),
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          toastr.success(
            "Your Reservation is available, Proceed in filling your details"
          );

          $(".checkout-area").show(300);
          window.location.href = "#here";
        } else {
          toastr.error(
            "Date selected is not available, please kindly check another date"
          );
          $(".default-btn").prop("disabled", false);
          $("#txtDate").prop("disabled", false);
          $("#txtDate2").prop("disabled", false);
          $("#user").prop("disabled", false);
          $("#room").prop("disabled", false);
        }
      }
    },
  });
  return false;
});

$("#bookUser").submit((e) => {
  e.preventDefault();
  $("#myBtn").prop("disabled", true);
  $.ajax({
    url: `/bookUser/${$("#id").val()}`,
    data: {
      surname: $("#surname").val(),
      firstName: $("#firstName").val(),
      homeAddress: $("#homeAddress").val(),
      userEmail: $("#userEmail").val(),
      phone: $("#phone").val(),
      company: $("#company").val(),
      country: $("#country").val(),
      state: $("#state").val(),
      checkIn: $("#txtDate").val(),
      checkOut: $("#txtDate2").val(),
      user: $("#user").val(),
      room: $("#room").val(),
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      console.log('reach here');
        const comming = response.from;
         window.location.href = `/result/${comming.status}`;
    },
  });
  return false;
});



$("#makeOrder").submit((e) => {
  e.preventDefault();

  $("#myBtn").prop("disabled", true);
  $.ajax({
    url: `/order/${$("#id").val()}`,
    data: {
      surname: $("#surname").val(),
      firstName: $("#firstName").val(),
      homeAddress: $("#homeAddress").val(),
      hotel: $("#hotel").val(),
      userEmail: $("#userEmail").val(),
      phone: $("#phone").val(),
      country: $("#country").val(),
      plate: $("#plate").val(),
      state: $("#state").val(),
      city: $("#city").val(),
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          toastr.success("Your Food Order Has Been Made Successfully");
          window.location.href = `/order/${$("#id").val()}`
        }
      }
    },
  });
  return false;
});

$("#availability").submit((e) => {
  e.preventDefault();

  const user = $("#user").val();

  window.location.href = `/hotel/${user}`;
});
