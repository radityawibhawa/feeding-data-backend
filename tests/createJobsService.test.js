const jobService = require('../service/jobsService');
const jobModel = require('../model/jobs');

jest.mock('../model/jobs');

describe('Job Service', () => {
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
    jobModel.insertJob.mockResolvedValue(mockJobResult);

    const response = await jobService.createJob(mockJobData);

    console.log('Job creation response:', response);

    expect(response.statusCode).toBe(201);
    expect(response.message).toBe('Job Created Successfully');
    expect(response.job).toEqual(mockJobResult);
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

    jobModel.insertJob.mockRejectedValue(new Error('Database Error'));

    const response = await jobService.createJob(mockJobData);

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe('Internal Server Error');
  });
});