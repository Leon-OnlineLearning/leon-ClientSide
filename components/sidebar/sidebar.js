import styles from './sidebar.module.css'
/**
 * 
 * @param {Object} props props for sidebar components
 * @param {React.Component} props.children 
 */
export function Sidebar(props) {
    return (
        <nav className={`${styles["sidebar"]} bg-dark text-light`}>
            {props.children}
        </nav>
    );
}


/**
 * 
 * @param {Object} props
 * @param {React.Component} icon
 * @param {string} text
 */
export function SidebarElement({icon, text}) {
   return ( <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
       {icon}
       {text}
   </div>  );
}