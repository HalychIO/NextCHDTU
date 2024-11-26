import styles from "./index.module.css";
import Link from "next/link";
import {ILink} from "@/interfaces";

export default function Header({Links}: { Links: ILink[] }) {
    return <header className={styles.Header}>
        <h4>Library calculators</h4>

        <nav className={styles.nav}>
            {Links.map(({href, text}, i) => (
                <Link href={href} className={styles.Link} key={"header" + i}> {text} </Link>
            ))}
        </nav>
    </header>;
}