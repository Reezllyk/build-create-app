"use client"

import {useCallback, useState} from "react";
import type {Component} from "@/lib/types";
import {TypographyH1} from "@/components/ui/typography-h1";
import {Button} from "@/components/ui/button";
import {TableParts} from "@/app/dashboard/components/table";
import {componentCategories} from "@/lib/constants";
import {SaveBuildModal} from "@/app/dashboard/components/save-build-modal";

export const CurrentBuild = () => {
    const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component | null>>({});
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const onSelectComponent = useCallback((categoryId: string, component: Component | null) => {
        setSelectedByCategory(prev => ({...prev, [categoryId]: component}))
    },[])

    return (
        <>
            <div className="flex justify-between mb-8">
                <TypographyH1>Build your own PC</TypographyH1>
                <Button onClick={() => setSaveDialogOpen(true)}>Build</Button>
            </div>
            <div className="min-w-0 overflow-x-auto">
                <TableParts
                    components={componentCategories}
                    onSelectedComponent={onSelectComponent}
                    selectedByCategory={selectedByCategory}
                />
                <SaveBuildModal
                    open={saveDialogOpen}
                    onOpenChange={setSaveDialogOpen}
                    selectedByCategory={selectedByCategory}
                />
            </div>
        </>
    );
}