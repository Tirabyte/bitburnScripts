import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const hackramv1 = ns.getScriptRam("scripts/hackV1.js");
  const hackramv2 = ns.getScriptRam("scripts/hackV2.js");
  // Array of all servers that don't need any ports opened
  // to gain root access. These have 16 GB of RAM
  const servers0Port = [
      "sigma-cosmetics",
      "joesguns",
      "foodnstuff",
      "nectar-net",
      "hong-fang-tea",
      "harakiri-sushi"
  ];
  // Array of all servers that only need 1 port opened
  // to gain root access. These have 32 GB of RAM
  const servers1Port = [
      "neo-net",
      "zer0",
      "max-hardware",
      "iron-gym",
      "CSEC"
  ];
  const servers2Port = [
      "silver-helix",
      "omega-net",
      "phantasy",
      "the-hub"
  ];
  const servers3Port = [
      "catalyst",
      "netlink",
      "I.I.I.I",
      "summit-uni",
      "rothman-uni"
  ];
  if (ns.args.length == 0) {
      ns.tprint("Need a target...");
      ns.exit();
  }
  const target = ns.args[0];
  ns.run("hackOnServer.js", 1, target);
  // Copy our scripts onto each server that requires 0 ports
  // to gain root access. Then use nuke() to gain admin access and
  // run the scripts.
  for (var i = 0; i < servers0Port.length; ++i) {
      var serv = servers0Port[i];
      var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1);
      await ns.scp("scripts/hackV1.js", serv);
      ns.nuke(serv);
      ns.exec("scripts/hackV1.js", serv, thrds, target);
  }
  // Wait until we acquire the "BruteSSH.exe" program
  while (!ns.fileExists("BruteSSH.exe")) {
      await ns.sleep(60000);
  }
  // Copy our scripts onto each server that requires 1 port
  // to gain root access. Then use brutessh() and nuke()
  // to gain admin access and run the scripts.
  for (var i = 0; i < servers1Port.length; ++i) {
      var serv = servers1Port[i];
      var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1);
      await ns.scp("scripts/hackV1.js", serv);
      ns.brutessh(serv);
      ns.nuke(serv);
      ns.exec("scripts/hackV1.js", serv, thrds, target);
  }
  while (!ns.fileExists("FTPCrack.exe", "home")) {
      await ns.sleep(60000);
  }
  for (var i = 0; i < servers2Port.length; i++) {
      var serv = servers2Port[i];
      var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1);
      await ns.scp("scripts/hackV1.js", serv);
      ns.ftpcrack(serv);
      ns.brutessh(serv);
      ns.nuke(serv);
      ns.exec("scripts/hackV1.js", serv, thrds, target);
  }
  while (!ns.fileExists("relaySMTP.exe", "home")) {
      await ns.sleep(60000);
  }
  for (var i = 0; i < servers3Port.length; i++) {
      var serv = servers3Port[i];
      var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv2);
      await ns.scp("scripts/hackV2.js", serv);
      ns.ftpcrack(serv);
      ns.brutessh(serv);
      ns.relaysmtp(serv);
      ns.nuke(serv);
      ns.exec("scripts/hackV2.js", serv, thrds, target);
  }
}

// Tear all the Bytes!!