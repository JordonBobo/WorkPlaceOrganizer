


const Manager = require('../lib/manager')

test('employee getName returns employee name', () => {
    const test4 = new Manager('student1', "id1", 'email1', 'intern', 'office1');
    expect(test4.getOffice()).toBe('office1')
})