const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const generatedOnlyDoc = async (cases, wordBuffer, release, result, name_tester) => {
  const generatedBuffers = [];

  for (const caseTest of cases) {
    try {
      const zip = new PizZip(wordBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const pasos = caseTest.steps.map((step, i) => {
        return `${i + 1}.- ${step.step}\nDescripción: ${step.description}\nResultado esperado: ${step.result}`;
      }).join("\n\n");

      doc.setData({
        RELEASE: release,
        NOMBRE_CASO: caseTest.name,
        RESULTADO: result,
        PASOS: pasos,
        NOMBRE_TESTER: name_tester,
      });

      doc.render();

      const buffer = doc.getZip().generate({ type: "nodebuffer" });

      generatedBuffers.push({
        name: caseTest.name.replace(/[\\/:*?"<>|]/g, "_") + ".docx",
        buffer,
      });

    } catch (err) {
      console.error("Error al generar documento para caso:", caseTest.name, err);
    }
  }

  return generatedBuffers;
};

module.exports = generatedOnlyDoc;
