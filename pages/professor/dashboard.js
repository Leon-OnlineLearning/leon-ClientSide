import { Sidebar, SidebarElement } from "../../components/sidebar/sidebar"
import Head from "next/head"
import styles from "./dashboard.module.css"
export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className={`${styles["dashboard-container"]}`}>
                <Sidebar>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-house-fill"
                    } text={"Home"}></SidebarElement>
                    <SidebarElement href="/professor/dashboard" iconClassName={"bi-play-fill"
                    } text={"Lectures"}></SidebarElement>
                </Sidebar>
                <main className={`${styles["content"]}`}>
                    Main stuff
                    </main>
            </div>
        </>
    )
}