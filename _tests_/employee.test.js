
const index = require('../lib/employee')

test('employee getName returns employee name', () => {
    const test1 = new Employee('student1', "id1", 'email1', 'intern')
    expects(test1.getName()).toBe('student1')
})