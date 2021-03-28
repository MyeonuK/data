//const xlsx = require("xlsx");
//let workbook = xlsx.readFile("tt.xlsx");

/*
let worksheet = workbook.Sheets["Sheet1"];

let dataArr = [];
let data = [];
let count = 0;

for (let i in worksheet) {
  data.push(worksheet[i]["w"]);
}
data.shift();

let length = data.length;
let tempArr = [];
for (let i = 0; i < length; i++) {
  tempArr.push(data[i]);

  if (i % 3 == 2) {
    dataArr.push(tempArr);
    tempArr = [];
  }
}*/

/*
function drawChart() {
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
  ////

  var options = {
    title: "차트",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );

  chart.draw(data, options);
}
*/
//console.log(dataArr);
//google.charts.load("current", { packages: ["corechart"] });
//google.charts.setOnLoadCallback(drawChart);
//drawChart();

/*
fetch("tt.xlsx")
  .then((res) => res)
  .then((res) => {
    // data를 응답 받은 후의 로직
    console.log(res[1]);
  });
*/

let workbook;
fetch("tt.xlsx")
  .then((res) => {
    return res.arrayBuffer();
  })
  .then((res) => {
    console.log("file:", res);
    workbook = XLSX.read(new Uint8Array(res), {
      type: "array",
    });
    console.log(workbook);
    console.log(workbook["Sheets"]["Sheet1"]["A1"]["w"]);
    for (let i in workbook["Sheets"]["Sheet1"]) {
      let temp = String(i);
      //console.log(temp);
      console.log(workbook["Sheets"]["Sheet1"][temp]["w"]);
    }
  });

/*
let workbook;
fetch("tt.xlsx")
  .then((res) => res)
  .then((res) => {
    // data를 응답 받은 후의 로직
    //console.log(res[1]);
    workbook = XLSX.readFile(res);
  });
*/
function parseData(workbook) {
  //workbook["Sheets"]["Sheet1"].shift();
  console.log(JSON.parse(workbook));
  /*
  for (let i in workbook["Sheets"]["Sheet1"]) {
    console.log(typeof i);
    break;
  }
  */
}
