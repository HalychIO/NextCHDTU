import LabLink from "@/components/Link/LabLink";
import styles from "./index.module.css";
import {ILink} from "@/interfaces";

export default function SubNavLab({Links}: { Links: ILink[] }) {
    return (
        <nav className={styles.nav}>
            {Links.map(({href, text}, i) => (
                <LabLink link={href} title={text} key={"SubLink" + text + i}/>
            ))}
        </nav>
    );
}