function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
