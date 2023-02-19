import { createSlice} from "@reduxjs/toolkit";
import { Person } from "shared/models/person";

interface StudentState {
    students:any[],
    type:string
  }
  
  const initialState: StudentState = {
    students: [],
    type:"unmark"
  }
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudentAttendance: (state, action) => {
    const {student,detail}=action.payload
    const existingIndex = state.students.findIndex(obj => obj.id === student.id)
        if(existingIndex===-1)
        {
        state.students=[...state.students,{...student,detail}]
        }
        else{
        state.students[existingIndex].detail = detail
        }
    
    },
    updatedType:(state,action)=>{
      state.type=action.payload
    },
    clearStudentList:(state)=>{
        state.students=[]
    }
  },
  
});

export const { updateStudentAttendance,clearStudentList,updatedType} = studentSlice.actions;

export default studentSlice.reducer;
