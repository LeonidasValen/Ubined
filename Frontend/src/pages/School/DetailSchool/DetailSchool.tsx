import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSchool } from "../../../context/schoolContext";
import { SchoolColum1 } from "../components/DSchoolColum1/SchoolColum1";
import { SchoolColum2 } from "../components/DSchoolColum2/SchoolColum2";
import './DetailSchool.css'

export function DetailSchool() {

  const { getSchool, loading, school } = useSchool()

  const { schoolId } = useParams<{ schoolId: string }>();

  useEffect(() => {
    if (schoolId) {
      getSchool(Number(schoolId))
    }
  }, [])

  if (loading) {
    return (
      <h1>loading...</h1>
    )
  }

  return (
    <main className="schoolInfoContent">
      {school.length > 0
        ? (
          <>
            <SchoolColum1 provincia={school[0].provincia} localidad={school[0].localidad} address={school[0].address} phone={school[0].phone} web={school[0].web} email={school[0].email} socialMedia={school[0].socialMedia}/>
            <SchoolColum2 nameSchool={school[0].nameSchool} type={school[0].type} cue={school[0].cue} nivel={school[0].nivel} horary={school[0].horary} desc={school[0].desc} modalities={school[0].modalities} director={school[0].director} subdirector={school[0].subdirector} secretario={school[0].secretario} team_ori={school[0].team_ori} center_st={school[0].center_st} library={school[0].library} yard={school[0].yard} dining_room={school[0].dining_room} food_sr={school[0].food_sr} requirement={school[0].requirement}/>
          </>
        )
        : (
          <h1>Escuela no encontrada</h1>
        )
      }
    </main>
  )
}
