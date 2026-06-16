import Link from "next/link";
import {auth} from "@/auth";
import {TypographyH3} from "@/components/ui/typography-h3";
import {HeaderNav} from "@/components/header-nav";

export async function Header() {
    const session = await auth();
    return (
        <header className="container mx-auto px-4 py-4">
            <div className="flex gap-4 lg:flex-row md:flex-wrap md:flex-col lg:items-center lg:justify-between">
                <TypographyH3>
                    <Link href="/">PC Builder</Link>
                </TypographyH3>

                <nav className="flex-1 md:ml-8 lg:ml-35">
                    <HeaderNav session={session} />
                </nav>
            </div>
        </header>
    )
}