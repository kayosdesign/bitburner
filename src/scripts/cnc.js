import { cleanServers, killAll } from "/scripts/lib/tools.js";

export async function main(ns) {
	const action = ns.args[0];
	const target = ns.args[1];

	switch (action) {
		case "clean":
			await cleanServers(ns, target);
			break;
		case "spider":
			await ns.run("/scripts/spider.js");
			break;
		// case "weaken":
		// 	await weaken(ns, target);
		// 	break;
		// case "weakenall":
		// 	await weakenAll(ns);
		// 	break;
		// case "hack":
		// 	await hackSingle(ns, target);
		// 	break;
		case "pwnfound":
			await ns.run("/scripts/pwn-found.js");
			break;
		case "killall":
			await killAll(ns, target);
			break;
		case "hacknodes":
			await ns.run("/scripts/hacknodes.js");
			break;
		default:
			ns.tprint("Invalid action");
			break;
	}
}
