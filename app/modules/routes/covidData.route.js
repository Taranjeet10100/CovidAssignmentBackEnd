const express = require("express");
const router = express.Router();

const { addData,getList, updateData,getDataByState,deleteDataByState,getDataByStateAndDate,getStatesofMoreCases } = require('../controllers/covidData.controller');

router.post('/add/data', addData);
router.post('/update/data', updateData);
router.get('/get/data/state',getDataByState);
router.post('/delete/data/state',deleteDataByState);
router.get('/get/data/state/date',getDataByStateAndDate)
router.get('/get/states',getStatesofMoreCases);
router.get('/list',getList);

module.exports = router;