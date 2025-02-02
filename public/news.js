Dropzone.autoDiscover = false;
$("#alert-success").hide();

const note = $("#note").val();
const title = $("#postTitle").val();
const date = new Date();

var myDropzone = new Dropzone(".dropzone", {
  autoProcessQueue: false,
  parallelUploads: 15,
  sending: (file, xhr, formData) => {
    formData.append("date", date);
  },
});

$("#note").summernote({
  height: 300,
  toolbar: [
    ["style", ["style"]],
    [
      "font",
      [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
        "clear",
      ],
    ],
    ["fontname", ["fontname"]],
    ["fontsize", ["fontsize"]],
    ["color", ["color"]],
    ["para", ["ol", "ul", "paragraph", "height"]],
    ["table", ["table"]],
    ["insert", ["link"]],
    ["view", ["undo", "redo"]],
  ],
});

$("#newPost").click((e) => {
  e.preventDefault();
  if (myDropzone.getQueuedFiles().length < 1) {
    $("#alert-danger").html("Please add a Picture");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if ($("#postTitle").val() == "" || $("#postTitle").val().length < 3) {
    $("#alert-danger").html("Please add Event Title");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if ($("#note").val() == "" || $("#note").val().length < 3) {
    $("#alert-danger").html("Please add Event Note");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if (
    myDropzone.getQueuedFiles().length > 0 &&
    $("#note").val().length > 3 &&
    $("#postTitle").val().length > 3
  ) {
    myDropzone.processQueue();

    $.ajax({
      url: `/admin/addEvent`,
      data: {
        note: $("#note").val(),
        title: $("#postTitle").val(),
        description: $("#description").val(),
        date,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#note").summernote("reset");
            $("#postTitle").val("");
            $("#description").val("");
            $("#date").val("");
            $("#alert-success").html("Your Event has been added Successfully");

            $("#alert-success").show(300);

            myDropzone.on("complete", (file) => {
              setTimeout(() => {
                myDropzone.removeFile(file);
                $("#alert-success").hide(300);
              }, 3000);
            });
          }
        }
      },
    });
  }
});

$("#posts").click((e) => {
  e.preventDefault();
  if (myDropzone.getQueuedFiles().length < 1) {
    $("#alert-danger").html("Please add a Picture");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if (myDropzone.getQueuedFiles().length > 0) {
    myDropzone.processQueue();

    $.ajax({
      url: `/admin/addHotel`,
      data: {
        name: $("#hotelTitle").val(),
        mapLink: $("#mapLink").val(),
        address: $("#address").val(),
        policies: $("#policies").val(),
        description: $("#description").val(),
        date,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#hotelTitle").val("");
            $("#description").val("");
            $("#mapLink").val("");
            $("#address").val("");
            $("#policies").val("");
            $("#phone2").val("");
            $("#alert-success").html("New Sermon has been added Successfully");

            $("#alert-success").show(300);

            myDropzone.on("complete", (file) => {
              setTimeout(() => {
                myDropzone.removeFile(file);
                $("#alert-success").hide(300);
              }, 3000);
            });
          }
        }
      },
    });
  }
});

$("#newPos").click((e) => {
  e.preventDefault();

  if ($("#postTitle").val() == "" || $("#postTitle").val().length < 3) {
    $("#alert-danger").html("Please add Post Title");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if ($("#note").val() == "" || $("#note").val().length < 3) {
    $("#alert-danger").html("Please add Post Note");

    $("#alert-danger").show(300);
    setTimeout(() => {
      $("#alert-danger").hide(300);
    }, 3000);
  }

  if ($("#note").val().length > 3 && $("#postTitle").val().length > 3) {
    myDropzone.processQueue();

    $.ajax({
      url: `/admin/editEvent/${$("#id").val()}`,
      data: {
        note: $("#note").val(),
        title: $("#postTitle").val(),
        date,
      },
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      success: function (response) {
        if (response) {
          const comming = response.from;
          if (comming.status == "200") {
            $("#alert-success").html("Your Post has been updated Successfully");

            $("#alert-success").show(300);
          }
        }
      },
    });
  }
});

$(".addProject").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const note = $("#note").val();

  $(this).ajaxSubmit({
    data: { name, note },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#note").val("");

          $("#alert-success").html("Your Project has been Successfully Added");
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
