# Use Case : Feeding Data Jobstreet

## Description
Feeding Data Jobstreet adalah mini project untuk membuat aplikasi web daftar pekerjaan yang memiliki fitur utama scraping data dari jobstreet untuk dimasukkan ke dalam web aplikasi yang telah kita buat

Controller Test :

Controller Test adalah test untuk melakukan simulasi CRUD(Create, Read, Update, Delete) dengan memanfaatkan supertest dengan memanfaatkan request ke endpoint yang telah dirancang dan melakukan verifikasi pada responnya

- Delete Job Controller: PASS
- Create Job Controller: PASS
- Update Job Controller: PASS
- Get Jobs Controller: PASS

Service Test :

Service Test adalah test untuk mengecek behaviour dari function tertentu yang telah kita buat di service, selain memastikan apakah programnya berjalan dengan baik, juga harus dapat menghandle skenario lain seperti error atau data tidak ditemukan

- Get Jobs Service: PASS

- Create Jobs Service : PASS(Error untuk menunjukkan Error Handling berjalan dengan baik)
  Console Output : 

    console.log
      Job creation response: {
        statusCode: 201,
        message: 'Job Created Successfully',
        job: {
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
          keyQualifications: '',
          uploadTime: '2023-09-17'
        }
      }

      at Object.log (tests/createJobsService.test.js:26:13)

    console.error
      Error: Database Error
          at Object.<anonymous> (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\tests\createJobsService.test.js:47:42)    
          at Promise.then.completed (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:231:10)
          at _callCircusTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:252:3)        
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:126:9)
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:121:9)
          at run (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:71:3)
          at runAndTransformResultsToJestFormat (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
          at jestAdapter (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
          at runTestInternal (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:367:16)
          at runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:444:34)    
          at Object.worker (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\testWorker.js:106:12)

      54 |     };
      55 |   } catch (error) {
    > 56 |     console.error(error);
         |             ^
      57 |     return {
      58 |       statusCode: 500,
      59 |       message: 'Internal Server Error',

      at Object.error [as createJob] (service/jobsService.js:56:13)
      at Object.<anonymous> (tests/createJobsService.test.js:49:22)

- Delete Job Service: PASS (Error memastikan bahwa Error Handling berjalan dengan baik)
  Console Output :

    console.error
      Error: Database Error
          at Object.<anonymous> (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\tests\deleteJobsService.test.js:31:42)    
          at Promise.then.completed (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:231:10)
          at _callCircusTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:252:3)        
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:126:9)
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:121:9)
          at run (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:71:3)
          at runAndTransformResultsToJestFormat (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
          at jestAdapter (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
          at runTestInternal (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:367:16)
          at runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:444:34)    
          at Object.worker (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\testWorker.js:106:12)

      78 |     }
      79 |   } catch (error) {
    > 80 |     console.error(error);
         |             ^
      81 |     return {
      82 |       statusCode: 500,
      83 |       message: 'Internal Server Error',

      at Object.error [as deleteJob] (service/jobsService.js:80:13)
      at Object.<anonymous> (tests/deleteJobsService.test.js:33:22)

- Update Job Service: PASS (Error memastikan bahwa Error Handling berjalan dengan baik)
  Console Output :
        console.error
      Error: Database Error
          at Object.<anonymous> (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\tests\updateJobsService.test.js:45:42)    
          at Promise.then.completed (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:298:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\utils.js:231:10)
          at _callCircusTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:316:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:252:3)        
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:126:9)
          at _runTestsForDescribeBlock (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:121:9)
          at run (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\run.js:71:3)
          at runAndTransformResultsToJestFormat (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapterInit.js:122:21)
          at jestAdapter (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-circus\build\legacy-code-todo-rewrite\jestAdapter.js:79:19)
          at runTestInternal (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:367:16)
          at runTest (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\runTest.js:444:34)    
          at Object.worker (D:\Coding Development\79 - Use Case Jobstreet\backend-express\jobstreet-express\node_modules\jest-runner\build\testWorker.js:106:12)

      102 |     }
      103 |   } catch (error) {
    > 104 |     console.error(error);
          |             ^
      105 |     return {
      106 |       statusCode: 500,
      107 |       message: 'Internal Server Error',

      at Object.error [as updateJob] (service/jobsService.js:104:13)
      at Object.<anonymous> (tests/updateJobsService.test.js:47:22)

