const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobsController');
const jobExportController = require('../controller/jobsExportController');

router.get('/', jobController.getJobs);
router.get('/export', jobExportController.exportJobsToExcel);
router.post('/', jobController.createJob);
router.delete('/:id', jobController.deleteJob);
router.put('/:id', jobController.updateJob);

module.exports = router;
