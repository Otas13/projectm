let mongoose = require('mongoose');

let schemaOptions = {
    timestamps: true
};

let testResultSchema = new mongoose.Schema({
    username: String,
    layoutOne: { scenarioOne: mongoose.Schema.Types.Mixed, scenarioTwo: mongoose.Schema.Types.Mixed, scenarioThree: mongoose.Schema.Types.Mixed, scenarioFour: mongoose.Schema.Types.Mixed },
    layoutTwo: { scenarioOne: mongoose.Schema.Types.Mixed, scenarioTwo: mongoose.Schema.Types.Mixed, scenarioThree: mongoose.Schema.Types.Mixed, scenarioFour: mongoose.Schema.Types.Mixed },
    layoutThree: { scenarioOne: mongoose.Schema.Types.Mixed, scenarioTwo: mongoose.Schema.Types.Mixed, scenarioThree: mongoose.Schema.Types.Mixed, scenarioFour: mongoose.Schema.Types.Mixed },
    layoutFour: { scenarioOne: mongoose.Schema.Types.Mixed, scenarioTwo: mongoose.Schema.Types.Mixed, scenarioThree: mongoose.Schema.Types.Mixed, scenarioFour: mongoose.Schema.Types.Mixed },

}, schemaOptions);

let TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;