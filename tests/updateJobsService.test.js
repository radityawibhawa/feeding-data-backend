const jobService = require('../service/jobsService');
const jobModel = require('../model/jobs');

jest.mock('../model/jobs');

describe('Job Service', () => {
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
    jobModel.updateJob.mockResolvedValue(mockJobResult);

    const response = await jobService.updateJob(1, mockJobData);

    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('Job updated successfully');
    expect(response.job).toEqual(mockJobResult);
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

    jobModel.updateJob.mockRejectedValue(new Error('Database Error'));

    const response = await jobService.updateJob(1, mockJobData);

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe('Internal Server Error');
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

    jobModel.updateJob.mockResolvedValue(null);

    const response = await jobService.updateJob(1, mockJobData);

    expect(response.statusCode).toBe(404);
    expect(response.message).toBe('Job not found');
  });
});