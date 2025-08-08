const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const os = require("os");
const path = require("path");

const generateDocs = async (cases, wordBuffer, release, result, name_tester, name_folder) => {
  // wordBuffer es el buffer recibido del archivo Word

  const outputFolder = path.join(os.homedir(), "Desktop", name_folder || "Documentos_Generados");

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

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

      const safeFileName = caseTest.name.replace(/[\\/:*?"<>|]/g, "_") + ".docx";
      const outputPath = path.join(outputFolder, safeFileName);
      fs.writeFileSync(outputPath, buffer);
      console.log("Documento generado:", outputPath);
    } catch (err) {
      console.error("Error al generar documento para caso:", caseTest.name, err);
    }
  }
};

module.exports = generateDocs;
