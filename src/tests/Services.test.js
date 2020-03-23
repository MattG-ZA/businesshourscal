import { CheckBusinessHours } from 'services/Services';

test('invalid input returns false', () => {
    expect(CheckBusinessHours('test')).toBe("false");
});