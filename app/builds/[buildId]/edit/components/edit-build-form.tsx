"use client"

import {Component, dbTypeToCategoryId} from "@/lib/types";
import {useCallback, useMemo, useState} from "react";
import {TypographyH3} from "@/components/ui/typography-h3";
import {Button} from "@/components/ui/button";
import {TableParts} from "@/app/dashboard/components/table";
import {componentCategories} from "@/lib/constants";
import {SaveBuildModal} from "@/app/dashboard/components/save-build-modal";

type BuildComponentInput = {
    id: string,
    name: string,
    price: number,
    type: Component["type"],
    socket: string | null
}

type Props = {
    buildName: string;
    buildComponents: BuildComponentInput[];
}

function buildInitialSelected(
    buildComponents: BuildComponentInput[],
): Record<string, Component | null> {
    const selected: Record<string, Component | null> = {};

    for (const c of buildComponents) {
        const categoryId = dbTypeToCategoryId[c.type];

        if (categoryId) {
            selected[categoryId] = {
                id: c.id,
                name: c.name,
                price: c.price,
                type: c.type,
                socket: c.socket,
            }
        }
    }

    return selected;
}

export function EditBuildForm({
    buildName,
    buildComponents,
                              }: Props) {
    const initialSelected = useMemo(() => {
        return buildInitialSelected(buildComponents);
    }, [buildComponents]);

    const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component | null>>(initialSelected);

    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const onSelectedComponent = useCallback(
        (categoryId: string, component: Component | null) => {
            setSelectedByCategory((prev) => ({
                ...prev,
                [categoryId]: component
            }))
        }, []);

    return (
        <>
            <div className="flex justify-between mb-8">
                <TypographyH3>
                    Editing PC builds - {buildName}
                </TypographyH3>
                <Button
                    onClick={() => setSaveDialogOpen(true)}
                >
                    Save
                </Button>
            </div>
            <div className="flex justify-center">
                <TableParts
                    components={componentCategories}
                    selectedByCategory={selectedByCategory}
                    onSelectedComponent={onSelectedComponent}
                />
            </div>
            <SaveBuildModal
                open={saveDialogOpen}
                onOpenChange={setSaveDialogOpen}
                selectedByCategory={selectedByCategory}
                defaultName={buildName}
                redirectPath="/builds"
            />
        </>
    )
}