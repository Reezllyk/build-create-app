import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TypographyH3} from "@/components/ui/typography-h3";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Pencil} from "lucide-react";
import type { ReactNode } from "react";

type BuildCard = {
    user: {
        email: string;
    };
    id: string;
    name: string;
    totalPrice: number;
    createdAt: Date | null;
    components: Array<{
        id: string;
        component: {
            name: string
        };
    }>
}

type Props = {
    build: BuildCard,
    children?: ReactNode,
}

export function BuildCard({
    build,
    children,
}: Props) {
    return (
        <Card className="
            flex flex-col
            border-white/10
            bg-gradient-to-b
            from-white/[0.05]
            to-white/[0.02]
            backdrop-blur-md
            shadow-xl
        ">
            <CardHeader className="pb-4 flex flex-row items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <TypographyH3>
                        {build.name}
                    </TypographyH3>

                    <p className="mt-2 text-xs text-muted-foreground">
                        Created by
                    </p>

                    <p className="text-sm text-muted-foreground truncate">
                        {build.user?.email}
                    </p>
                </div>

                <Button size="icon" className="shrink-0">
                    <Link href={`/builds/${build.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="flex-1 pt-0 space-y-1 gap-2">
                {
                    build.components.length && (
                        <>
                            <p className="text-sm font-medium mt-2">Components:</p>
                            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                                {
                                    build.components.map(bc => (
                                        <li key={bc.id}>{bc.component.name}</li>
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </CardContent>
            <CardFooter className="flex flex-row justify-between gap-2 py-4 border-t">
                <CardDescription className="text-sm font-medium tabular-nums flex flex-col justify-between">
                    <span className="text-sky-500 text-lg font-bold">
                        {new Intl.NumberFormat("ua-UA").format(build.totalPrice)}
                    </span>

                    {
                        build.createdAt && (
                            <p className="tex-xs text-muted-foreground">{
                                new Intl.DateTimeFormat("ua-UA").format(build.createdAt)
                            }</p>
                        )
                    }

                    <div className="flex flex-row gap-2">
                        {children}
                    </div>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}