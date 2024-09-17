const db = require('../config/db');

const getAllJobs = async () => {
  const result = await db.query('SELECT * FROM "Jobs"');
  return result.rows;
}

const searchJobs = async (searchTerm) => {
  const result = await db.query(
    `SELECT * FROM "Jobs" WHERE "jobTitle" ILIKE $1 OR "id"::text ILIKE $1 OR similarity("jobTitle", $1) > 0.5`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

const updateJob = async (id, jobData) => {
  const {
    jobTitle,
    jobAdvertiser,
    jobLocation,
    jobType,
    description,
    minSalary,
    maxSalary,
    employmentType,
    responsibilities,
    keyQualifications
  } = jobData;

  const result = await db.query(
    `UPDATE "Jobs" SET "jobTitle" = $1, "jobAdvertiser" = $2, "jobLocation" = $3, "jobType" = $4, "description" = $5, "minSalary" = $6, "maxSalary" = $7, "employmentType" = $8, "responsibilities" = $9, "keyQualifications" = $10 WHERE "id" = $11 RETURNING *`,
    [jobTitle, jobAdvertiser, jobLocation, jobType, description, minSalary, maxSalary, employmentType, responsibilities, keyQualifications, id]
  );

  return result.rows[0];
}

const insertJob = async (jobData) => {
  const {
    jobTitle,
    jobAdvertiser,
    jobLocation,
    jobType,
    description,
    minSalary,
    maxSalary,
    employmentType,
    responsibilities,
    keyQualifications 
  } = jobData;

  const result = await db.query(
    'INSERT INTO "Jobs" ("jobTitle", "jobAdvertiser", "jobLocation", "jobType", "description", "minSalary", "maxSalary", "employmentType", "uploadTime", "responsibilities", "keyQualifications") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10) RETURNING *',
    [jobTitle, jobAdvertiser, jobLocation, jobType, description, minSalary, maxSalary, employmentType, responsibilities, keyQualifications]
  );

  return result.rows[0];
}

const deleteJob = async (id) => {
  const result = await db.query('DELETE FROM "Jobs" WHERE "id" = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAllJobs,
  insertJob,
  searchJobs,
  deleteJob,
  updateJob
};
