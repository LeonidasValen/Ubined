import { Link } from "react-router-dom";
import { IconConfig, IconInterrogation, IconMapMarked, IconPadLock, IconShield, IconUser } from "../../../assets/Icons";

export function ConfigNavigate() {
  return (
    <aside className="configAside">
      <Link to={'profile'} className="btnConfig actived"><IconUser/>Pérfil</Link>
      <Link to={'security'} className="btnConfig"><IconPadLock/>Contraseña y seguridad</Link>
      <Link to={'editInsti'} className="btnConfig"><IconMapMarked/>Editar institución</Link>
      <Link to={'config'} className="btnConfig"><IconConfig/>Configuración</Link>
      <Link to={'help'} className="btnConfig"><IconInterrogation/>Ayuda y soporte</Link>
      <Link to={'politicsPrivacity'} className="btnConfig"><IconShield/>Políticas y privacidad</Link>
    </aside>
  )
}
