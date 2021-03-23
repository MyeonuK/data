let dataArr = [];

function excelExport(event) {
  var input = event.target;
  var reader = new FileReader();
  let tempArr = [];

  reader.onload = function () {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });

    wb.SheetNames.forEach(function (sheetName) {
      let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      tempArr.push(rowObj);
    });

    let length = tempArr[0].length;
    dataArr.push(["Freq", "Reference", "Micaplate"]);
    for (let i = 0; i < length; i++) {
      let ttt = [
        tempArr[0][i]["Freq."],
        tempArr[0][i]["Reference"],
        tempArr[0][i]["Micaplate"],
      ];
      dataArr.push(ttt);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  };
  reader.readAsBinaryString(input.files[0]);
}

function drawChart() {
  console.log("drawChart");
  console.log(dataArr);

  var data = google.visualization.arrayToDataTable(dataArr);
  /*
  let arr = [
    ["Year", "Sales"],
    [2004, 0],
    [2005, 1170],
    [2006, 660],
    [2007, 1030],
  ];
  console.log(arr);
  var data = google.visualization.arrayToDataTable(arr);
  */

  var options = {
    title: "어떡하라는거야",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}
