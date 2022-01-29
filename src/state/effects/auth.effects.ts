//  import axios from 'axios';
import Airtable from 'airtable'
import { call, put } from 'redux-saga/effects';

import { IClassState } from '../../types/models';
import * as authActions from '../actions/auth';

interface IStudentRecordType {
    destroy: () => void,
    fetch: () => void,
    fields: object,
    patchUpdate: () => void,
    putUpdate: () => void,
    replaceFields: () => void,
    save: () => void,
    updateFields: () => void,
    _rawJson: {
        createdTime: string,
        fields: {
            Classes: string[],
            Name: string
        },
        id: string
    },
    _table: object
}

interface IClassRecordType {
    destroy: () => void,
    fetch: () => void,
    fields: object,
    patchUpdate: () => void,
    putUpdate: () => void,
    replaceFields: () => void,
    save: () => void,
    updateFields: () => void,
    _rawJson: {
        createdTime: string,
        fields: {
            Students: string[],
            Name: string
        },
        id: string
    },
    _table: object
}

// Create new airtable object for fetching data
const base = new Airtable({ apiKey: 'keyf6vuzB50uR78Nj' }).base('app8ZbcPx7dkpOnP0')

// Create classes and students bases to query for individual tabel
const classes = base('Classes')
const students = base('Students')

// Query for getting a student record of this name 
function fetchClasses(name: string) {
    return students.select({ filterByFormula: `({Name} = "${name}")` }).all()
}

// Query for classes in these record id list
function fetchStudentsInClasses(ids: string[]) {
    let fomularStr = 'OR(RECORD_ID() = "'
    fomularStr += ids.join('", RECORD_ID() = "') + '")';
    return classes.select({ filterByFormula: fomularStr }).all()
}

// Query for students in these record id list
function fetchStudentsName(ids: string[]) {
    let fomularStr = 'OR(RECORD_ID() = "'
    fomularStr += ids.join('", RECORD_ID() = "') + '")';
    return students.select({ filterByFormula: fomularStr }).all()
}

// Group student list according to the class he is in
function groupStudentsByClass(classList: IClassRecordType[], studentList: IStudentRecordType[]) {

    // groups to be returned
    const groups: IClassState[] = [];
    classList.map(individualClass => {
        const studentsForThisClass: string[] = [];
        studentList.map(student => {

            // if the student is in the current class, add it to the student list for it
            if (student._rawJson.fields.Classes.indexOf(individualClass._rawJson.id) > 0) {
                studentsForThisClass.push(student._rawJson.fields.Name)
            }
        })
        groups.push({
            id: individualClass._rawJson.id,
            name: individualClass._rawJson.fields.Name,
            students: studentsForThisClass
        })
    })

    // Sort groups according to the class name and return it
    return groups.sort((a, b) => {
        if (a.name > b.name) { return 1 }
        else { return -1 }
    });
}

export function* login(action: any) {
    let payload;
    try {
        // Get the record of the logged in user
        //  @ts-ignore
        const resFirst = yield call(fetchClasses, action.payload);

        // Get the classes which this user is belonged to
        const myClasses = resFirst.map((record: IStudentRecordType) => record._rawJson.fields.Classes)

        // Get the records of the classes in the class list of the user
        //  @ts-ignore
        const resSecond = yield call(fetchStudentsInClasses, myClasses[0]);

        // Get the list of all the student ids who are in the class list required above
        const allStudentIds: string[] = []
        resSecond.forEach((record: IClassRecordType) => {
            record._rawJson.fields.Students.forEach((id: string) => {
                if (allStudentIds.indexOf(id) < 0) {
                    allStudentIds.push(id)
                }
            })
        });

        // Get the records of the students of this list
        //  @ts-ignore
        const resThird = yield call(fetchStudentsName, allStudentIds);

        // Group the users and send it to redux
        const usersState = groupStudentsByClass(resSecond, resThird);

        yield put(authActions.LoginSuccess(usersState))
    } catch (error) {
        payload = error.message;
        yield put(authActions.LoginFail(payload));

    }
}