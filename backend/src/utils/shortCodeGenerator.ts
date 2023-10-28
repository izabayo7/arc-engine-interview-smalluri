import { Db } from "../db";

function generateShortCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export async function getUniqueShortCode(db: Db, length: number): Promise<string> {
    let shortCode: string;
    do {
        shortCode = generateShortCode(length);
    } while (await db.getUrl(shortCode));
    return shortCode;
}
