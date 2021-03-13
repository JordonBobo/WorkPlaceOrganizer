


const Engineer = require('../lib/engineer')

test('employee getName returns employee name', () => {
    const test2 = new Engineer('student1', "id1", 'email1', 'engineer', 'github1');
    expect(test2.getGithub()).toBe('github1')
})