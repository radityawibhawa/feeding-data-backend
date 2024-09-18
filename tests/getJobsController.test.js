const request = require('supertest');
const express = require('express');
const jobRouter = require('../router/jobRouter');
const jobService = require('../service/jobsService');

jest.mock('../service/jobsService');

const app = express();
app.use(express.json());
app.use('/jobs', jobRouter);

describe('Job Controller', () => {
  it('should return all jobs when no search term is provided', async () => {
    const mockJobs = [
      { id: 1, jobTitle: 'Developer', jobAdvertiser: 'Company A', jobLocation: 'Location A', jobType: 'Full-time', description: 'Job description', minSalary: 50000, maxSalary: 70000, employmentType: 'Permanent', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' },
      { id: 2, jobTitle: 'Designer', jobAdvertiser: 'Company B', jobLocation: 'Location B', jobType: 'Part-time', description: 'Job description', minSalary: 30000, maxSalary: 50000, employmentType: 'Contract', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' }
    ];
    jobService.getJobs.mockResolvedValue({
      statusCode: 200,
      totalJobs: 2,
      totalPages: 1,
      currentPage: 1,
      jobs: mockJobs
    });

    const response = await request(app).get('/jobs');

    expect(response.status).toBe(200);
    expect(response.body.totalJobs).toBe(2);
    expect(response.body.jobs).toEqual(mockJobs);
  });

  it('should return filtered jobs when a search term is provided', async () => {
    const mockJobs = [
      { id: 1, jobTitle: 'Developer', jobAdvertiser: 'Company A', jobLocation: 'Location A', jobType: 'Full-time', description: 'Job description', minSalary: 50000, maxSalary: 70000, employmentType: 'Permanent', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' }
    ];
    jobService.getJobs.mockResolvedValue({
      statusCode: 200,
      totalJobs: 1,
      totalPages: 1,
      currentPage: 1,
      jobs: mockJobs
    });

    const response = await request(app).get('/jobs?search=Developer');

    expect(response.status).toBe(200);
    expect(response.body.totalJobs).toBe(1);
    expect(response.body.jobs).toEqual(mockJobs);
  });
});