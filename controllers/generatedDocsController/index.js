const generateDocs = require("@utils/generateDocs.js");

const generatedDocsController = async (req, res) => {
  try {
    const { realises, nameTester, result, nameFolder } = req.body;

    if (!req.files || !req.files.word || !realises || !nameTester || !result || !nameFolder || !req.body.cases) {
      return res.status(400).json({ error: "Faltan datos requeridos o archivos." });
    }

    const cases = JSON.parse(req.body.cases);  // <---- Aquí haces el parse

    const wordFile = req.files.word[0];
    if (!wordFile) {
      return res.status(400).json({ error: "No se encontró el archivo de Word." });
    }

    await generateDocs(cases, wordFile.buffer, realises, result, nameTester, nameFolder);

    return res.status(200).json({
      message: "Documentos generados correctamente",
      cantidad: cases.length,
    });

  } catch (error) {
    console.error("Error en el endpoint generatedDocsController:", error);
    return res.status(500).json({ error: "Error al generar los documentos." });
  }
};
module.exports = generatedDocsController;
