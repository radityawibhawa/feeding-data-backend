const jobService = require('../service/jobsService');

const getJobs = async (req, res) => {
  const searchTerm = req.query.search || '';
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const response = await jobService.getJobs(searchTerm, pageSize, pageNumber);
  res.status(response.statusCode).json(response);
};

const createJob = async (req, res) => {
  const response = await jobService.createJob(req.body);
  res.status(response.statusCode).json(response);
}

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const response = await jobService.deleteJob(id);
  res.status(response.statusCode).json(response);
}

const updateJob = async (req, res) => {
  const { id } = req.params;
  const jobData = req.body;
  const response = await jobService.updateJob(id, jobData);
  res.status(response.statusCode).json(response);
}

module.exports = {
  getJobs,
  createJob,
  deleteJob,
  updateJob
};
