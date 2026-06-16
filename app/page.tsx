import Link from "next/link";
import { Cpu, DollarSign, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { TypographyH3 } from "@/components/ui/typography-h3";

export default function Home() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <main className="flex w-full max-w-6xl flex-col items-center px-6 py-24">
                <TypographyH1>
                    Create your dream PC build
                </TypographyH1>

                <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground">
                    Choose components, compare prices and share your builds with
                    the community.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" asChild>
                        <Link href="/dashboard">
                            Start Building
                        </Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild>
                        <Link href="/builds/explore">
                            Explore Builds
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">CPU</Badge>
                    <Badge variant="secondary">GPU</Badge>
                    <Badge variant="secondary">RAM</Badge>
                    <Badge variant="secondary">Motherboard</Badge>
                    <Badge variant="secondary">SSD</Badge>
                    <Badge variant="secondary">PSU</Badge>
                </div>

                <div className="mt-16 grid w-full gap-6 md:grid-cols-3">
                    <div className="group rounded-xl border bg-card/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                        <Cpu className="mb-4 h-8 w-8 text-primary" />

                        <TypographyH3>
                            Smart Compatibility
                        </TypographyH3>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Automatically check component compatibility and avoid
                            hardware conflicts.
                        </p>
                    </div>

                    <div className="group rounded-xl border bg-card/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                        <DollarSign className="mb-4 h-8 w-8 text-primary" />

                        <TypographyH3>
                            Price Comparison
                        </TypographyH3>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Compare prices between components and build the best
                            PC for your budget.
                        </p>
                    </div>

                    <div className="group rounded-xl border bg-card/50 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                        <Users className="mb-4 h-8 w-8 text-primary" />

                        <TypographyH3>
                            Community Builds
                        </TypographyH3>

                        <p className="mt-3 text-sm text-muted-foreground">
                            Explore public builds from other users and get
                            inspiration for your next PC.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}