require("module-alias/register"); // Este siempre va al 

const  routes = require("@routes");
const app = require("./app");
const PORT = 3000;

app.use("/test_cases", routes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
