const jobService = require('../service/jobsService');
const jobModel = require('../model/jobs');

jest.mock('../model/jobs');

describe('Job Service', () => {
  it('should return all jobs when no search term is provided', async () => {
    const mockJobs = [
      { id: 1, jobTitle: 'Developer', jobAdvertiser: 'Company A', jobLocation: 'Location A', jobType: 'Full-time', description: 'Job description', minSalary: 50000, maxSalary: 70000, employmentType: 'Permanent', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' },
      { id: 2, jobTitle: 'Designer', jobAdvertiser: 'Company B', jobLocation: 'Location B', jobType: 'Part-time', description: 'Job description', minSalary: 30000, maxSalary: 50000, employmentType: 'Contract', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' }
    ];
    jobModel.getAllJobs.mockResolvedValue(mockJobs);

    const response = await jobService.getJobs('', 10, 1);

    expect(response.statusCode).toBe(200);
    expect(response.totalJobs).toBe(2);
    expect(response.jobs).toEqual(mockJobs);
  });

  it('should return filtered jobs when a search term is provided', async () => {
    const mockJobs = [
      { id: 1, jobTitle: 'Developer', jobAdvertiser: 'Company A', jobLocation: 'Location A', jobType: 'Full-time', description: 'Job description', minSalary: 50000, maxSalary: 70000, employmentType: 'Permanent', uploadTime: '2023-09-17', responsibilities: '', keyQualifications: '' }
    ];
    jobModel.searchJobs.mockResolvedValue(mockJobs);

    const response = await jobService.getJobs('Developer', 10, 1);

    expect(response.statusCode).toBe(200);
    expect(response.totalJobs).toBe(1);
    expect(response.jobs).toEqual(mockJobs);
  });
});