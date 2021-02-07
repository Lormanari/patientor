/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	NewPatientEntry,
	Gender,
	NewBase,
	HealthCheckRating,
	NewHealthCheckEntry,
	NewHospitalEntry,
	NewOccupationalHealthcareEntry,
	Hospital,
	NewEntry } from './types';

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

const isRate = (param: any): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseRate = (rate: any): HealthCheckRating => {
	if (!isRate(rate)) {
		throw new Error(`Incorrect or missing Health check rate: ${rate}`);
	}
	return rate;
};

// const isHospital = (param: any): param is Hospital => {
// 	return Object.values(Hospital).includes(param);
// };

// const parseHospital = (hospital: any): Hospital => {
// 	if (!hospital || !isHospital(hospital)) {
// 		throw new Error(`Incorrect or missing hospital type: ${hospital}`);
// 	}
// 	return hospital;
// };

// const isType = (param: NewHealthCheckEntry, type: Hospital): param is NewHealthCheckEntry => {
// 	return param.type === type;
// };

// const parseType = (hospitalType: any, type: Hospital): NewHealthCheckEntry => {
// 	if (!hospitalType || !isType(hospitalType, type)) {
// 		throw new Error(`Incorrect or missing type: ${hospitalType}`);
// 	}
// 	return hospitalType;
// };

const toNewPatientEntry = (object: any): NewPatientEntry => { /* eslint-disable @typescript-eslint/no-explicit-any */
	return {
		name: parseString(object.name, "name"),
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: parseString(object.ssn, "ssn"),
		gender: parseGender(object.gender,),
		occupation: parseString(object.occupation, "occupation"),
	};
};
const toNewBaseEntry = (object: any): NewBase => { /* eslint-disable @typescript-eslint/no-explicit-any */
	return {
		description: parseString(object.description, "description"),
		date: parseDate(object.date),
		specialist: parseString(object.specialist, "specialist"),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		diagnosisCodes: object.diagnosisCodes.map((code: any) => parseString(code, "diagnosisCode"))
	};
};
const toNewHealthCheckEntry = (object: any): NewHealthCheckEntry => {
	return {
		...toNewBaseEntry(object),
		healthCheckRating: parseRate(object.healthCheckRating),
		// type: parseHospital(object.type),
	};
};
const toNewHospitalEntry = (object: any): NewHospitalEntry => {
	return {
		...toNewBaseEntry(object),
		discharge: {
			date: parseDate(object.discharge.date),
			criteria: parseString(object.discharge.criteria, "discharge criteria")
		}
		// type: parseHospital(object.type),
	};
};

const toNewOccupationalHealthcareEntry = (object: any): NewOccupationalHealthcareEntry => {
	const sickLeave = object.sickLeave && {
		startDate: parseDate(object.sickLeave.startDate),
		endDate: parseDate(object.sickLeave.endDate)
	};

	return {
		...toNewBaseEntry(object),
		// type: parseHospital(object.type),
		employerName: parseString(object.employerName, "employerName"),
		sickLeave,
	};
};
const assertNever = (value: any): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};
const toNewEntry = (object: any): NewEntry => {
	switch(object.type){
		case Hospital.HealthCheck: {
			return {
				...toNewHealthCheckEntry(object),
				type: Hospital.HealthCheck
			};
		}
		case Hospital.Hospital: {
			return {
				...toNewHospitalEntry(object),
				type: Hospital.Hospital
			};
		}
		case Hospital.OccupationalHealthcare: {
			return {
				...toNewOccupationalHealthcareEntry(object),
				type: Hospital.OccupationalHealthcare
			};
		}
		default:
			return assertNever(object);
	}
};

export default { toNewPatientEntry, toNewEntry};