import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {getMyBuilds} from "@/lib/builds";
import {TypographyH3} from "@/components/ui/typography-h3";
import {BuildCard} from "@/app/builds/components/builds-card";

export default async function MyBuilds() {
    const session = await auth();

    if (!session?.user.id) {
        redirect("/login");
    }

    const builds = await getMyBuilds(session.user.id);

    return (
        <div className="py-6">
            <TypographyH3>My PC Builds</TypographyH3>
            <br/>
            <div className="grid gap-4 lg:grid-cols-3">
                {
                    builds.length > 0 ? (
                        builds.map(b => (
                            <BuildCard
                                key={b.id}
                                build={b}
                            >
                                ...
                            </BuildCard>
                        ))
                        ) : (
                        <p className="text-muted-foreground">No PC builds saved yet</p>
                    )
                }
            </div>
        </div>
    )
}