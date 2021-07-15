import * as express from "express";
import { testRoutes } from "./test.controller";

const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(testRoutes);

export { app };