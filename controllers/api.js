const TestResult = require('../models/testResult');

function trimTestResult(data) {
    let cleanData = {};
    ['layoutOne', 'layoutTwo', 'layoutThree', 'layoutFour', 'layoutFive'].map(layout => {
        ['scenarioOne', 'scenarioTwo', 'scenarioThree', 'scenarioFour'].map(scenario => {
            if(Object.keys(data[layout][scenario]).length > 0){
                if(!(layout in cleanData)){
                    cleanData[layout] = {};
                }
                cleanData[layout][scenario] = data[layout][scenario];
            }
        })
    });
    return cleanData;
}

exports.persist = (req, res) => {
    if (req.headers.authorization && (req.headers.authorization.split(' ')[1] === process.env.WRITE_TOKEN)) {
        const data = trimTestResult(req.body);
        const testResult = new TestResult({
            username: req.body.username,
            ...data
        });


        TestResult.findOne({username: req.body.username}, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }

            if(result){
                const updatedObject = Object.assign({}, result.toJSON(), data);
                TestResult.findOneAndUpdate({_id: result._id}, updatedObject, {upsert: true, overwrite: true}, (err) => {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
                    } else {
                        console.log('Record updated.');
                        res.sendStatus(200);
                    }
                });
            }else {
                testResult.save((err, result) => {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
                    } else {
                        console.log('Record saved.');
                        res.sendStatus(200);
                    }
                });
            }
        });
    } else {
        res.sendStatus(403);
    }
};

exports.listTests = (req, res) => {
    TestResult.find({})
        .select({username: 1, createdAt: 1})
        .sort({createdAt: -1})
        .exec((error, records) => {
            if (error) {
                res.sendStatus(500);
                return;
            }

            if(!Array.isArray(records)) {
                records = [records];
            }
            return res.status(200).send(records);
        });
};

exports.getRecord = (req, res) => {
    TestResult.findOne({_id: req.params.id}, (error, record) => {
        if (error) {
            res.sendStatus(500);
            return;
        }

        if(record) {
            return res.status(200).send(record);
        }
        else {
            return res.sendStatus(404);
        }
    });
};
