import { z } from "zod";

export const carSchemaWithZod=z.object({
    body:z.object({
        name:z.string(),
        description:z.string(),
        color:z.string(),
        isElectric:z.boolean(),
        features:z.array(z.string()),
        pricePerHour:z.number(),
        status:z.enum(['available', 'unavailable']).default("available"),

    })
})