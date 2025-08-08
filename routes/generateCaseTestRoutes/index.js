const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const generatedTest = require("@controllers/generatedTestController");
const generateDoc = require("@controllers/generatedDocsController");
const generateOnlyDoc = require("@controllers/generatedOnlyDocController");

router.post(
  "/generatedTest",
  upload.fields([
    { name: "excel", maxCount: 1 },
    { name: "word", maxCount: 1 }
  ]),
  generatedTest
);

router.post(
  "/generatedDocs",
  upload.fields([
    { name: "excel", maxCount: 1 },
    { name: "word", maxCount: 1 }
  ]),
  generateDoc
);

router.post(
  "/generatedOnlyDocs",
  upload.fields([
    { name: "word", maxCount: 1 } 
  ]),
  generateOnlyDoc
);

module.exports = router;
