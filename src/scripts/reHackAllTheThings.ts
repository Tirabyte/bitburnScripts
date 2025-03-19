import { NS } from "@ns";

// Testing
export async function main(ns: NS): Promise<void> {
  const hackramv1 = ns.getScriptRam("scripts/hackV1.js");
  const hackramv2 = ns.getScriptRam("scripts/hackV2.js");
  // Array of all servers that don't need any ports opened
  // to gain root access. These have 16 GB of RAM
  const servers0Port = [
    "n00dles",
    "sigma-cosmetics",
    "joesguns",
    "foodnstuff",
    "nectar-net",
    "hong-fang-tea",
    "harakiri-sushi"];

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
    "the-hub",
    "avmnite-02h"
  ];

  const servers3Port = [
    "catalyst",
    "netlink",
    "I.I.I.I",
    "summit-uni",
    "rothman-uni"
  ];

  // Code for V2 of reHack all the things

  // const queue = ns.scan("home");
  // const visited = [];
  // const n0 = [];
  // const n1 = [];
  // const n2 = [];
  // const n3 = [];
  // const n4 = [];
  // const n5 = [];

  // while (queue.length != 0) {
  //   let node = queue.pop().toString();
  //   if (!visited.includes(node)) {
  //     ns.print(node);
  //     queue.push(ns.scan(node));
  //     switch(ns.getServerNumPortsRequired(node))  {

  //       case 0:
  //         n0.push(node);
  //         break;

  //       case 1:
  //         n1.push(node);
  //         break;

  //       case 2:
  //         n2.push(node);
  //         break;

  //       case 3:
  //         n3.push(node);
  //         break;

  //       case 4:
  //         n4.push(node);
  //         break;

  //       default:
  //         n5.push(node);
  //     }
  //     visited.push(node);
  //   }
  // }

  // if (ns.args.length == 0) {
  //   ns.tprint("Need a target...");
  //   ns.exit();
  // }

  // server targets

  const targets = ns.read("servers.txt").split('\n');


  // var serv = [];
  // var ind = 0;
  // var nodeVal = 0;
  // serv = serv.push(n0);

  // ns.run("hackOnServer.js", 1, target);
  // // Copy our scripts onto each server that requires 0 ports
  // // to gain root access. Then use nuke() to gain admin access and
  // // run the scripts.
  // for (var i = 0; i < visited.length; i++) {
  //   var loc = serv.pop();
  //   var thrds = 0;
  //   if (nodeVal < 3) {
  //     thrds = Math.trunc(ns.getServerMaxRam(loc) / hackramv1);
  //   } else {
  //     thrds = Math.trunc(ns.getServerMaxRam(loc) / hackramv2)
  //   }

  //   switch (nodeVal) {

  //     case 5:
  //       ns.sqlinject(loc);

  //     case 4:
  //       ns.httpworm(loc);

  //     case 3:
  //       ns.relaysmtp(loc);

  //     case 2:
  //       ns.ftpcrack(loc);

  //     case 1:
  //       ns.brutessh(loc);

  //     default:
  //       ns.nuke(loc);
  //   }
  //   if (nodeVal < 3) {
  //     ns.exec("scripts/hackV1.js", loc, thrds, target);
  //   } else {
  //     ns.exec("scripts/hackV2.js", loc, thrds, target);
  //   }

  //   if (serv.length == 0) {
  //     var flag = true;
  //     while (flag) {
  //       switch (nodeVal) {
  //         case 0:
  //           if (ns.fileExists("BruteSSH.exe", "home")) {
  //             serv = serv.push(n1);
  //             flag = false;
  //             nodeVal++;
  //           }
  //           break;

  //         case 1:
  //           if (ns.fileExists("FTPCrack.exe", "home")) {
  //             serv = serv.push(n2);
  //             flag = false;
  //             nodeVal++;
  //           }
  //           break;

  //         case 2:
  //           if (ns.fileExists("relaySMTP.exe", "home")) {
  //             serv = serv.push(n3);
  //             flag = false;
  //             nodeVal++;
  //           }
  //           break;

  //         case 3:
  //           if (ns.fileExists("HTTPWorm.exe", "home")) {
  //             serv = serv.push(n4);
  //             flag = false;
  //             nodeVal++;
  //           }
  //           break;

  //         case 4:
  //           if (ns.fileExists("SQLInject.exe", "home")) {
  //             serv = serv.push(n5);
  //             flag = false;
  //             nodeVal++;
  //           }
  //           break;

  //         default:
  //           flag = true;
  //       }
  //       await ns.sleep(60000);
  //     }
  //   }
  // }


  for (var i = 0; i < servers0Port.length; ++i) {
    var serv = servers0Port[i];
    var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1
    );

    await ns.scp("scripts/hackV1.js", serv);
    ns.nuke(serv);
    if (serv == "foodnstuff" || serv == "n00dles") {
      ns.exec("scripts/hackV1.js", serv, thrds, serv);
    } else{
      ns.exec("scripts/hackV1.js", serv, thrds, targets[0]);
    }
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
    var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1
    );

    await ns.scp("scripts/hackV1.js", serv);
    ns.brutessh(serv);
    ns.nuke(serv);
    ns.exec("scripts/hackV1.js", serv, thrds, targets[1]);
  }

  while (!ns.fileExists("FTPCrack.exe", "home")) {
    await ns.sleep(60000);
  }

  for (var i = 0; i < servers2Port.length; i++) {
    var serv = servers2Port[i];
    var thrds = Math.trunc(ns.getServerMaxRam(serv) / hackramv1
    );

    await ns.scp("scripts/hackV1.js", serv);
    ns.ftpcrack(serv);
    ns.brutessh(serv);
    ns.nuke(serv);
    ns.exec("scripts/hackV1.js", serv, thrds, targets[2]);
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
    ns.exec("scripts/hackV2.js", serv, thrds, targets[3]);
  }
}
