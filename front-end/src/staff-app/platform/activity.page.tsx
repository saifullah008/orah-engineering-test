import React, { useEffect } from "react"
import { useApi } from "shared/hooks/use-api"
import { Activity } from "shared/models/activity"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"


export const ActivityPage: React.FC = () => {
  const [getStudentsRecords, data, loadState] = useApi<{activity:Activity[]}>({ url: "get-activities" })
  const studentsRollRecord = data?.activity


  useEffect(() => {
    void getStudentsRecords()
  }, [getStudentsRecords])

  if (!studentsRollRecord) {
    return <div>No Records ! please complete attendance first</div>
  }

  return (
    <div className="records-page-container">
      {loadState === "loaded" &&
        studentsRollRecord &&
        studentsRollRecord?.map((studentRecord, index) => {
          
          const completed_at = new Date(studentRecord?.date)
          const time=completed_at.toLocaleTimeString()
          const date=completed_at.toLocaleDateString()
          
          return(
            <>
            <div className="record-header">
            <h3>
              Record-{studentRecord?.entity?.name} 
            </h3>
            <h3>
            Completed At-{time}
            </h3>
            <h3> Date-{date}</h3>
            </div>
            <Table key={index} record={studentRecord?.entity?.student_roll_states} />
          </>
        )
        })}
    </div>
  )
}

interface Student {
  student_id: number
  roll_state: string
}

interface Props {
  record: Student[]
}

const Table: React.FC<Props> = ({ record }) => {
  return (
    <div>
      <table className="customers">
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {record?.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td className="student-status">
                {student.roll_state}
                <RollStateIcon type={student.roll_state as RolllStateType} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  )
}
