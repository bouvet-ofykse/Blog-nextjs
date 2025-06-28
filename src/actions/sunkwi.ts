
export async function getTwitchDrops() {
    const res = await fetch("https://twitch-drops-api.sunkwi.com/drops", {
        cache: 'no-store',
    });

    if (!res.ok) throw new Error("Failed to fetch Twitch Drops");

    return res.json();
}