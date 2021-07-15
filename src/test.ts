import * as mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
	description: {type: String},
	name: {type: String},
	image:{
		data: Buffer, 
		contentType: String
	}
});

const TestModel = mongoose.model("Test", TestSchema);

export { TestModel };
