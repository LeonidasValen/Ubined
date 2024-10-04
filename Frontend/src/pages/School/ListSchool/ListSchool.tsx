import { Link } from 'react-router-dom'
import './listSchool.css'
import { useEffect } from 'react';
import { useSchool } from '../../../context/schoolContext';

export function ListSchool() {

  const {getSchools, schools, loading, error} = useSchool()

  useEffect(()=>{
    getSchools()
}, [])

  if (loading) {
    return <div>...loading</div>
}

if (error && error.length > 0) {
  return (
    <div className="error-message">
      <h2>{error}</h2>
    </div>
  );
}

  return (
    <>
    {schools.length > 0
      ? (
        schools.map((escuela) => (
          <article className='schoolContent' key={`School-${escuela.schoolId}`}>
            <Link to={`/school/${escuela.schoolId}`} className="sMiniature">
              <img src="/./img/escuela-reference.jpg" alt="" />
            </Link>

            <Link to={'/school/1'} className="sInfo">
              <div className='sTitle'>
                <h3>{escuela.NameSchool}</h3>
                <p className={`sType ${escuela.type}`}>{escuela.type}</p>
              </div>
              <div className='sInfoContent'>
                <div className="sData">
                  <p className='sDirec'>• {escuela.provincia}, {escuela.localidad} • {escuela.address}</p>
                </div>
                <span className='sDesc'>{escuela.desc}</span>
                <div className='sItems'>
                  <span>Nivel:</span>
                  <p>{escuela.nivel}</p>
                </div>
              </div>
            </Link>
          </article>
        ))
      )
      : (
        <h1>ningun posts</h1>
      )
    }

    </>
  )
}
