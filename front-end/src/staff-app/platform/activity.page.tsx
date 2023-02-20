// import React from "react"
// import { useAppSelector } from "utils/hooks"


// export const ActivityPage: React.FC = () => {

//     const studentsRollRecord=useAppSelector(state=>state.student.studentsRollRecords)
//   return <div>
//     {
//       studentsRollRecord.map(studentRecord => <Table record={studentRecord}/>)
    
//     }
//   </div>
// }
// const Table: React.FC = ({record}) => {
//   console.log(record);
  
//   return <div>
//     <table id="customers">
//   <tr>
//     <th>First Name</th>
//     <th>Last Name</th>
//     <th>Status</th>
//   </tr>
//   {record.map(student=><tr>
//     <td>{student?.first_name}</td>
//     <td>{student?.last_name}Maria Anders</td>
//     <td>{student.detail}</td>
//   </tr>
// }
  
// </table>
//   </div>
  
// }

import React from "react";
import { useAppSelector } from "utils/hooks";

export const ActivityPage: React.FC = () => {
  const studentsRollRecord = useAppSelector(
    (state) => state.student.studentsRollRecords
  );
  if(studentsRollRecord.length===0)
  {
    return <div>No Records ! please complete attendance first</div>
    
  }

  return (
    <div>
      {studentsRollRecord.map((studentRecord) => (
        <Table record={studentRecord} />
      ))}
    </div>
  );
};

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  detail: string;
}

interface Props {
  record: Student[];
}

const Table: React.FC<Props> = ({ record }) => {
  console.log(record);

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
              <td>{student.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
