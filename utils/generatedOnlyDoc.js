const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { normalizeDocument } = require("@utils/normalizeDocument.js");

const generatedOnlyDoc = async (
  cases,
  wordBuffer,
  release,
  result,
  name_tester
) => {
  const generatedBuffers = [];

  for (const caseTest of cases) {
    try {
      const zip = new PizZip(wordBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const pasos = caseTest.steps
        .map((step, i) => {
          return `${i + 1}.- ${step.step} ${
            step.description
          }\n   - Resultado esperado: ${step.result}`;
        })
        .join("\n\n");

      doc.setData({
        RELEASE: release,
        NOMBRE_CASO: caseTest.name,
        RESULTADO: result,
        PASOS: pasos,
        NOMBRE_TESTER: name_tester,
      });

      doc.render();

      const buffer = doc.getZip().generate({ type: "nodebuffer" });

      //noralizamos el docummento generado, para que no haya ningun problemma de error por carracteres no validos
      generatedBuffers.push({
        name:  normalizeDocument(caseTest.name, "docx"),

        buffer,
      });
    } catch (err) {
      console.error(
        "Error al generar documento para caso:",
        caseTest.name,
        err
      );
    }
  }

  return generatedBuffers;
};

module.exports = generatedOnlyDoc;
