/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const parseString = (propertyValue: any, propertyName: any): string => {
	if (!propertyValue || !isString(propertyValue)) {
		throw new Error(`Incorrect or missing ${propertyName}: ${propertyValue}`);
	}
	return propertyValue;
};

const isString = (text: any): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
  };

const parseDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing date: ${date}`);
	}
	return date;
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error(`Incorrect or missing gender: ${gender}`);
	}
	return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => { /* eslint-disable @typescript-eslint/no-explicit-any */
	return {
		name: parseString(object.name, "name"),
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: parseString(object.ssn, "ssn"),
		gender: parseGender(object.gender,),
		occupation: parseString(object.occupation, "occupation"),
	};
};

export default toNewPatientEntry;