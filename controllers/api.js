const TestResult = require('../models/testResult');

exports.persist = (req, res) => {
    if (req.headers.authorization && (req.headers.authorization.split(' ')[1] === process.env.WRITE_TOKEN)) {
        const testResult = new TestResult({
            username: req.body.username,
            layoutOne: {
                scenarioOne: req.body.layoutOne.scenarioOne,
                scenarioTwo: req.body.layoutOne.scenarioTwo,
                scenarioThree: req.body.layoutOne.scenarioThree,
                scenarioFour: req.body.layoutOne.scenarioFour
            },
            layoutTwo: {
                scenarioOne: req.body.layoutTwo.scenarioOne,
                scenarioTwo: req.body.layoutTwo.scenarioTwo,
                scenarioThree: req.body.layoutTwo.scenarioThree,
                scenarioFour: req.body.layoutTwo.scenarioFour
            },
            layoutThree: {
                scenarioOne: req.body.layoutThree.scenarioOne,
                scenarioTwo: req.body.layoutThree.scenarioTwo,
                scenarioThree: req.body.layoutThree.scenarioThree,
                scenarioFour: req.body.layoutThree.scenarioFour
            },
            layoutFour: {
                scenarioOne: req.body.layoutFour.scenarioOne,
                scenarioTwo: req.body.layoutFour.scenarioTwo,
                scenarioThree: req.body.layoutFour.scenarioThree,
                scenarioFour: req.body.layoutFour.scenarioFour
            },
        });

        testResult.save((err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                console.log('Record saved.');
                res.sendStatus(200);
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
