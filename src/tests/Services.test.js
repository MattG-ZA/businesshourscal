import { CheckBusinessHours } from 'services/Services';
import testConfig from './TestConfig.json';

test('invalid date input returns false', () => {
    expect(CheckBusinessHours('not a date', testConfig)).toBe('false');
});

test('date input is on workday, in work hours, returns true', () => {
    expect(CheckBusinessHours('2019-12-02 09:00:00', testConfig)).toBe('true');
});

test('date input is on workday, outside work hours, returns next business day', () => {
    expect(CheckBusinessHours('2019-12-02 01:00:00', testConfig)).toBe('false, Next business day is "2019-12-03"');
});

test('date input is outside workday, returns next business day', () => {
    expect(CheckBusinessHours('2019-12-01 09:00:00', testConfig)).toBe('false, Next business day is "2019-12-02"');
});

test('date input is on public holiday returns next business day', () => {
    expect(CheckBusinessHours('2019-12-25 09:00:00', testConfig)).toBe('false, Next business day is "2019-12-27"');
});

test('date input is on work day, in 1st break, returns next open time', () => {
    expect(CheckBusinessHours('2019-12-02 10:12:00', testConfig)).toBe(`false, We're just on a break. We'll be back at "10:15:00"`);
});

test('date input is on work day, in 2nd break, returns next open time', () => {
    expect(CheckBusinessHours('2019-12-02 12:01:00', testConfig)).toBe(`false, We're just on a break. We'll be back at "13:00:00"`);
});