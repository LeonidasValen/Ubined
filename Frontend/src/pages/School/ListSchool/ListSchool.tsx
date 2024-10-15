import { Link } from 'react-router-dom'
import { useSchool } from '../../../context/schoolContext';
import './listSchool.css'
import { IconClock, IconSchool } from '../../../assets/Icons';
import { Loader } from '../../../components/Loader/Loader';

export function ListSchool() {

  const { schools, loading, error } = useSchool()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
        <Loader />
      </div>
    )
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
                  <div className='SItemInfo'>
                    <div className='sItems'>
                      <IconSchool />
                      <span>Nivel:</span>
                      <p>{escuela.nivel}</p>
                    </div>
                    <div className='sItems'>
                      <IconClock />
                      <span>Horary:</span>
                      <p>{escuela.horary}</p>
                    </div>
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
