$(document).ready(function () {
  $("#eventLocation").change(() => {
    if ($("#eventLocation").val() == "Online") {
      $("#eventVenue").attr("type", "url");
      $("#eventVenue").attr("placeholder", "Please enter the Website URL");
    }
    if ($("#eventLocation").val() == "Offline") {
      $("#eventVenue").attr("type", "text");
      $("#eventVenue").attr(
        "placeholder",
        "Please enter the Location of the Event"
      );
    }
  });


  // $(document).on("click", ".deleteEvent", function (e) {
  //   e.preventDefault();

  //   const target = e.target;
  //   const id = target.id;

  //   const couponId = {
  //     id,
  //   };
  //   const check = confirm("Are you Sure you want to delete the event");
  //   if (check) {
  //     $.ajax({
  //       url: `/user/deleteEvent`,
  //       data: couponId,
  //       method: "post",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function (response) {
  //         toastr.options.progressBar = true;
  //         toastr.success("Event has been deleted Successfully!!!!", "Success", {
  //           timeOut: 2000,
  //         });
  //         $("#" + id).remove();
  //       },
  //     });
  //   }
  // });

  


  // $(document).on("click", ".readMessage", function (e) {
  //   e.preventDefault();

  //   const target = e.target;
  //   const id = target.id;

  //   const messageId = {
  //     id,
  //   };

  //   $.ajax({
  //     url: `/user/readMessage`,
  //     data: messageId,
  //     method: "post",
  //     contentType: "application/x-www-form-urlencoded",
  //     success: function (response) {
  //       const from = response.from;
  //       const message = from.saveMessage;
  //       $("#a" + id).remove();
  //       let totalActive = Number($("#counter").val());
  //       if (totalActive - 1 < 1) {
  //         $("#messageCount").remove();
  //         $("#" + id).css("background", "#eff2f7");
  //       } else {
  //         $("#counter").val(totalActive - 1);
  //         $("#messageCount").html(totalActive - 1);
  //         $("#" + id).css("background", "#eff2f7");
  //       }
  //     },
  //   });
  // });

  // $(document).on("click", ".deleteMessage", function (e) {
  //   e.preventDefault();

  //   const target = e.target;

  //   const id = target.id;

  //   const question = confirm("Are you sure you want to delete this");
  //   if (question) {
  //     const couponId = {
  //       id,
  //     };

  //     $.ajax({
  //       url: `/user/deleteMessage`,
  //       data: couponId,
  //       method: "post",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function (response) {
  //         const from = response.from;
  //         const allMessage = from.actualMessage;
  //         let totalActive = Number($("#counter").val());
  //         if (allMessage.read !== true) {
  //           $("#" + id).remove();
  //           $("#a" + id).remove();
  //           $("#messageCount").html(totalActive - 1);
  //           $("#counter").val(totalActive - 1);
  //           toastr.options.progressBar = true;
  //           toastr.success(
  //             `Your Message has been deleted Successfully!!!!`,
  //             "Success",
  //             {
  //               timeOut: 2000,
  //             }
  //           );
  //         } else {
  //           $("#" + id).remove();
  //           toastr.options.progressBar = true;
  //           toastr.success(
  //             `Your Message has been deleted Successfully!!!!`,
  //             "Success",
  //             {
  //               timeOut: 2000,
  //             }
  //           );
  //         }
  //       },
  //     });
  //   }
  // });

  // $(document).on("click", ".deleteAccount", function (e) {
  //   e.preventDefault();

  //   const target = e.target;

  //   const id = target.id;

  //   const question = confirm("Are you sure you want to delete this");
  //   if (question) {
  //     const couponId = {
  //       id,
  //     };

  //     $.ajax({
  //       url: `/user/deleteUser`,
  //       data: couponId,
  //       method: "post",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function (response) {
  //         const from = response.from;
  //           $("#" + id).remove();
  //           toastr.options.progressBar = true;
  //           toastr.success(
  //             `User has been deleted Successfully!!!!`,
  //             "Success",
  //             {
  //               timeOut: 2000,
  //             }
  //           );
  //         }
  //     });
  //   }
  // });

  // $(document).on("click", ".deleteListing", function (e) {
  //   e.preventDefault();

  //   const target = e.target;

  //   const id = target.id;

  //   const question = confirm("Are you sure you want to delete this");
  //   if (question) {
  //     const couponId = {
  //       id,
  //     };

  //     $.ajax({
  //       url: `/user/deleteListing`,
  //       data: couponId,
  //       method: "post",
  //       contentType: "application/x-www-form-urlencoded",
  //       success: function (response) {
  //         const from = response.from;
  //           $("#" + id).remove();
  //           toastr.options.progressBar = true;
  //           toastr.success(
  //             `Listing has been deleted Successfully!!!!`,
  //             "Success",
  //             {
  //               timeOut: 2000,
  //             }
  //           );
  //         }
  //     });
  //   }
  // });

  $("#changePassword").submit((e) => {
    e.preventDefault();

    if ($("#currentPassword").val() === $("#newPassword").val()) {
      toastr.options.progressBar = true;
      toastr.error(
        "Old Password Cannot be the same with New Password",
        "ERROR",
        { timeOut: 2000 }
      );

      setTimeout(() => {
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
        $("#changePassword :input").prop("disabled", false);
        $("#changePassword :button").prop("disabled", false);
      }, 3000);
    } else if ($("#confirmPassword").val() !== $("#newPassword").val()) {
      toastr.options.progressBar = true;
      toastr.error(
        "Confirm Password is not the same with new password",
        "ERROR",
        { timeOut: 2000 }
      );
      setTimeout(() => {
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
        $("#changePassword :input").prop("disabled", false);
        $("#changePassword :button").prop("disabled", false);
      }, 3000);
    } else {
      const damilare = {
        oldPassword: $("#currentPassword").val(),
        newPassword: $("#newPassword").val(),
        id: $("#id").val(),
      };

      $("#changePassword :input").prop("disabled", true);
      $("#changePassword :button").prop("disabled", true);

      function pageRedirect() {
        window.location.href = `#hello`;
      }

      pageRedirect();
      $.ajax({
        url: `/user/changePassword`,
        data: damilare,
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          const from = response.from;
          const status = from.status;
          if (status == "200") {
            toastr.options.progressBar = true;
            toastr.success(
              "Your password has been changed Successfully!!!!",
              "Success",
              { timeOut: 2000 }
            );

            setTimeout(() => {
              $("#changePassword :input").prop("disabled", false);
              $("#changePassword :button").prop("disabled", false);
              $("#currentPassword").val("");
              $("#newPassword").val("");
              $("#confirmPassword").val("");
            }, 3000);
          }

          if (status == "400") {
            toastr.options.progressBar = true;
            toastr.error("Old Password is not Correct", "ERROR", {
              timeOut: 2000,
            });

            setTimeout(() => {
              $("#changePassword :input").prop("disabled", false);
              $("#changePassword :button").prop("disabled", false);
              $("#currentPassword").val("");
              $("#newPassword").val("");
              $("#confirmPassword").val("");
            }, 3000);
          }
        },
      });
    }
  });
});
