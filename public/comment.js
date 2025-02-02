$("#alert-success").hide(500);

$(".addComment").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const comment = $("#comment").val();
  const occupation = $("#occupation").val();

  $(".addComment").ajaxSubmit({
    data: { name, comment, occupation },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#comment").val("");
          $("#occupation").val("");
          $("#logo").val("");

          $("#alert-success").html("Your Comment has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteComment").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/comment/deleteComment/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".addRoom").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const bedType = $("#bedType").val();
  const hotel = $("#hotel").val();
  const maxUser = $("#maxUser").val();
  const price = $("#price").val();
  const discount = $("#discount").val();
  const facilities = $("#facilities").val();
  const additionRoom = $("#availableRoom").val();

  $(".addRoom").ajaxSubmit({
    data: {
      name,
      bedType,
      price,
      discount,
      additionRoom,
      facilities,
      maxUser,
    },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#additionRoom").val("");
          $("#bedType").val("");
          $("#maxUser").val("");
          $("#price").val("");
          $("#discount").val("");
          $("#facilities").val("");

          $("#alert-success").html("Your Donation has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".addManifestRoom").submit(function (e) {
  e.preventDefault();

  const serialNumber = $("#serialNumber").val();
  const type = $("#type").val();

  $(".addManifestRoom").ajaxSubmit({
    data: {
      serialNumber,
      type,
    },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#serialNumber").val("");
          $("#type").val("");
          $("#alert-success").html("Your Donation has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteRoom").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/room/deleteRoom/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".deleteManifestRoom").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/manageManifestRoom/deleteManifestRoom/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".addReview").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const comment = $("#comment").val();
  const occupation = $("#occupation").val();
  const hotel = $("#hotel").val();

  $(".addReview").ajaxSubmit({
    data: { name, hotel, comment, occupation },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#comment").val("");
          $("#occupation").val("");
          $("#hotel").val("");
          $("#logo").val("");

          $("#alert-success").html("Your Comment has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteReview").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/review/deleteReview/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".addBooking").submit(function (e) {
  e.preventDefault();

  const serialNumber = $("#serialNumber").val();
  const roomNumber = $("#roomNumber").val();
  const guestName = $("#guestName").val();
  const receiptNumber = $("#receiptNumber").val();
  const roomRate = $("#roomRate").val();
  const arrivalDate = $("#arrivalDate").val();
  const departureDate = $("#departureDate").val();
  const arr = $("#arr").val();
  const datePd = $("#datePd").val();
  const tax = $("#tax").val();
  const cash = $("#cash").val();
  const pos = $("#pos").val();
  const bankTransfer = $("#bankTransfer").val();
  const source = $("#source").val();

  $(".addBooking").ajaxSubmit({
    data: {
      serialNumber,
      roomNumber,
      guestName,
      receiptNumber,
      roomRate,
      arrivalDate,
      departureDate,
      pos,
      arr,
      datePd,
      tax,
      cash,
      bankTransfer,
      source,
    },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#serialNumber").val("");
          $("#roomNumber").val("");
          $("#guestName").val("");
          $("#receiptNumber").val("");
          $("#roomRate").val("");
          $("#arrivalDate").val("");
          $("#departureDate").val("");
          $("#arr").val("");
          $("#datePd").val("");
          $("#tax").val("");
          $("#cash").val("");
          $("#pos").val("");
          $("#bankTransfer").val("");
          $("#source").val("");

          window.location.href = "/admin/manageBooking";

          $("#alert-success").html("Your Booking has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteBooking").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/booking/deleteBooking/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".addFacilities").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const comment = $("#comment").val();
  const hotel = $("#hotel").val();

  $(".addFacilities").ajaxSubmit({
    data: { name, comment, hotel },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#comment").val("");
          $("#hotel").val("");
          $("#logo").val("");

          $("#alert-success").html("Your Hotel has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteFacilities").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/facilities/deleteFacilities/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});

$(".addUser").submit(function (e) {
  e.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();
  const role = $("#role").val();
  const office = $("#office").val();

  $(".addUser").ajaxSubmit({
    data: { email, password, office, role },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#comment").val("");
          $("#hotel").val("");
          $("#logo").val("");
          $("#office").val("");

          $("#alert-success").html("New User has been Successfully Added");
          $("#alert-success").show(300);
          setTimeout(() => {
            $("#alert-success").hide(500);
          }, 3000);
        }
      }
    },
  });
  return false;
});

$(".deleteUser").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/user/deleteUser/${id}`,
    data: {
      id,
    },
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#" + id).remove();
        }
      }
    },
  });
});
