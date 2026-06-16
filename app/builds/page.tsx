import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import {getMyBuilds} from "@/lib/builds";
import {TypographyH3} from "@/components/ui/typography-h3";
import {BuildCard} from "@/app/builds/components/builds-card";
import {DeleteBuildButton} from "@/app/builds/components/delete-build-button";
import {deleteBuildAction, setBuildPublicAction} from "@/app/builds/actions";
import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";

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
            <div className="grid gap-4 lg:grid-cols-3 ">
                {
                    builds.length > 0 ? (
                        builds.map(b => (
                            <BuildCard
                                key={b.id}
                                build={b}
                            >
                                <DeleteBuildButton buildId={b.id} deleteAction={deleteBuildAction} />
                                <form action={setBuildPublicAction} className="contents">
                                    <input type="hidden" name="buildId" value={b.id} />
                                    <input type="hidden" name="isPublic" value={b.isPublic ? "false" : "true"} />
                                    <Button
                                        type="submit"
                                        variant={`${b.isPublic ? "default" : "ghost"}`}
                                    >
                                        <Share2 className={`
                                            h-4 w-4 mr-1 ${b.isPublic ? "fill-background" : ""}
                                        `} />
                                    </Button>
                                </form>
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