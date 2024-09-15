import { SchoolColum1 } from "../components/DSchoolColum1/SchoolColum1";
import { SchoolColum2 } from "../components/DSchoolColum2/SchoolColum2";
import './DetailSchool.css'

export function DetailSchool() {
  return (
    <main className="schoolInfoContent">
      <SchoolColum1/>
      <SchoolColum2/>
    </main>
  )
}
