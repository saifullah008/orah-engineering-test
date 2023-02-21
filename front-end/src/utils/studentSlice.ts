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
      const { student, roll_state } = action.payload
      const existingIndex = state.students.findIndex((obj) => obj.id === student.id)
      if (existingIndex === -1) {
        state.students = [...state.students, { ...student, roll_state }]
      } else {
        state.students[existingIndex].roll_state = roll_state
      }
    },
    updatedType: (state, action) => {
      state.type = action.payload
    },
    clearStudentList: (state) => {
      state.students = []
    },
  },
})

export const { updateStudentAttendance, clearStudentList, updatedType } = studentSlice.actions

export default studentSlice.reducer
