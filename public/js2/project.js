$(".deleteProject").click((e) => {
  e.preventDefault();
  const target = e.target;
  const id = target.id;

  $.ajax({
    url: `/admin/deleteProject/${id}`,
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

$("#alert-success").hide(500);

$(".addProject").submit(function (e) {
  e.preventDefault();

  const name = $("#name").val();
  const note = $("#note").val();

  $(".addProject").ajaxSubmit({
    data: { name, note },
    contentType: "application/json",
    success: function (response) {
      if (response) {
        const comming = response.from;
        if (comming.status == "200") {
          $("#name").val("");
          $("#note").val("");
          $("#image").val("");

          $("#alert-success").html("Your Service has been Successfully Added");
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
