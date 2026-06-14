"use server"

import {categoryIdDbType, Component} from "@/lib/types";
import {prisma} from "@/lib/db";

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