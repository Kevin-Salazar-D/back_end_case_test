const generateDocs = require("@utils/generateDocs.js");
const readSheetCaseTest = require("@utils/readSheetCaseTest.js");

const generatedTest = async (req, res) => {
  try {
    const {
      realises,
      nameTester,
      result,
      nameFolder
    } = req.body;

    if (!req.files || !req.files.excel || !req.files.word || !realises || !nameTester) {
      return res.status(400).json({ error: "Faltan datos requeridos o dsfdf." });
    }

    const excelFile = req.files.excel[0]; // es un array
    const wordFile = req.files.word[0];

    const cases = readSheetCaseTest(excelFile.buffer);

    if (!cases.length) {
      return res.status(400).json({ error: "No se encontraron casos en el Excel." });
    }

    // 👉 Aquí podrías usar generateDocs() si ya lo tienes listo
    // generateDocs(cases, wordFile.buffer, realises, result, nameTester, nameFolder);

    return res.status(200).json({
      message: "Casos generados correctamente.",
      cantidad: cases.length,
      casos: cases
    });

  } catch (error) {
    console.error("Error en el endpoint generateCaseTest:", error);
    return res.status(500).json({ error: "Error al generar los documentos." });
  }
};

module.exports = generatedTest;
