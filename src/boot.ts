import { NS } from "@ns";

// Starts up after augments
/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    ns.run("scripts/reHackAllTheThingsV2.js", 1);
    ns.run("scripts/purchaseServer8GB.js", 1);
    // Test
}
