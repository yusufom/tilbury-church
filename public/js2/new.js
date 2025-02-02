$("#alert-success").hide();
$("#alert-danger").hide();

$(document).ready(function () {
  $(".deletePartners").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/partners/deletePartners/${id}`,
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

  $(".deleteJob").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/job/deleteJob/${id}`,
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

  $(".deleteResturant").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/resturant/deleteResturant/${id}`,
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

  $(".deleteEvent").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/deleteEvent/${id}`,
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

  $(".deleteHotel").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/deleteHotel/${id}`,
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

  $(".deleteMessage").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/message/deleteMessage/${id}`,
      data: {
        id,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            window.location.replace(`/admin/message`);
          }
        }
      },
    });
  });

  $(".readMessage").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/message/readMessage/${id}`,
      data: {
        id,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $(`.read${id}`).hide(300);
          }
        }
      },
    });
  });

  $(".profile").submit((e) => {
    e.preventDefault();

    $.ajax({
      url: `/admin/profile`,
      data: {
        companyName: $("#companyName").val(),
        companyCaption: $("#companyCaption").val(),
        videoLink: $("#videoLink").val(),
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#alert-success").html(
              "Your Setting has been Successfully Saved"
            );
            $("#alert-success").show(300);
            setTimeout(() => {
              $("#alert-success").hide(500);
            }, 5000);
          }
        }
      },
    });
  });

  $(".changePassword").submit((e) => {
    e.preventDefault();

    if ($("#oldPassword").val() == $("#newPassword").val()) {
      $("#alert-danger").html("Please Old Password Cannot be new Password");
      $("#alert-danger").show(300);
      setTimeout(() => {
        $("#alert-danger").hide(500);
      }, 3000);
    }
    if ($("#confirmPassword").val() != $("#newPassword").val()) {
      $("#alert-danger").html("New password is not equal to confirm password");
      $("#alert-danger").show(300);
      setTimeout(() => {
        $("#alert-danger").hide(500);
      }, 3000);
    }

    if ($("#confirmPassword").val() == $("#newPassword").val()) {
      $.ajax({
        url: `/admin/changePassword`,
        data: {
          newPassword: $("#confirmPassword").val(),
          oldPassword: $("#oldPassword").val(),
        },
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response) {
            const comming = response.from;
            if (comming.status == "200") {
              $("#alert-success").html(
                "Your Password has been changed Successfully"
              );
              $("#alert-success").show(300);
              setTimeout(() => {
                $("#alert-success").hide(500);
              }, 3000);
            }
            if (comming.status == "500") {
              $("#alert-danger").html(`${comming.text}`);
              $("#alert-danger").show(300);
              setTimeout(() => {
                $("#alert-danger").hide(500);
              }, 3000);
            }
          }
        },
      });
    }
  });

  $(".deleteGallery").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;
    console.log(id);

    $.ajax({
      url: `/admin/deleteGallery/${id}`,
      data: {
        id,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#" + id + "a").remove();
          }
        }
      },
    });
  });
  $(".deletePostPicture").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/deletePostPicture/${id}`,
      data: {
        id,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#" + id + "a").remove();
          }
        }
      },
    });
  });

  $(".deletePost").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/deletePost/${id}`,
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


  $(".deleteFacilities").click((e) => {
    e.preventDefault();
    const target = e.target;
    const id = target.id;

    $.ajax({
      url: `/admin/deleteFacilities/${id}`,
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

  $(".profile1").submit((e) => {
    e.preventDefault();

    $.ajax({
      url: `/admin/social`,
      data: {
        facebook: $("#facebook").val(),
        instagram: $("#instagram").val(),
        twitter: $("#twitter").val(),
        whatsapp: $("#whatsapp").val(),
        email: $("#email").val(),
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#alert-success").html(
              "Your Setting has been Successfully Saved"
            );
            $("#alert-success").show(300);
            setTimeout(() => {
              $("#alert-success").hide(500);
            }, 5000);
          }
        }
      },
    });
  });

  $(".profile2").submit((e) => {
    e.preventDefault();

    $.ajax({
      url: `/admin/information`,
      data: {
        vision: $("#vision").val(),
        about: $("#about").val(),
        mission: $("#mission").val(),
        projectCounter: $("#projectCounter").val(),
        donorCounter: $("#donorCounter").val(),
        volunteerCounter: $("#volunteerCounter").val(),
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#alert-success").html(
              "Your Setting has been Successfully Saved"
            );
            $("#alert-success").show(300);
            setTimeout(() => {
              $("#alert-success").hide(500);
            }, 5000);
          }
        }
      },
    });
  });

  $(".editVolunteer").submit(function (e) {
    e.preventDefault();
    const id = $("#damicode").val();
    if ($("#whatsapp").val().length < "11") {
      $("#alert-danger").html("Please whatsapp number must be 11 character");
      $("#alert-danger").show(300);
      setTimeout(() => {
        $("#alert-danger").hide(500);
      }, 3000);
    } else {
      if ($("#image").val() == "") {
        $.ajax({
          url: `/admin/editVolunteerText/${id}`,
          data: {
            name: $("#name").val(),
            position: $("#position").val(),
            facebook: $("#facebook").val(),
            instagram: $("#instagram").val(),
            twitter: $("#twitter").val(),
            whatsapp: $("#whatsapp").val(),
            email: $("#email").val(),
          },
          method: "POST",
          contentType: "application/x-www-form-urlencoded",
          success: function (response) {
            if (response) {
              const comming = response.from;
              if (comming.status == "200") {
                $("#alert-success").html(
                  "Your Volunteer has been Successfully Updated"
                );
                $("#alert-success").show(300);
                setTimeout(() => {
                  $("#alert-success").hide(500);
                }, 5000);
              }
            }
          },
        });
      } else {
        const name = $("#name").val();
        const position = $("#position").val();
        const facebook = $("#facebook").val();
        const instagram = $("#instagram").val();
        const twitter = $("#twitter").val();
        const whatsapp = $("#whatsapp").val();
        const email = $("#email").val();

        $(this).ajaxSubmit({
          data: {
            name: $("#name").val(),
            position: $("#position").val(),
            facebook: $("#facebook").val(),
            instagram: $("#instagram").val(),
            twitter: $("#twitter").val(),
            whatsapp: $("#whatsapp").val(),
            email: $("#email").val(),
          },
          contentType: "application/json",
          success: function (response) {
            if (response) {
              const comming = response.from;
              if (comming.status == "200") {
                $("#alert-success").html(
                  "Your Volunteer has been Successfully Updated"
                );
                $("#alert-success").show(300);
                setTimeout(() => {
                  $("#alert-success").hide(500);
                  window.location.replace(`/admin/editVolunteer/${id}`);
                }, 3000);
              }
            }
          },
        });
      }
      return false;
    }
  });

  $(".saveProject").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: `/admin/editproject/${$("#id").val()}`,
      data: {
        projectName: $("#projectName").val(),
        goal: $("#goal").val(),
        duration: $("#duration").val(),
        note: $("#note").val(),
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#alert-success").html(
              "Your Changes has been Successfully Updated"
            );
            $("#alert-success").show(300);
            setTimeout(() => {
              $("#alert-success").hide(500);
            }, 5000);
          }
        }
      },
    });
    return false;
  });

  $(".contact-form").submit(function (e) {
    e.preventDefault();

    $.ajax({
      url: `/message`,
      data: {
        name: $("#name").val(),
        email: $("#email").val(),
        comments: $("#comments").val(),
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#comments").val("");
            $("#name").val("");
            $("#email").val("");
            $("#alert-success").html("Your Message has been Sent Successfully");
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
});
