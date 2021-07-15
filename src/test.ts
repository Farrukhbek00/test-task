import * as mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
	description: {
		type: String, 
		required: true
	},
	name: {
		type: String, 
		required: true, 
		unique: true
	},
	image:{
		data: Buffer, 
		contentType: String
	}
});

const TestModel = mongoose.model("Test", TestSchema);

export { TestModel };
