import styles from './footer.module.css';

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div>
                <span>Laget med Next.js og React · © {new Date().getFullYear()} Olav Fykse</span>
            </div>
        </footer>
    );
}