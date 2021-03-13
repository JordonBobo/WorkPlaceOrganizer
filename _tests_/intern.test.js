


const Intern = require('../lib/intern')

test('employee getName returns employee name', () => {
    const test3 = new Intern('student1', "id1", 'email1', 'intern', 'school1');
    expect(test3.getSchool()).toBe('school1')
})