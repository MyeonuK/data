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

  return data;
}

function chooseMaterial(e) {
  changeDescription(e);
  changeChartSet(e);
}

function changeDescription(material) {
  /*
  let keyword = {
    "Mica plate": "Mica",
    Pressboard: "Pressboard",
    Polymer: "Polymer",
    XLPE: "Corss-linked_polyethylene",
    Teflon: "Polytetrafluoroethylene",
    Nomax: "Nomad",
    "Kraft paper": "Kraft_paper",
    PVC: "Polyvinyl_chloride",
    "Mica paper": "Mica",
    Plastic: "Plastic",
  };
*/
  let desObject = {
    "Mica plate":
      'Micas are a group of minerals whose outstanding physical characteristic is that individual mica crystals can easily be split into extremely thin elastic plates. This characteristic is described as perfect basal cleavage. Mica is common in igneous and metamorphic rock and is occasionally found as small flakes in sedimentary rock. It is particularly prominent in many granites, pegmatites, and schists, and "books" (large individual crystals) of mica several feet across have been found in some pegmatites.',
    Pressboard:
      "Pressboard is a class of cellulose-based material constructed of several layers (plies) of paper which, when compressed using a combination of heat and pressure, form a stiff, dense material in a range of weights. Pressboard has been widely used in traditional school and office products such as spiral-bound notebooks and three-ring binders, but its unique physical characteristics lend itself readily to a variety of end-uses, including (but not limited to) document storage, filing supplies (classification and file folders), report covers, folding cartons, tags, labels, and industrial applications. It is commonly used to make the back panels of radios and some televisions. Pressboard may be converted using a number of different techniques (scoring, folding, die-cutting), and accepts a range of value-add decorating techniques (coating, foil-stamping, screen-printing, and embossing). Pressboard may contain recycled fiber content (including post-consumer waste), and is typically itself recyclable and biodegradable, making it an environmentally-sound choice for those seeking an alternative to petroleum-derived substrates.",
    Polymer:
      'A polymer (/ˈpɒlɪmər/; Greek poly-, "many" + -mer, "part") is a substance or material consisting of very large molecules, or macromolecules, composed of many repeating subunits. Due to their broad spectrum of properties, both synthetic and natural polymers play essential and ubiquitous roles in everyday life. Polymers range from familiar synthetic plastics such as polystyrene to natural biopolymers such as DNA and proteins that are fundamental to biological structure and function. Polymers, both natural and synthetic, are created via polymerization of many small molecules, known as monomers. Their consequently large molecular mass, relative to small molecule compounds, produces unique physical properties including toughness, high elasticity, viscoelasticity, and a tendency to form amorphous and semicrystalline structures rather than crystals.',
    XLPE:
      "Cross-linked polyethylene, commonly abbreviated PEX, XPE or XLPE, is a form of polyethylene with cross-links. It is used predominantly in building services pipework systems, hydronic radiant heating and cooling systems, domestic water piping, and insulation for high tension (high voltage) electrical cables. It is also used for natural gas and offshore oil applications, chemical transportation, and transportation of sewage and slurries. PEX is an alternative to polyvinyl chloride (PVC), chlorinated polyvinyl chloride (CPVC) or copper tubing for use as residential water pipes.",
    Teflon:
      "Polytetrafluoroethylene (PTFE) is a synthetic fluoropolymer of tetrafluoroethylene that has numerous applications. The commonly known brand name of PTFE-based formulas is Teflon by Chemours, a spin-off from DuPont, which originally discovered the compound in 1938.",
    Nomax: "none",
    "Kraft paper":
      "Kraft paper or kraft is paper or paperboard (cardboard) produced from chemical pulp produced in the kraft process.\nSack kraft paper, or just sack paper, is a porous kraft paper with high elasticity and high tear resistance, designed for packaging products with high demands for strength and durability.",
    PVC:
      "Polyvinyl chloride (colloquial: polyvinyl, vinyl; abbreviated: PVC) is the world's third-most widely produced synthetic plastic polymer (after polyethylene and polypropylene). About 40 million tons of PVC are produced each year.",
    "Mica paper":
      'Micas are a group of minerals whose outstanding physical characteristic is that individual mica crystals can easily be split into extremely thin elastic plates. This characteristic is described as perfect basal cleavage. Mica is common in igneous and metamorphic rock and is occasionally found as small flakes in sedimentary rock. It is particularly prominent in many granites, pegmatites, and schists, and "books" (large individual crystals) of mica several feet across have been found in some pegmatites.',
    Plastic:
      "Plastics are a wide range of synthetic or semi-synthetic materials that use polymers as a main ingredient. Their plasticity makes it possible for plastics to be moulded, extruded or pressed into solid objects of various shapes. This adaptability, plus a wide range of other properties, such as being light weight, durable flexible, and inexpensive to produce, has led to its widespread use. Plastics typically are made through human industrial systems. Most modern plastics are derived from fossil fuel based petrochemicals like natural gas or petroleum; however, recent industrial methods use variants made from renewable materials, such as corn or cotton derivatives.",
  };

  let contentDiv = document.getElementById("content");
  contentDiv.removeChild(document.getElementById("title"));

  let detailDiv = document.getElementById("detail");
  detailDiv.removeChild(document.getElementById("description"));

  let descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = `<div><p>${desObject[material]}</p></div>`;
  descriptionDiv.setAttribute("class", "description");
  descriptionDiv.setAttribute("id", "description");
  detailDiv.prepend(descriptionDiv);

  let title = document.createElement("h1");
  title.innerHTML = `${material}`;
  title.setAttribute("id", "title");
  contentDiv.prepend(title);
}

function changeChartSet(material) {
  let titlesArr = Object.keys(dataObject);
  let sortedData = [];

  for (let t in titlesArr) {
    let title = titlesArr[t];
    let length = dataObject[title]["arr"].length;
    let materialIndex = dataObject[title]["arr"][0].indexOf(material);
    let tempArr = [];
    sortedData = [];

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
    chartArea: { width: "70%", height: "80%" },
    title: id,
    titleTextStyle: { color: "white" },
    backgroundColor: "#1b1b1b",
    hAxis: { minValue: -0.1, maxValue: 2.65, textStyle: { color: "white" } },
    vAxis: { textStyle: { color: "white" } },
    legend: { position: "bottom", textStyle: { color: "white" } },
    curveType: "function",
    series: {
      0: { color: "#fffd7d" },
    },
    crosshair: { trigger: "both" },
  };

  var myDocument = document.getElementById(id);
  myDocument.parentElement.style.display = "block";
  var chart = new google.visualization.LineChart(myDocument);

  chart.draw(chartData, options);
}

let dataObject = readXLSX("cchartt.xlsx");
