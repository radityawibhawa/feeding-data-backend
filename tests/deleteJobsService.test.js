const jobService = require('../service/jobsService');
const jobModel = require('../model/jobs');

jest.mock('../model/jobs');

describe('Job Service', () => {
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
    jobModel.deleteJob.mockResolvedValue(mockJobResult);

    const response = await jobService.deleteJob(1);

    expect(response.statusCode).toBe(200);
    expect(response.message).toBe('Job Deleted Successfully');
    expect(response.job).toEqual(mockJobResult);
  });

  it('should return an error if job deletion fails', async () => {
    jobModel.deleteJob.mockRejectedValue(new Error('Database Error'));

    const response = await jobService.deleteJob(1);

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe('Internal Server Error');
  });

  it('should return 404 if job not found', async () => {
    jobModel.deleteJob.mockResolvedValue(null);

    const response = await jobService.deleteJob(1);

    expect(response.statusCode).toBe(404);
    expect(response.message).toBe('Job Not Found');
  });
});