import { Sidebar, SidebarElement } from "../../components/sidebar/sidebar"
import styles from "./dashboard.module.css"
export default function Dashboard() {
    return (
        <>
            <div className={`${styles["dashboard-container"]}`}>
                <Sidebar>
                    <SidebarElement icon={
                        <i class="bi bi-house"></i>
                    } text={"Home"}></SidebarElement>
                </Sidebar>
                <main className={`${styles["content"]}`}>
                    Main stuff
                    </main>
            </div>
        </>
    )
}