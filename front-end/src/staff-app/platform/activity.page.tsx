import React from "react"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { useAppSelector } from "utils/hooks"

export const ActivityPage: React.FC = () => {
  const studentsRollRecord = useAppSelector((state) => state.student.studentsRollRecords)
  if (studentsRollRecord.length === 0) {
    return <div>No Records ! please complete attendance first</div>
  }

  return (
    <div>
      {studentsRollRecord.map((studentRecord, index) => (
        <>
          <h3>Record-{index + 1} </h3>
          <Table key={index} record={studentRecord} />
        </>
      ))}
    </div>
  )
}

interface Student {
  id: number
  first_name: string
  last_name: string
  detail: string
}

interface Props {
  record: Student[]
}

const Table: React.FC<Props> = ({ record }) => {
  console.log(record)

  return (
    <div>
      <table className="customers">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {record.map((student) => (
            <tr key={student.id}>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>
                {student.detail}
                <RollStateIcon type={student.detail} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  )
}
