const normalizeDocument = (nameCase, typeFile) => {
  return nameCase
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "")   
    .replace(/[\\/:*?"<>|\u2013\u2014]/g, "_") 
    .replace(/[^\x00-\x7F]/g, "_")     
    + `.${typeFile}`;                 
};

module.exports = {
  normalizeDocument,
};
