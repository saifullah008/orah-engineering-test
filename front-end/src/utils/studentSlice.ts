import { createSlice } from "@reduxjs/toolkit"
import { RolllStateType } from "shared/models/roll"

interface StudentState {
  students: any[]
  type: RolllStateType
  studentsRollRecords: any[]
}

const initialState: StudentState = {
  students: [],
  type: "unmark",
  studentsRollRecords: [],
}
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudentAttendance: (state, action) => {
      const { student, detail } = action.payload
      const existingIndex = state.students.findIndex((obj) => obj.id === student.id)
      if (existingIndex === -1) {
        state.students = [...state.students, { ...student, detail }]
      } else {
        state.students[existingIndex].detail = detail
      }
    },
    updatedType: (state, action) => {
      state.type = action.payload
    },
    clearStudentList: (state) => {
      state.students = []
    },
    addRecord: (state, action) => {      
      state.studentsRollRecords.push(action.payload)
    },
  },
})

export const { updateStudentAttendance, clearStudentList, updatedType, addRecord } = studentSlice.actions

export default studentSlice.reducer
