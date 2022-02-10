const args = process.argv.splice(2);
const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`SELECT DISTINCT teachers.name AS teacher, 
cohorts.name AS cohorts 
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]||JUL}%'
ORDER BY teacher;`)
  .then((res) => {
    res.rows.forEach(row => {
      console.log(`${row.cohorts}: ${row.teacher}`);
    })
  });