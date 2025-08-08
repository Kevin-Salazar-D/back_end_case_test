const XLSX = require("xlsx");

const readSheetCaseTest = (excelBuffer) => {
  try {
    // Leer desde el buffer, no desde archivo
    const workbook = XLSX.read(excelBuffer, { type: "buffer" });

    const nameSheetExcel = workbook.SheetNames[2]; // tercera hoja
    if (!nameSheetExcel) throw new Error("No se encontró la hoja de índice 2");

    const sheet = workbook.Sheets[nameSheetExcel];
    const data = XLSX.utils.sheet_to_json(sheet);

    const testCases = [];
    let currentCase = null;

    data.forEach((row) => {
      if (row["NOMBRE DEL CASO DE PRUEBA"]) {
        currentCase = {
          name: row["NOMBRE DEL CASO DE PRUEBA"],
          steps: [],
        };
        testCases.push(currentCase);
      }

      if (currentCase) {
        currentCase.steps.push({
          step: row["PASOS"] || "",
          description: row["DESCRIPCION"] || "",
          result: row["RESULTADO ESPERADO"] || "",
        });
      }
    });

    return testCases;
  } catch (error) {
    console.error("Error al leer el Excel:", error);
    return [];
  }
};

module.exports = readSheetCaseTest;
