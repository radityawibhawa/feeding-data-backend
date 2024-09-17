const ExcelJs = require('exceljs');
const jobService = require('../service/jobsService');

const exportJobsToExcel = async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    const pageSize = parseInt(req.query.pageSize) || 10;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const response = await jobService.getJobs(searchTerm, pageSize, pageNumber);
    const jobs = response.jobs;

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Jobs');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Job Title', key: 'jobTitle', width: 30 },
      { header: 'Job Advertiser', key: 'jobAdvertiser', width: 30 },
      { header: 'Job Location', key: 'jobLocation', width: 30 },
      { header: 'Job Type', key: 'jobType', width: 20 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Min Salary', key: 'minSalary', width: 15 },
      { header: 'Max Salary', key: 'maxSalary', width: 15 },
      { header: 'Employment Type', key: 'employmentType', width: 20 },
      { header: 'Upload Time', key: 'uploadTime', width: 20 },
      { header: 'Responsibilities', key: 'responsibilities', width: 50 },
      { header: 'Key Qualifications', key: 'keyQualifications', width: 50 },
    ];

    worksheet.addRows(jobs);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=jobs.xlsx');
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  exportJobsToExcel
};