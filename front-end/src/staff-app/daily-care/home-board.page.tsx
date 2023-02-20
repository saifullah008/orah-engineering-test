import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person, PersonHelper } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { useAppDispatch, useAppSelector } from "utils/hooks"
import { addRecord, clearStudentList } from "utils/studentSlice"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredStudent, setFilteredStudent] = useState<Person[]>([])
  const [toggle, setToggle] = useState(false)
  const [sortOption, setSortOption] = useState("")
  const allStudents = data?.students
  const dispatch = useAppDispatch()
  const studentList = useAppSelector((state) => state.student.students)
  const type = useAppSelector((state) => state.student.type)

  function filterData(searchQuery: string, students: Person[]) {
    const filteredData = students?.filter((student) => PersonHelper.getFullName(student).toLowerCase().includes(searchQuery.toLowerCase()))
    return filteredData
  }

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (allStudents) {
      setFilteredStudent(allStudents)
    }
  }, [allStudents])

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = filterData(searchQuery, data?.students)
      setFilteredStudent(value)
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [searchQuery])
  useEffect(() => {
    const sortedArray = filteredStudent.slice().sort((a, b) => {
      if (sortOption === "first_name") {
        return a.first_name.localeCompare(b.first_name)
      } else if (sortOption === "last_name") {
        return a.last_name.localeCompare(b.last_name)
      }
      return a.id - b.id
    })

    setFilteredStudent(sortedArray)
  }, [sortOption])

  const handleSortByOrder = () => {
    if (toggle) filteredStudent.sort((a, b) => a.id - b.id)
    else filteredStudent.sort((a, b) => b.id - a.id)
    setToggle(!toggle)
  }

  const handleSortByField = (option: string) => {
    setSortOption(sortOption === option ? "" : option)
  }
  const onToolbarAction = (action: ToolbarAction, value?: string) => {
    if (action === "roll") {
      setIsRollMode(true)
    } else if (action === "sort") {
      if (value === "first_name") {
        handleSortByField(value)
      } else if (value === "last_name") {
        handleSortByField(value)
      } else if (value == "by_order") {
        handleSortByOrder()
      }
    }
  }
  const handleExit = () => {
    dispatch(clearStudentList())
  }

  const onActiveRollAction = (action: ActiveRollAction, value?: string) => {
    if (action === "exit") {
      setIsRollMode(false)
      handleExit()
    } else if (action === "complete") {
      setIsRollMode(false)
      dispatch(addRecord(value))
      handleExit()
    } else if (action === "filter") {
      const data = studentList.filter((student) => student.detail === value)
      if (value === "present") {
        setFilteredStudent(data)
      } else if (value === "absent") {
        setFilteredStudent(data)
      } else if (value === "late") {
        setFilteredStudent(data)
      } else if (value === "all") {
        setFilteredStudent(studentList)
      }
    }
  }

  if (!data?.students) return null

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortOption={sortOption} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && filteredStudent && (
          <>
            {filteredStudent.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  searchQuery: string
  sortOption: string
  setSearchQuery: (value: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, searchQuery, sortOption, setSearchQuery } = props

  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort", "by_order")}>First Name</div>
      <div>
        <label>firstname</label>
        <input type="checkbox" checked={sortOption === "first_name"} onClick={() => onItemClick("sort", "first_name")} />
        <label>lastname</label>
        <input type="checkbox" checked={sortOption === "last_name"} onClick={() => onItemClick("sort", "last_name")} />
      </div>

      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
