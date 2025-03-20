import { NS } from "@ns";

function scan(ns: NS, parent: string, server: string, list: string[]) {
  const children = ns.scan(server);
  for (let child of children) {
      if (parent == child) {
          continue;
      }
      list.push(child);
      
      scan(ns, server, child, list);
  }
}

export function list_servers(ns:NS) {
  const list: string[] = [];
  scan(ns, '', 'home', list);
  return list;
}

// Main function
export async function main(ns: NS): Promise<void> {
  const hackramv1 = ns.getScriptRam("scripts/hackV1.js");
  const hackramv2 = ns.getScriptRam("scripts/hackV2.js");

  // Retrieve servers and start arrays of different ports
  const serversAll = list_servers(ns);
  const n0: string[] = [];
  const n1: string[] = [];
  const n2: string[] = [];
  const n3: string[] = [];
  const n4: string[] = [];
  const n5: string[] = [];

  // Store all those servers in arrays
  for (const server of serversAll) {
    switch(ns.getServerNumPortsRequired(server))  {
      case 0:
        n0.push(server);
        break;
      case 1:
        n1.push(server);
        break;

      case 2:
        n2.push(server);
        break;

      case 3:
        n3.push(server);
        break;

      case 4:
        n4.push(server);
        break;

      default:
        n5.push(server);
    }
  }
  ns.clearLog();
  // server target
  var serv = [];
  var ind = 0;
  var nodeVal = 0;
  serv = n0;

  // Copy our scripts onto each server that requires 0 ports
  // to gain root access. Then use nuke() to gain admin access and
  // run the scripts.
  while (nodeVal < 6) {
    for (let server of serv) {
      var thrds = 0;
      ns.print(server);
      if (nodeVal < 3) {
        thrds = Math.trunc(ns.getServerMaxRam(server) / hackramv1);
      } else {
        thrds = Math.trunc(ns.getServerMaxRam(server) / hackramv2)
      }

      switch (nodeVal) {

        case 5:
          ns.sqlinject(server);

        case 4:
          ns.httpworm(server);

        case 3:
          ns.relaysmtp(server);

        case 2:
          ns.ftpcrack(server);

        case 1:
          ns.brutessh(server);

        default:
          ns.nuke(server);
      }
      if (thrds != 0) {
        if (nodeVal < 3) {
          ns.scp("scripts/hackV1.js", server);
          ns.exec("scripts/hackV1.js", server, thrds, server);
        } else {
          ns.scp("scripts/hackV2.js", server);
          ns.exec("scripts/hackV2.js", server, thrds, server);
        }
      }
      ns.print("Ports: " + nodeVal);
    }
    var flag = true;
    while (flag) {
      switch (nodeVal) {
        case 0:
          if (ns.fileExists("BruteSSH.exe", "home")) {
            serv = n1;
            flag = false;
            nodeVal++;
          }
          break;

        case 1:
          if (ns.fileExists("FTPCrack.exe", "home")) {
            serv = n2;
            flag = false;
            nodeVal++;
          }
          break;

        case 2:
          if (ns.fileExists("relaySMTP.exe", "home")) {
            serv = n3;
            flag = false;
            nodeVal++;
          }
          break;

        case 3:
          if (ns.fileExists("HTTPWorm.exe", "home")) {
            serv = n4;
            flag = false;
            nodeVal++;
          }
          break;

        case 4:
          if (ns.fileExists("SQLInject.exe", "home")) {
            serv = n5;
            flag = false;
            nodeVal++;
          }
          break;

        case 5:
          ns.exit;
      }
      await ns.sleep(60000);
    }
  }
}
