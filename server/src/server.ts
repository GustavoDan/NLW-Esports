import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { converMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({ log: ["query"] });

app.get("/games", async (request, response) => {
    return response.json(
        await prisma.game.findMany({
            include: { _count: { select: { ads: true } } },
        })
    );
});

app.get("/games/:id/ads", async (request, response) => {
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekdays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: { gameId: request.params.id },
        orderBy: { createdAt: "desc" },
    });

    return response.json(
        ads.map((ad) => {
            return {
                ...ad,
                weekdays: ad.weekdays.split(",").sort(),
                hourStart: converMinutesToHourString(ad.hourStart),
                hourEnd: converMinutesToHourString(ad.hourEnd),
            };
        })
    );
});

app.post("/games/:id/ads", async (request, response) => {
    const body: any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId: request.params.id,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekdays: body.weekdays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        },
    });

    return response.status(201).json(ad);
});

app.get("/ads/:id/discord", async (request, response) => {
    return response.json(
        await prisma.ad.findUnique({
            select: { discord: true },
            where: { id: request.params.id },
        })
    );
});

app.listen(3333);
