export interface diagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}
export enum Gender {
	Male = 'male',
	Female = 'female',
	Others = 'others'
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<diagnoseEntry['code']>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export enum Hospital {
	HealthCheck = 'HealthCheck',
	Hospital = 'Hospital',
	OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface HealthCheckEntry extends BaseEntry {
	type: Hospital.HealthCheck;
	healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
	type: Hospital.Hospital;
	discharge: {
		date: string;
		criteria: string;
	};
}
interface OccupationalHealthcareEntry extends BaseEntry {
	type: Hospital.OccupationalHealthcare;
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	}
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface patientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[]
}

export type NewBase = Omit<BaseEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id' | 'type'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id' | 'type'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id' | 'type'>;

export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<patientEntry, 'id' | 'entries'>;
export type NewEntry =
	| Omit<HealthCheckEntry, 'id'>
	| Omit<OccupationalHealthcareEntry, 'id'>
	| Omit<HospitalEntry, 'id'>;