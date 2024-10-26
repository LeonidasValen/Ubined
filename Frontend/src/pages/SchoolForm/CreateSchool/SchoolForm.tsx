import { useEffect } from "react"
import { useAuth } from "../../../context/authConext"
import '../shoolForm.css'
import {useNavigate } from "react-router-dom"

export function SchoolForm() {

  const {user} = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user?.rol !== 'Verify') {
      navigate('/schools')
    }
  }, [user])

  return (
    <main className="schoolForm">
        
    </main>
  )
}
