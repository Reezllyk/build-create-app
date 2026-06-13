"use client"

import {Session} from "next-auth";
import {usePathname} from "next/navigation";
import {getTabValue} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LayoutList, Plus, Users} from "lucide-react";
import {signOut} from "next-auth/react";

type Props = {
    session: Session | null
}

export function HeaderNav({ session }: Props) {
    const pathname = usePathname();
    const tabValue = getTabValue(pathname)

    if (!session?.user) {
        return (
            <div className="flex justify-end">
                <Button variant="secondary">
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-between w-full">
            <div/>
            <div className="flex justify-center">
                <Tabs value={tabValue} className="w-fit">
                    <TabsList>
                        <TabsTrigger value="dashboard" asChild>
                            <Link href="/dashboard">
                                <Plus className="h-4 w-4" />
                                Create a PC build
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="builds" asChild>
                            <Link href="/builds">
                                <LayoutList className="h-4 w-4" />
                                My PC builds
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="explore" asChild>
                            <Link href="/builds/explore">
                                <Users className="h-4 w-4" />
                                Public PC builds
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => signOut({ redirectTo: "/" })}
                >
                    Exit
                </Button>
            </div>
        </div>
    )
}