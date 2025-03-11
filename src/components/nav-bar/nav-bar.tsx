import Link from 'next/link';
import Image from 'next/image';
import githubIcon from '@/content/icons/github.svg'
import profileImage from '@/content/profile.png';
import styles from './nav-bar.module.css'
import NavbarItem from "@/components/nav-bar/nav-bar-item";

export default function NavBar() {

    return (
        <header className={styles.header}>

            <Link href='/' className={styles.hero}>
                <Image src={profileImage} alt='Profile picture' height={70} width={70}  className={styles['hero-img']}/>
                <span>Olav Fykse</span>
            </Link>
            <nav className={styles['nav-bar']}>
                <ul className={styles['nav-bar-items']}>
                    <NavbarItem name='Archive' path={'/blog'} />
                    <NavbarItem name='Image Analysis' path='/image-analysis' />
                    <NavbarItem name='Memory Game' path='/memory-game' />
                    <li>
                        <Link href='https://github.com/bouvet-ofykse' target='_blank'>
                            <Image src={githubIcon.src} width={24} height={24} priority={true} alt='GitHub icon'
                                   className='hover:fill-amber-200'/>
                        </Link>
                    </li>
                    {/*<li><ThemeToggle/></li>*/}
                </ul>
            </nav>
        </header>
    );
}