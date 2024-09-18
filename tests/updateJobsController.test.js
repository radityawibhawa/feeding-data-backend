const request = require('supertest');
const express = require('express');
const jobRouter = require('../router/jobRouter');
const jobService = require('../service/jobsService');

jest.mock('../service/jobsService');

const app = express();
app.use(express.json());
app.use('/jobs', jobRouter);

describe('Job Controller', () => {
  it('should update a job successfully', async () => {
    const mockJobData = {
      jobTitle: 'Senior Developer',
      jobAdvertiser: 'Company A',
      jobLocation: 'Location A',
      jobType: 'Full-time',
      description: 'Updated job description',
      minSalary: 60000,
      maxSalary: 80000,
      employmentType: 'Permanent',
      responsibilities: 'Updated responsibilities',
      keyQualifications: 'Updated qualifications'
    };

    const mockJobResult = { id: 1, ...mockJobData, uploadTime: '2023-09-17' };
    jobService.updateJob.mockResolvedValue({
      statusCode: 200,
      message: 'Job updated successfully',
      job: mockJobResult
    });

    const response = await request(app)
      .put('/jobs/1')
      .send(mockJobData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Job updated successfully');
    expect(response.body.job).toEqual(mockJobResult);
  });

  it('should return an error if job update fails', async () => {
    const mockJobData = {
      jobTitle: 'Senior Developer',
      jobAdvertiser: 'Company A',
      jobLocation: 'Location A',
      jobType: 'Full-time',
      description: 'Updated job description',
      minSalary: 60000,
      maxSalary: 80000,
      employmentType: 'Permanent',
      responsibilities: 'Updated responsibilities',
      keyQualifications: 'Updated qualifications'
    };

    jobService.updateJob.mockResolvedValue({
      statusCode: 500,
      message: 'Internal Server Error'
    });

    const response = await request(app)
      .put('/jobs/1')
      .send(mockJobData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });

  it('should return 404 if job not found', async () => {
    const mockJobData = {
      jobTitle: 'Senior Developer',
      jobAdvertiser: 'Company A',
      jobLocation: 'Location A',
      jobType: 'Full-time',
      description: 'Updated job description',
      minSalary: 60000,
      maxSalary: 80000,
      employmentType: 'Permanent',
      responsibilities: 'Updated responsibilities',
      keyQualifications: 'Updated qualifications'
    };

    jobService.updateJob.mockResolvedValue({
      statusCode: 404,
      message: 'Job not found'
    });

    const response = await request(app)
      .put('/jobs/1')
      .send(mockJobData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Job not found');
  });
});