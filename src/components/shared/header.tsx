import { Search, ShoppingCart, UserCircle } from "lucide-react"
import Link from "next/link"
import Navbar from "./menu"
import Image from "next/image"
import FilterModals from "@/app/(home)/_components/filter/FilterModals"

export const Header = () => {
    return (
        <>
            <header className="bg-black w-full h-20 text-white">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-lg">
                        <div className={'flex justify-center lg:justify-start'}>
                            <Link href={"/"}>
                                <Image
                                    src="/images/header/tirematic-logo.png"
                                    alt="Tirematic"
                                    width={161}
                                    height={29}
                                />
                            </Link>
                        </div>
                        <div className="hidden lg:block">
                            <Navbar isHomePage />
                        </div>
                    </div>
                    <div className="flex items-center gap-lg">
                        <Search />
                        <Link href={'/'}>
                            <UserCircle />
                        </Link>
                        <Link
                            href={'/cart'}
                            className="relative"
                        >
                            <ShoppingCart />
                            <span className='absolute w-5 h-5 flex items-center justify-center font-semibold bg-primary text-white rounded-full text-[12px] z-0 firefox-badge chrome-badge'>
                                {1}
                            </span>
                        </Link>
                    </div>
                </div>
            </header>
            <FilterModals />
        </>
    )
}