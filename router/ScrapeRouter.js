const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment'); 
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.get('/scrape/:jobTag', async (req, res) => {
    let response = {
        message: "",
        data: null,
        length: 0,
    };
    try {
        const jobTag = req.params.jobTag;
        const url = `https://id.jobstreet.com/id/${jobTag}-jobs`;
        let raw_data;
        // Get Data
        const { data } = await axios.get(url);
        raw_data = data;
        const $ = cheerio.load(raw_data);
        const result = [];

        const scriptContent = $('script[data-automation="server-state"]').html();

        // Extract JSON strings using regular expressions
        const reduxDataMatch = scriptContent.match(
            /window\.SEEK_REDUX_DATA\s*=\s*(\{.*?\});/
        );

        // Parse JSON data
        const reduxData = reduxDataMatch ? JSON.parse(reduxDataMatch[1]) : {};
        const jobs = reduxData?.results?.results?.jobs;

        jobs.forEach((val) => {
            let jobData = {};
            jobData.id = uuidv4();
            jobData.jobTitle = val.title;
            jobData.jobAdvertised = val.companyName;
            jobData.jobLocation = val.jobLocation.label;
            jobData.jobType = "Work From Office";
            jobData.description = val.teaser;
            if (val.salary) {
                const salaryRange = val.salary.split('-');
                if (salaryRange.length === 2) {
                    jobData.minSalary = parseInt(salaryRange[0].replace(/\D/g, '')) || 0;
                    jobData.maxSalary = parseInt(salaryRange[1].replace(/\D/g, '')) || 0;
                } else {
                    jobData.minSalary = 0;
                    jobData.maxSalary = 0;
                }
            } else {
                jobData.minSalary = 0;
                jobData.maxSalary = 0;
            }
            jobData.employmentType = val.workType;
            jobData.uploadTime = moment().format("YYYY-MM-DD HH:mm:ss");
            jobData.responsibilities = "";
            jobData.keyQualifications = "";
            result.push(jobData);
        });
        

        // Insert data into the database
        const insertQuery = `
        INSERT INTO "Jobs" ("jobTitle", "jobAdvertiser", "jobLocation", "jobType", "description", "minSalary", "maxSalary", "employmentType", "uploadTime", "responsibilities", "keyQualifications")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, $10) RETURNING *`;
        
        for (const job of result) {
            const result = await db.query(insertQuery, [
                job.jobTitle,
                job.jobAdvertised,
                job.jobLocation,
                job.jobType,
                job.description,
                job.minSalary,
                job.maxSalary,
                job.employmentType,
                job.responsibilities,
                job.keyQualifications
            ]);
        }

        response.message = "Scraping data success";
        response.length = result.length;
        response.data = result;
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        response.message = "Error scraping data";
        res.status(500).json(response);
    }
});

module.exports = router;
