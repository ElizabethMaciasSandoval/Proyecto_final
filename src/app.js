import { app } from "./index.js";

const port = 8080;

app.listen(port, () =>{
  console.log(`Server running at port ${port}`);
});