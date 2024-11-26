import styles from "./index.module.css";
import Link from "next/link";

export default function LabLink(
    {
        title,
        subtitle,
        link
    }: Readonly<{
        title: string;
        subtitle?: string;
        link: string;
    }>
) {
    return <Link
        href={link}
        className={styles.LabLink}
    >
        <h3>{title}</h3>
        {!!subtitle && <>: <p> {subtitle}</p> </>}
    </Link>
}