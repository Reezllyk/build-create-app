"use client"

import {Session} from "next-auth";
import {usePathname} from "next/navigation";
import {getTabValue} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LayoutList, Plus, Users} from "lucide-react";
import {signOut} from "next-auth/react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

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
        <div className="flex items-center justify-between w-full gap-3">
            <div className="overflow-x-auto scrollbar-none">
                <Tabs value={tabValue}>
                    <TabsList>
                        <TabsTrigger value="dashboard" asChild>
                            <Link href="/dashboard">
                                <Plus className="h-4 w-4" />
                                <span className="hidden md:inline">
                                    Create a PC build
                                </span>
                            </Link>
                        </TabsTrigger>

                        <TabsTrigger value="builds" asChild>
                            <Link href="/builds">
                                <LayoutList className="h-4 w-4" />
                                <span className="hidden md:inline">
                                    My PC builds
                                </span>
                            </Link>
                        </TabsTrigger>

                        <TabsTrigger value="explore" asChild>
                            <Link href="/builds/explore">
                                <Users className="h-4 w-4" />
                                <span className="hidden md:inline">
                                    Public PC builds
                                </span>
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>


            <div className="flex gap-1 items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden sm:flex flex-col leading-none">
                    <span className="text-sm font-medium">
                        {session.user.name}
                    </span>
                        <span className="text-xs text-muted-foreground">
                        {session.user.email}
                    </span>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="shrink-0"
                    onClick={() => signOut({ redirectTo: "/" })}
                >
                    Exit
                </Button>
            </div>
        </div>
    );
}