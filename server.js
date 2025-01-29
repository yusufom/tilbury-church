const app = require("./app");

require("dotenv").config();

const debug = require("debug")("app:startup");

// require("./startup/database")(app);

PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  debug(`App now listening @ PORT ${PORT}`);
});