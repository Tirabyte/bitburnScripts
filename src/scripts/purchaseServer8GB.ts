import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  // How much RAM each purchased server will have. In this case, it'll
  // be 8GB.
  var ram = 8;
  var i = ns.getPurchasedServers().length;
  var lines = ns.read("servers.txt").split('\n');
  var target = lines[0];

  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers
  while (i < ns.getPurchasedServerLimit()) {
      // Check if we have enough money to purchase a server
      
      if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
          // If we have enough money, then:
          //  1. Purchase the server
          //  2. Copy our hacking script onto the newly-purchased server
          //  3. Run our hacking script on the newly-purchased server with 3 threads
          //  4. Increment our iterator to indicate that we've bought a new server
          var hostname = ns.purchaseServer("pserv-" + i, ram);
          await ns.scp("scripts/hackV1.js", hostname);
          ns.exec("scripts/hackV1.js", hostname, 3, target);
          i++;
      }
    await ns.sleep(100);
  }
}
