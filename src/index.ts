import server from "./server";
import colors from "colors";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    colors.blue.bold(`✅ Servidor corriendo en: http://localhost:${PORT}`)
  );
});
