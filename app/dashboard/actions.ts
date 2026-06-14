"use server"

import {categoryIdDbType, Component} from "@/lib/types";
import {prisma} from "@/lib/db";

export type SaveBuildFromState = {
    status: "idle" | "success" | "error",
    message?: string
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
    const dbType = categoryIdDbType[categoryId];

    if (!dbType) {
        return [];
    }

    const components = await prisma.component.findMany({
        where: { type: dbType },
        orderBy: { price: "asc" }
    })

    return components.map(c => ({
        id: c.id,
        type: c.type,
        name: c.name,
        price: c.price,
        socket: c.socket
    }));
}