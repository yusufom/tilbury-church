const month = JSON.parse($("#month").val());
console.log(month);
!(function (l) {
  "use strict";
  function r() {}
  (r.prototype.respChart = function (r, o, e, a) {
    (Chart.defaults.global.defaultFontColor = "#8791af"),
      (Chart.defaults.scale.gridLines.color = "rgba(166, 176, 207, 0.1)");
    var t = r.get(0).getContext("2d"),
      n = l(r).parent();
    function i() {
      r.attr("width", l(n).width());
      switch (o) {
        case "Line":
          new Chart(t, { type: "line", data: e, options: a });
          break;
        case "Doughnut":
          new Chart(t, { type: "doughnut", data: e, options: a });
          break;
        case "Pie":
          new Chart(t, { type: "pie", data: e, options: a });
          break;
        case "Bar":
          new Chart(t, { type: "bar", data: e, options: a });
          break;
        case "Radar":
          new Chart(t, { type: "radar", data: e, options: a });
          break;
        case "PolarArea":
          new Chart(t, { data: e, type: "polarArea", options: a });
      }
    }
    l(window).resize(i), i();
  }),
    (r.prototype.init = function () {
      this.respChart(
        l("#lineChart"),
        "Line",
        {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Booking Payment Analytics",
              fill: !0,
              lineTension: 0.5,
              backgroundColor: "rgba(85, 110, 230, 0.2)",
              borderColor: "rgb(224,71,107)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0,
              borderJoinStyle: "miter",
              pointBorderColor: "#556ee6",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#556ee6",
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [month[0], month[1], month[2], month[3], month[4], month[5], month[6], month[7], month[8], month[9], month[10], month[11]],
            },
          ],
        },
        { scales: { yAxes: [{ ticks: { max: 100, min: 2, stepSize: 10 } }] } }
      );
    }),
    (l.ChartJs = new r()),
    (l.ChartJs.Constructor = r);
})(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.ChartJs.init();
  })();
