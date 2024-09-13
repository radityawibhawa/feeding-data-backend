const jobModel = require('../model/jobs');

const getJobs = async (searchTerm, pageSize, pageNumber) => {
  try {
    let jobs;
    if (searchTerm && searchTerm.trim() !== '') {
      console.log(`Searching for job with term: ${searchTerm}`);
      jobs = await jobModel.searchJobs(searchTerm);
    } else {
      jobs = await jobModel.getAllJobs();
    }

    const totalJobs = jobs.length;
    const totalPages = Math.ceil(totalJobs / pageSize);
    const offset = (pageNumber - 1) * pageSize;
    const paginatedJobs = jobs.slice(offset, offset + pageSize);

    return {
      statusCode: 200,
      totalJobs,
      totalPages,
      currentPage: pageNumber,
      jobs: paginatedJobs.map(job => ({
        id: job.id,
        jobTitle: job.jobTitle,
        jobAdvertiser: job.jobAdvertiser,
        jobLocation: job.jobLocation,
        jobType: job.jobType,
        description: job.description,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        employmentType: job.employmentType,
        uploadTime: job.uploadTime,
        responsibilities: job.responsibilities,
        keyQualifications: job.keyQualifications
      }))
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }
};

const createJob = async (jobData) => {
  try {
    const result = await jobModel.insertJob(jobData);
    return {
      statusCode: 201,
      message: 'Job Created Successfully',
      job: result
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }
};

const deleteJob = async (id) => {
  try {
    const result = await jobModel.deleteJob(id);
    if (result) {
      return {
        statusCode: 200,
        message: 'Job Deleted Successfully',
        job: result
      };
    } else {
      return {
        statusCode: 404,
        message: 'Job Not Found',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }
};

const updateJob = async(id, jobData) => {
  try{
    const result = await jobModel.updateJob(id, jobData);
    if (result) {
      return {
        statusCode : 200,
        message: 'Job updated successfully',
        job: result
      };
    } else {
      return{
        statusCode : 404,
        message: 'Job not found'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }
}

module.exports = {
  getJobs,
  createJob,
  deleteJob,
  updateJob
};
