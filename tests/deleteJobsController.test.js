const request = require('supertest');
const express = require('express');
const jobRouter = require('../router/jobRouter');
const jobService = require('../service/jobsService');

jest.mock('../service/jobsService');

const app = express();
app.use(express.json());
app.use('/jobs', jobRouter);

describe('Job Controller', () => {
  it('should delete a job successfully', async () => {
    const mockJobResult = {
      id: 1,
      jobTitle: 'Developer',
      jobAdvertiser: 'Company A',
      jobLocation: 'Location A',
      jobType: 'Full-time',
      description: 'Job description',
      minSalary: 50000,
      maxSalary: 70000,
      employmentType: 'Permanent',
      responsibilities: '',
      keyQualifications: ''
    };
    jobService.deleteJob.mockResolvedValue({
      statusCode: 200,
      message: 'Job Deleted Successfully',
      job: mockJobResult
    });

    const response = await request(app)
      .delete('/jobs/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Job Deleted Successfully');
    expect(response.body.job).toEqual(mockJobResult);
  });

  it('should return an error if job deletion fails', async () => {
    jobService.deleteJob.mockResolvedValue({
      statusCode: 500,
      message: 'Internal Server Error'
    });

    const response = await request(app)
      .delete('/jobs/1');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });

  it('should return 404 if job not found', async () => {
    jobService.deleteJob.mockResolvedValue({
      statusCode: 404,
      message: 'Job Not Found'
    });

    const response = await request(app)
      .delete('/jobs/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Job Not Found');
  });
});