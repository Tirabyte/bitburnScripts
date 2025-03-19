import { NS } from "@ns";

// Works on 0, 1, and 2 port servers

export async function main(ns: NS): Promise<void> {
    let target =  ns.args[0].toString();
    var moneyTh = ns.getServerMaxMoney(target) * 0.75;
    var securTh = ns.getServerMinSecurityLevel(target) + 5;
    if (ns.fileExists("bruteSSH.exe", "home")) {
      ns.brutessh(target);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(target);
    }
    ns.nuke(target);
    while(true) {
      if (ns.getServerSecurityLevel(target) > securTh) {
        await ns.weaken(target);
      } else if (ns.getServerMoneyAvailable(target) < moneyTh) {
        await ns.grow(target);
      } else {
        await ns.hack(target);
      }
    }
}
