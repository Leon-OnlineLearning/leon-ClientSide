import Sidebar from "../../components/sidebar/sidebar"
import styles from "./dashboard.module.css"
export default function Dashboard() {
    return (
        <>
<div className={`${styles["dashboard-container"]}`}>
            <Sidebar>
                djskaldj
                </Sidebar>
            <main className={`${styles["content"]}`}>
                Main stuff
                    </main>
</div>
        </>
    )
}