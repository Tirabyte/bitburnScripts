import { NS } from "@ns";
// Works efficiently on 3, 4, 5 port servers

export async function main(ns: NS): Promise<void> {
  var target = ns.args[0].toString();
  var moneyTh = ns.getServerMaxMoney(target) * 0.75;
  var securTh = ns.getServerMinSecurityLevel(target) + 5;
  if (ns.fileExists("bruteSSH.exe", "home")) {
    ns.brutessh(target);
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
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
