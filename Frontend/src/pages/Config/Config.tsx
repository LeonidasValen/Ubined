import { Outlet } from "react-router-dom"
import { ConfigNavigate } from "./components/ConfigNavigate"
import './config.css'

export function Config() {
    return (
        <main className="mainConfig">
            <ConfigNavigate />
            <section className="configContent">
                <Outlet/>
            </section>
        </main>
    )
}
