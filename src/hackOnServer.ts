import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
    var servers = ns.getPurchasedServers();
    var target = ns.args[0];
    for (var i = 0; i < servers.length; i++) {
        await ns.scp("scripts/hackV1.js", servers[i]);
        ns.exec("scripts/hackV1.js", servers[i], 3, target);
    }
    // Testing
}
