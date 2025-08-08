const express = require("express");
const router = express.Router();

const generatedCases = require("@routes/generateCaseTestRoutes");


router.use("/generated", generatedCases);
///http://localhost:3000/generated/generatedDocs
module.exports = router;
