import { Outlet } from "react-router-dom"
import { ConfigNavigate } from "@pages/Config/components/ConfigNavigate"
import './config.css'

export function Config() {
    return (
        <main className="mainConfig">
            <div className="configContainer">
                <ConfigNavigate />
                <section className="configContent">
                    <Outlet />
                </section>
            </div>
        </main>
    )
}
