const request = require('supertest');
const express = require('express');
const jobRouter = require('../router/jobRouter');
const jobService = require('../service/jobsService');

jest.mock('../service/jobsService');

const app = express();
app.use(express.json());
app.use('/jobs', jobRouter);

describe('Job Controller', () => {
  it('should create a job successfully', async () => {
    const mockJobData = {
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

    const mockJobResult = { id: 1, ...mockJobData, uploadTime: '2023-09-17' };
    jobService.createJob.mockResolvedValue({
      statusCode: 201,
      message: 'Job Created Successfully',
      job: mockJobResult
    });

    const response = await request(app)
      .post('/jobs')
      .send(mockJobData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Job Created Successfully');
    expect(response.body.job).toEqual(mockJobResult);
  });

  it('should return an error if job creation fails', async () => {
    const mockJobData = {
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

    jobService.createJob.mockResolvedValue({
      statusCode: 500,
      message: 'Internal Server Error'
    });

    const response = await request(app)
      .post('/jobs')
      .send(mockJobData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});