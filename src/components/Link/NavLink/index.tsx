import styles from "./index.module.css";
import React from "react";

function NavLink({title, link}: { title: string, link: string }): React.ReactElement {

    return <a
        href={link}
        className={styles.NavLink}
    >
        {title}
    </a>
}

export default NavLink;