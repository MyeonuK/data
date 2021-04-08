function readXLSX(fileName) {
  let data = {};

  fetch(fileName)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((res) => {
      let workbook;
      workbook = XLSX.read(new Uint8Array(res), {
        type: "array",
      });

      for (let sheetName in workbook.Sheets) {
        data[sheetName] = {};
        data[sheetName]["len"] = 0;

        let tempArr = [];
        for (let cell in workbook.Sheets[sheetName]) {
          tempArr.push(workbook.Sheets[sheetName][cell].w);
        }
        tempArr.shift();

        // count number of column -> data[sheetName]["len"]
        let len = tempArr.length;
        for (let l = 0; l < len; l++) {
          let c = tempArr[l][0];
          if ("A" <= c && c <= "Z") {
            data[sheetName]["len"] += 1;
          } else {
            break;
          }
        }

        function parseData(sheet, dataArr, object) {
          let contentsNum = object[sheet]["len"];
          let length = dataArr.length;
          let dataStack = [];
          object[sheet]["arr"] = [];
          object[sheet]["arr"].push(dataArr.splice(0, contentsNum));

          for (let i = contentsNum; i < length; i++) {
            dataStack.push(Number(dataArr[i]));

            if (i % contentsNum == contentsNum - 1) {
              object[sheet]["arr"].push(dataStack);
              dataStack = [];
            }
          }
        }

        parseData(sheetName, tempArr, data);
      }
    });

  function creatNavItem(d) {
    let nav = document.getElementById("material_list");
    let newItem = document.createElement("li");

    //for ()
    newItem.innerItem;
  }

  //console.log(data);
  //console.log(Object.keys(data));
  return data;
}
/*
function handleOnChange(e) {
  const material = e.value;
  if (material != "Init") {
    makeChartSet(material);
    changeDescription(material);
  }
}
*/
function chooseMaterial() {
  makeChartSet("XLPE");
}

function makeChartSet(material) {
  let titlesArr = Object.keys(dataObject);
  console.log(titlesArr);
  let sortedData = [];

  for (let t in titlesArr) {
    let title = titlesArr[t];
    let length = dataObject[title]["arr"].length;
    let materialIndex = dataObject[title]["arr"][0].indexOf(material);
    let tempArr = [];
    sortedData = [];
    console.log(title);

    switch (title) {
      case "Time_Trace":
        for (let i = 0; i < length; i++) {
          tempArr = [];
          tempArr.push(dataObject[title]["arr"][i][0]);
          tempArr.push(dataObject[title]["arr"][i][1]);
          tempArr.push(dataObject[title]["arr"][i][materialIndex]);
          sortedData.push(tempArr);
        }
        break;
      default:
        for (let i = 0; i < length; i++) {
          tempArr = [];
          tempArr.push(dataObject[title]["arr"][i][0]);
          tempArr.push(dataObject[title]["arr"][i][materialIndex]);
          sortedData.push(tempArr);
        }
        break;
    }
    console.log(typeof title);
    console.log(title);
    console.log(sortedData);

    makeChart(title, sortedData);
  }
}
function makeChart(id, data) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(function () {
    drawChart(id, data);
  });
}
// drawChart
function drawChart(id, data) {
  var chartData = google.visualization.arrayToDataTable(data);

  var options = {
    title: id,
    hAxis: { minValue: -0.1, maxValue: 2.65 },
    curveType: "function",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(document.getElementById(id));

  chart.draw(chartData, options);
}

function changeDescription(material) {
  desObject = {
    Micaplate: "micaplate description",
    "Press board": "press board description",
    Polymer: "polymer description",
    Xlpe: "xlpe description",
    Teflon: "teflon description",
    Normax: "normax description",
    Kraft: "kraft description",
    Pvc: "pvc description",
    Micaphaper: "micaphaper description",
    Plastic: "plastic description",
  };

  let p = document.getElementById("description");
  let c = document.getElementById("description_div");
  p.removeChild(c);

  let newDiv = document.createElement("div");
  newDiv.innerHTML = desObject[material];
  newDiv.setAttribute("id", "description_div");
  p.appendChild(newDiv);
}

let dataObject = readXLSX("cchartt.xlsx");
//console.log(Object.keys(dataObject));

makeChartSet("XLPE");
//changeDescription("Nomax");
