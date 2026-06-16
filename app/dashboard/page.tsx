import {CurrentBuild} from "@/app/dashboard/components/current-build";
import {PopularBuildCard} from "@/app/dashboard/components/popular-build-card";

export default async function Dashboard() {
    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
                <CurrentBuild />
            </div>
            <aside className="shrink-0 lg:stycky lg:top-6 lg:w-64">
                <PopularBuildCard />
            </aside>
        </div>
    )
}