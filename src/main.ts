import { app } from "./app";
import * as http from "http";
import { env } from "process";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

const PORT = env.PORT;
const MONGO_URI = "mongodb://localhost:27017/test";
const server = http.createServer(app);
server.listen(PORT);
server.on("listening", async() => {
	console.info(`Listening on port ${PORT}`);
	mongoose.connect(MONGO_URI, { useFindAndModify:false });
	mongoose.connection.on("open", () => {
		console.info("Connected to Mongo");
	});
	mongoose.connection.on("error", (err: any) => {
		console.error(err);
	});
}); 