"use client"

import {Component} from "@/lib/types";
import {SaveBuildFromState} from "@/app/dashboard/actions";
import {JSX, useMemo, useRef} from "react";
import {useRouter} from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedByCategory: Record<string, Component | null>
    defaultName?: string;
    redirectPath: string;
}

const initialState: SaveBuildFromState = { status: "idle" };

export function SaveBuildModal({
    open,
    onOpenChange,
    selectedByCategory,
    defaultName,
    redirectPath
                               }: Props) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const {pending} = useFormStatus()

    const componentIds = useMemo(() => Object
            .values(selectedByCategory)
            .filter((component): component is Component => component !== null)
            .map((component) => component.id)
        ,[selectedByCategory]);

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            formRef.current?.reset();
        }

        onOpenChange(nextOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Builds</DialogTitle>
                    <DialogDescription>Enter the name of the assembly</DialogDescription>
                </DialogHeader>

                <form ref={formRef} className="space-y-4">
                    <Input
                        name="name"
                        placeholder="For example: Gaming PC"
                        defaultValue={defaultName}
                        required
                    />
                    <input type="hidden" name="componentIds" value={componentIds.join(",")} />

                    <DialogFooter>
                        <Button type="submit" disabled={pending || componentIds.length === 0}>
                            { pending ? "Saving.." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}