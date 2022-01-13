/** @param {NS} ns **/

import { programs, scripts } from "/scripts/lib/constants.js";

export const softwareCount = (ns) => {
	return programs.filter((progName) => ns.fileExists(progName, "home")).length;
};

export const killAll = (ns, target) => {
	switch (target) {
		case "all":
			const srvList = JSON.parse(ns.read("server-list.txt"));
			for (let srv in srvList) {
				ns.killall(srv);
			}
		default:
			ns.killall(target);
			break;
	}
};

async function clean(ns, target) {
	if (target === "home") return; // don't clean home by mistake

	ns.killall(target);
	ns.rm("pwned.txt", target);

	for (let scriptIdx in scripts) {
		let script = scripts[scriptIdx];

		ns.rm(script, target);
	}
}

export async function cleanServers(ns, target) {
	switch (target) {
		case "all":
			const srvList = JSON.parse(ns.read("server-list.txt"));
			for (let srv in srvList) {
				await clean(ns, srv);
			}
			break;
		default:
			await clean(ns, target);
			break;
	}
}
