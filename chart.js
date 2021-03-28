let dataArr = [];

function excelExport(event) {
  var input = event.target;
  var reader = new FileReader();
  let objArr = [];

  reader.onload = function () {
    var fileData = reader.result;
    var wb = XLSX.read(fileData, { type: "binary" });

    wb.SheetNames.forEach(function (sheetName) {
      let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      objArr.push(rowObj);
    });

    let length = objArr[0].length;
    dataArr.push(["Freq", "Reference", "Micaplate"]);
    console.log(objArr[0][0].key);
    for (let i = 0; i < length; i++) {
      let ttt = [
        objArr[0][i]["Freq."],
        objArr[0][i]["Reference"],
        objArr[0][i]["Micaplate"],
      ];
      dataArr.push(ttt);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  };
  reader.readAsBinaryString(input.files[0]);
}
