import { Sidebar, SidebarElement } from "../sidebar/sidebar"
import Head from "next/head"
import styles from "./dashboard.module.css"
export default function DashboardLayout({SidebarElements, children}) {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className={`${styles["dashboard-container"]}`}>
                <Sidebar>
                    {SidebarElements}

                </Sidebar>
                <main className={`${styles["content"]}`}>
                    {children}
                    </main>
            </div>
        </>
    )
}