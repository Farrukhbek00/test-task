import * as express from "express";
import { TestModel } from "./test";
import * as multer from "multer";
import * as fs from "fs";
import * as request from "request";
import * as path from "path";
import * as appRoot from "app-root-path";
import * as https from "https";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name + ".jpg");
	}
});
 
const upload = multer({ storage: storage });


const testRoutes = express.Router();

testRoutes.get("/test", async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await TestModel.find({});
		items = items.map((item) => {
			return {
				id: item._id,
				name: item.name, 
				description: item.description,
				image: appRoot.path + "/uploads/" + item.name + ".jpg"
			};
		});
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error("Caught error", err);
	}
});

testRoutes.post("/test", upload.single("image"), async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const download = function(uri, filename, callback){
		request.head(uri, function(err, res, body){
			request(uri).pipe(fs.createWriteStream(path.join(appRoot.path + "/uploads/" + filename))).on("close", callback);
		});
	};

	https.get("https://random.dog/woof.json", (resp) => {
		let data = "";

		// A chunk of data has been received.
		resp.on("data", (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on("end", () => {
			const filename = req.body.name + ".jpg";
			const obj = JSON.parse(data);
			console.log(filename);
			
		
			download(obj.url, filename, function(){
				console.log("done");
			});	
		});
		
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});

	const obj = {
		name: req.body.name,
		description: req.body.description
	};
	TestModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
			resp.json({"message": "Please, enter not duplicate name, and all fields all required"});
		}
		else {
			resp.json(item);
		}
	});
});

export { testRoutes };