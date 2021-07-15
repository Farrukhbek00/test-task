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
	}
});

const TestModel = mongoose.model("Test", TestSchema);

export { TestModel };
