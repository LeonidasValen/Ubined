import { IconEdit, IconEmail } from "../../../../assets/Icons";
import { useAuth } from "../../../../context/authConext";
import './profile.css'

export function Profile() {

  const { loading, isAuthenticated, user } = useAuth();

  return (
    <>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        isAuthenticated && user ? (
          <div className="profile">
            <div className="pData">
              <div className="imgProfile">
                {user?.profile
                  ? <img src={`/./img/${user?.profile}`} alt="User profile" />
                  : <img src="/./img/userh.png" alt="Default user" />
                }
              </div>
              <div className="userInfo">
                <h1>{user.title}</h1>
                <span><IconEmail/>{user.email}</span>
              </div>
            </div>
            <button><IconEdit />Editar perfil</button>
          </div >
        ) : (
          <h1>usuario no encontrado</h1>
        )
      )
      }
    </>
  )
}