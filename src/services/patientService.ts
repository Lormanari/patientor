import patients from '../../data/patients';
import { NonSensitivePatientEntry, patientEntry, NewPatientEntry, Entry, NewEntry } from '../types';
import uniqid from "uniqid";

const getPatients = (): patientEntry[] => {
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

const getPatientById = (id: string):patientEntry | undefined=> {
	return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): patientEntry => {
	const NewPatientEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		id: String(uniqid()),
		...entry,
		entries: [],
	};

	patients.push(NewPatientEntry);
	return NewPatientEntry;
};

const addEntry = (data: NewEntry, entries: NewEntry[]): Entry => {
	const NewData = {
		id: String(uniqid()),
		...data
	};
	entries.push(NewData);
	return NewData;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntry
};