export interface diagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}
export enum Gender {
	Male = 'male',
	Female = 'female',
	Trans = 'trans',
	Neutral = 'neutral',
	NonBinary = 'non-binary',
	Agender = 'agender',
	Pangender = 'pangender',
	Genderqueer = 'genderqueer',
	TwoSpirit = 'two-spirit',
	ThridGender = 'third-gender',
	Others = 'others'
}

export interface patientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}



export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn'>;

export type NewPatientEntry = Omit<patientEntry, 'id'>;