$(window).on("load", function () {
  
  AOS.init();

  
    $("#eye").on("click", function (e) {
      $("#eye").toggleClass("bx-hide").toggleClass("bx-show");
      if ($("#eye").hasClass("bx-show")) {
        $("#password").attr("type", "password");
      }
      if ($("#eye").hasClass("bx-hide")) {
        $("#password").attr("type", "text");
      }
    });
  
    $("#signup").submit((e) => {
      e.preventDefault();
      $("#signup :input").prop("disabled", true);
      $("#signup :button").prop("disabled", true);
  
      const data = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      };
  
      if ($("#rememberMe").is(":checked")) {
        $.ajax({
          url: `/register?referral=${$("#referral").val()}`,
          data: data,
          method: "post",
          contentType: "application/x-www-form-urlencoded",
          success: function (response) {
            if (response === "successfully") {
              toastr.options.progressBar = true;
              toastr.success(
                `Your Account has been Successfully Created.`,
                "SUCCESS",
                { timeOut: 3000 }
              );
  
              setTimeout(() => {
                window.location.href = "/activate";
              }, 5000);

            } else if (response == "Unique Username Already Exist") {
              $("#signup :input").prop("disabled", false);
              $("#signup :button").prop("disabled", false);
              toastr.options.progressBar = true;
              toastr.error(`${response}`, "ERROR", { timeOut: 3000 });
            } else {
              $("#signup :input").prop("disabled", false);
              $("#signup :button").prop("disabled", false);
              toastr.options.progressBar = true;
              toastr.error(`${response}`, "ERROR", { timeOut: 3000 });
            }
          },
        });
      } else {
        $("#signup :input").prop("disabled", false);
        $("#signup :button").prop("disabled", false);
        toastr.options.progressBar = true;
        toastr.error(`Please click agree to the term box`, "ERROR", {
          timeOut: 3000,
        });
      }
    });

    $("#forgetPassword").submit((e) => {
      e.preventDefault();
      $("#forgetPassword :input").prop("disabled", true);
      $("#forgetPassword :button").prop("disabled", true);
    
      const data = {
        email: $("#email").val(),
      };
      $.ajax({
        url: `/forget`,
        data: data,
        method: "post",
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response === "successfully") {
            toastr.options.progressBar = true;
            toastr.success(
              `Password Reset Link has been successfully sent to your email`,
              "SUCCESS",
              { timeOut: 3000 }
            );
            $("#email").val("");
            $("#forgetPassword :input").prop("disabled", false);
            $("form :button").prop("disabled", false);
          } else {
            $("#forgetPassword :input").prop("disabled", false);
            $("#forgetPassword :button").prop("disabled", false);
            toastr.options.progressBar = true;
            toastr.error(`Email is not found`, "ERROR", { timeOut: 3000 });
          }
        },
      });
    });

    $("#resetPassword").submit((e) => {
      e.preventDefault();
      $("#resetPassword :input").prop("disabled", true);
      $("#resetPassword :button").prop("disabled", true);
      
      if ($("#newPassword").val() !== $("#retypePassword").val()) {
        toastr.options.progressBar = true;
        toastr.error(
          "New Password is not the same with confirm password",
          "ERROR",
          { timeOut: 2000 }
        );
        setTimeout(() => {
          $("#newPassword").val("");
          $("#retypePassword").val("");
          $("#resetPassword :input").prop("disabled", false);
          $("#resetPassword :button").prop("disabled", false);
        }, 3000);
      } else {
        const damilare = {
          newPassword: $("#newPassword").val(),
          id: $("#string").val(),
        };
        $("#resetPassword :input").prop("disabled", true);
        $("#resetPassword :button").prop("disabled", true);
        $.ajax({
          url: `/resetPasswordd`,
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
                window.location.href = "/login";
              }, 3000);
            }
            if (status == "400") {
              toastr.options.progressBar = true;
              toastr.error("Please Choose Another Password", "ERROR", {
                timeOut: 2000,
              });
              setTimeout(() => {
                $("#resetPassword :input").prop("disabled", false);
                $("#resetPassword :button").prop("disabled", false);
                $("#retypePassword").val("");
                $("#newPassword").val("");
              }, 3000);
            }
            if (status == "350") {
              window.location.href = "/error404";
            }
            if (status == "300") {
              toastr.options.progressBar = true;
              toastr.error("Token Expires", "ERROR", {
                timeOut: 2000,
              });
              setTimeout(() => {
                window.location.href = "/forgetPassword";
              }, 3000);
            }
          },
        });
      }
    })    
})