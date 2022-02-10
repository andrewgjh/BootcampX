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


value = [`%${args[0]||JUL}%`]
const queryString =`SELECT DISTINCT teachers.name AS teacher, 
cohorts.name AS cohorts 
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`

pool.query(queryString, value)
  .then((res) => {
    res.rows.forEach(row => {
      console.log(`${row.cohorts}: ${row.teacher}`);
    })
  });