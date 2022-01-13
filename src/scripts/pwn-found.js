/** @param {NS} ns **/

import { crackServer } from "/scripts/lib/crack-server.js";

export async function main(ns) {
	const srvList = JSON.parse(ns.read("server-list.txt"));
	let pwn = true;

	while (pwn) {
		for (let srvIdx in srvList) {
			let srv = srvList[srvIdx];

			if (await crackServer(ns, srv)) {
				// 		if (srv.ram >= 32 && srv.maxMoney > 0) {
				// 			for (let script in autoScripts) {
				// 				ns.tprint(`COPY ${autoScripts[script]} to ${srv.host}`);
				// 				await ns.scp(autoScripts[script], srv.host);
				// 			}
				// 			ns.exec("/scripts/auto/spider.js", srv.host);
				// 		}

				// Copy hack self and kick it off on every server we can
				await ns.scp("/scripts/hack-server.js", srv.host);

				let threads = Math.floor(
					srv.maxRam / ns.getScriptRam("/scripts/hack-server.js")
				);

				ns.exec("/scripts/hack-server.js", srv.host, threads, srv.host);

				// Flag the server as pwned.
				await ns.scp("pwned.txt", "home", srv.host);
				ns.tprint(`PWNED ${srv.host}`);
			}
		}
		pwn = false;
		// await ns.sleep(500);
	}
}
