import Link from "next/link";
import styles from "./style.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.innerNav}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <div className={styles.square}></div>
            <h1>Alex Bobyr</h1>
          </div>
        </Link>
        <ul className={styles.list}>
          <Link href="/challenges">
            <li>Posts</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
