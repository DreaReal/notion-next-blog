import Link from "next/link";
import styles from "./style.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
        <Link href="/about">
          <div className={styles.logoContainer}>
            <div className={styles.square}></div>
            <h1>Dreams harbor</h1>
          </div>
        </Link>
        <ul className={styles.list}>
          <Link href="/">
            <li>Posts</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
