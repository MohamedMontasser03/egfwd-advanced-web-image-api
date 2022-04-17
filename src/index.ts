import express from "express";
import routes from "./routes";

// create express app
const app = express();
const port = 3000;

// use routes
app.use("/api", routes);

// run express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
