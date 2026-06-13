import Link from "next/link";
import {auth} from "@/auth";
import {TypographyH3} from "@/components/ui/typography-h3";
import {HeaderNav} from "@/components/header-nav";

export async function Header() {
    const session = await auth();
    return (
        <header className="container mx-auto flex items-center justify-between p-4">
                <TypographyH3>
                    <Link href={session?.user ? "/" : "/"}>PC Builder</Link>
                </TypographyH3>

                <nav className="flex-1 ml-8">
                    <HeaderNav session={session} />
                </nav>
        </header>
    )
}