import styles from './sidebar.module.css'
/**
 * 
 * @param {Object} props props for sidebar components
 * @param {React.Component} props.children 
 */
export default function Sidebar(props) {
    return (
        <nav className={`${styles["sidebar"]} bg-dark text-light`}>
            {props.children}
        </nav>
    );
}