// drawChart
function drawChart(id, data) {
  function getData(data) {}

  var chartData = google.visualization.arrayToDataTable(data);

  var options = {
    title: "차트",
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(document.getElementById(id));

  chart.draw(chartData, options);
}
/*
function readXLSX(fileName) {
  fetch(fileName)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((res) => {
      console.log("file:", res);
      var workbook = XLSX.read(res, {
        type: "binary",
      });
    });
}
*/

function readXLSX(fileName) {
  let data = {
    arr: [],
    len: 0,
  };

  fetch(fileName)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((res) => {
      let workbook;
      workbook = XLSX.read(new Uint8Array(res), {
        type: "array",
      });

      let tempArr = [];
      for (let i in workbook.Sheets.Sheet1) {
        tempArr.push(workbook.Sheets.Sheet1[String(i)].w);
      }
      tempArr.shift();

      for (let i = 0; i < tempArr.length; i++) {
        let c = String(tempArr[i])[0];
        if ("A" <= c && c <= "Z") {
          data["len"] += 1;
        } else {
          break;
        }
      }

      parseData(tempArr, data);

      function parseData(dataArr, data) {
        let length = dataArr.length;
        let contentsNum = data.len;
        let dataStack = [];

        for (let i = 0; i < contentsNum; i++) {
          dataStack.push(dataArr[i]);
        }
        data["arr"].push(dataStack);
        dataStack = [];

        for (let i = contentsNum; i < length; i++) {
          dataStack.push(Number(dataArr[i]));

          if (i % contentsNum == contentsNum - 1) {
            data["arr"].push(dataStack);
            dataStack = [];
          }
        }
      }
    });

  return data;
}

function makeChart(idName, material) {
  function setData(material) {
    /*
    if (dataObject.arr.includes(material)) {
      console.log("yes");
    } else {
      console.log("noooo");
    }
    */
    //let newData = [];
    //for ()
  }
  setData();

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(function () {
    drawChart(idName, dataObject.arr);
  });
}

let dataObject = readXLSX("tt.xlsx");
console.log(Array.isArray(dataObject.arr));
makeChart("curve_chart", "Hello");
makeChart("curve_chart1", 0);
