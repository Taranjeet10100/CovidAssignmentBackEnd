const { msg } = require("../../../config/message");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../helper/errorResponse");
const Covid = require('../models/covidData.model');


// @desc    Add Covid Data
// @route   POST/api/v1/covid/adddata
//access    Public
exports.addData = asyncHandler(async (req, res, next) => {
    if (!req.body.cases) {
        return next(new ErrorResponse(msg.casesRequired, 401));
    }

    if (!req.body.deaths) {
        return next(new ErrorResponse(msg.deathsRequired, 401));
    }

    if (!req.body.state) {
        return next(new ErrorResponse(msg.stateRequired, 401));
    }

    if (!req.body.date) {
        return next(new ErrorResponse(msg.dateRequired, 401));
    }

    req.body.date = new Date(req.body.date);
req.body.state = req.body.state.toLowerCase();
    let covidData = await Covid.create(req.body);

    res.status(200).json({
        success: true,
        data: covidData
    })
});

// @desc    Update Covid Data by state
// @route   POST/api/v1/covid/update/data
//access    Public
exports.updateData = asyncHandler(async (req, res, next) => {

    let covid = await Covid.findOne({ state: req.body.state.toLowerCase() }).sort({ createdAt: -1 });

    if (!covid) {
        return next(new ErrorResponse("Data not found for this state", 401));
    }

    if (req.body.date) {
        req.body.date = new Date(req.body.date);
    }

    if(req.body.state){
        req.body.state = req.body.state.toLowerCase();
    }

    covid = await Covid.findByIdAndUpdate(covid._id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        data: covid
    })
});

// @desc    Get Covid Data by state
// @route   POST/api/v1/covid/get/data/state
//access    Public
exports.getList = asyncHandler(async (req, res, next) => {

    let covid = await Covid.find({ });

    res.status(200).json({
        success: true,
        data: covid
    })
});


// @desc    Get Covid Data by state
// @route   POST/api/v1/covid/get/data/state
//access    Public
exports.getDataByState = asyncHandler(async (req, res, next) => {

    if (!req.query.state) {
        return next(new ErrorResponse("State Required to find Data", 401));
    }

    let covid = await Covid.find({ state: req.query.state.toLowerCase() });

    res.status(200).json({
        success: true,
        data: covid
    })
});

// @desc    Delete Covid Data by state
// @route   POST/api/v1/covid/get/data/state
//access    Public
exports.deleteDataByState = asyncHandler(async (req, res, next) => {

    if (!req.query.state) {
        return next(new ErrorResponse("State Required to find Data", 401));
    }

    let covid = await Covid.find({ state: req.query.state.toLowerCase() });

    if (covid) {
        if (covid.length > 0) {
            for (let i = 0; i < covid.length; i++) {
                await Covid.findByIdAndDelete(covid[i]._id);
            }
        }
    }

    res.status(200).json({
        success: true,
        data: `Covid Data deleted of given state`
    })
});

// @desc    Get Covid Data by state and given date
// @route   POST/api/v1/covid/get/data/state
//access    Public
exports.getDataByStateAndDate = asyncHandler(async (req, res, next) => {

    let page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1,
        limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 20;

    if (!req.query.date) {
        return next(new ErrorResponse("Date Required to find Data", 401));
    }

    let firstday = new Date(req.query.date).setHours(0, 0, 0, 0);
    let lastday = new Date(req.query.date).setHours(23, 59, 59, 0);

    if (!req.query.state) {
        return next(new ErrorResponse("State Required to find Data", 401));
    }

    let covid = await Covid.find({
        state: req.query.state.toLowerCase(),
        date: {
            $gte: firstday,
            $lte: lastday,
        }
    }).skip(limit * page - limit)
        .limit(limit);

    res.status(200).json({
        success: true,
        data: covid
    })
});


// @desc    Get Covid Data by state and given date
// @route   POST/api/v1/covid/get/data/state
//access    Public
exports.getStatesofMoreCases = asyncHandler(async (req, res, next) => {

    if (!req.query.cases) {
        return next(new ErrorResponse("Number of cases Required", 401));
    }

    let firstday = new Date(Date.now()).setHours(0, 0, 0, 0);
    let lastday = new Date(Date.now()).setHours(23, 59, 59, 0);

    let covid = await Covid.find({
        cases: { $gte: Number(req.query.cases) },
        date: {
            $gte: firstday,
            $lte: lastday,
        }
    }).select('state')

    res.status(200).json({
        success: true,
        data: covid
    })
});