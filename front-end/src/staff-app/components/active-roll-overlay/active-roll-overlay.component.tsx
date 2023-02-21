import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { useAppSelector } from "utils/hooks"

export type ActiveRollAction = "filter" | "exit" | "complete"

interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string | any[] | { student_roll_states: any[] }) => void
}


export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick } = props
  let updatedStateList = useAppSelector((state) => state.student.students)
  updatedStateList = updatedStateList.map(({ id, roll_state, ...rest }) => ({ student_id: id, roll_state }))
  const presentCount = updatedStateList.filter((obj) => obj.roll_state === "present").length
  const lateCount = updatedStateList.filter((obj) => obj.roll_state === "late").length
  const absentCount = updatedStateList.filter((obj) => obj.roll_state === "absent").length
  const allCount = presentCount + lateCount + absentCount

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: allCount },
              { type: "present", count: presentCount },
              { type: "late", count: lateCount },
              { type: "absent", count: absentCount },
            ]}
            onItemClick={(action, value) => onItemClick(action, value)}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("complete", {student_roll_states:updatedStateList})}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
