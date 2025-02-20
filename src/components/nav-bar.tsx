import Link from 'next/link';
import Image from 'next/image';
import githubIcon from '@/content/icons/github.svg'
import ThemeToggle from "@/components/theme-toggle";
import profileImage from '@/content/profile.png';

export default function NavBar() {

    return (
        <>
            <header className='pt-16 px-16'>
                <nav>
                    <menu>
                        <Link href='/' className='text-3xl'>
                            <Image src={profileImage} alt='Profile picture' height={60} width={60} className='rounded-full' />
                            Olav Fykse
                        </Link>
                        <ul className='flex flex-row gap-7 justify-end'>

                            <li><Link href='/blog' className='dark:hover:bg-blue-900 p-2 rounded'>Archive</Link></li>
                            <li><Link href='/image-analysis' className='dark:hover:bg-blue-900 p-2 rounded'>Image analysis</Link></li>
                            <div className='inline-flex'>
                                <li>
                                    <Link href='https://github.com/bouvet-ofykse' target='_blank'>
                                        <Image src={githubIcon.src} width={24} height={24} priority={true} alt='GitHub icon' className='hover:fill-amber-200'/>
                                    </Link>
                                </li>
                                <li><ThemeToggle /></li>
                            </div>
                        </ul>
                    </menu>
                    <hr className='mt-8'/>

                </nav>
            </header>
        </>
    );
}