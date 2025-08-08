const generateDocs = require("@utils/generatedOnlyDoc.js");

const generatedDocController = async (req, res) => {
  try {
    const { realises, nameTester, result } = req.body;

    if (!req.files || !req.files.word || !realises || !nameTester || !result || !req.body.cases) {
      return res.status(400).json({ error: "Faltan datos requeridos o archivos." });
    }

    const cases = JSON.parse(req.body.cases);
    const wordFile = req.files.word[0];

    const generated = await generateDocs(cases, wordFile.buffer, realises, result, nameTester);

    if (!generated.length) {
      return res.status(500).json({ error: "No se pudo generar el documento." });
    }

    const { name, buffer } = generated[0]; // solo el primero

    res.set({
      "Content-Disposition": `attachment; filename="${name}"`,
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    res.send(buffer);

  } catch (error) {
    console.error("Error en el endpoint generatedDocController:", error);
    return res.status(500).json({ error: "Error al generar el documento." });
  }
};

module.exports = generatedDocController;
