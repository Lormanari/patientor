import patients from '../../data/patients';
import { NonSensitivePatientEntry, patientEntry, NewPatientEntry } from '../types';
import uniqid from "uniqid";

const getEntries = (): patientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
	id,
	name,
	dateOfBirth,
	gender,
	occupation
}));
};

const addPatient = (entry: NewPatientEntry): patientEntry => {

	const NewPatientEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		id: String(uniqid()),
		...entry
	};

	patients.push(NewPatientEntry);
	return NewPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};