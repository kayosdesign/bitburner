/** @param {NS} ns **/

import { programs } from "/scripts/lib/constants.js";
import { softwareCount } from "/scripts/lib/tools.js";

export async function crackServer(ns, srv) {
	let curHackLvl = ns.getHackingLevel();
	let curSoftware = softwareCount(ns);

	let debug = true;
	let log = false;

	if (curHackLvl < srv.hackReq || curSoftware < srv.portReq) {
		ns.tprint(`Can't hack - ${srv.host}`);
		return false; // We can't hack it so don't try
	}

	if (!ns.hasRootAccess(srv.host) || debug) {
		const progs = programs.slice(0, curSoftware);
		while (progs.length > 0) {
			let prog = progs.shift();

			switch (prog) {
				case "NUKE.exe":
					if (log) ns.tprint(`${srv.host}: NUKE`);
					ns.nuke(srv.host);
					break;
				case "BruteSSH.exe":
					if (log) ns.tprint(`${srv.host}: BruteSSH`);
					ns.brutessh(srv.host);
					break;
				case "FTPCrack.exe":
					if (log) ns.tprint(`${srv.host}: FTPCrack`);
					ns.ftpcrack(srv.host);
					break;
				case "relaySMTP.exe":
					if (log) ns.tprint(`${srv.host}: relaySMTP`);
					ns.relaysmtp(srv.host);
					break;
				case "HTTPWorm.exe":
					if (log) ns.tprint(`${srv.host}: HTTPWorm`);
					ns.httpworm(srv.host);
					break;
				case "SQLInject.exe":
					if (log) ns.tprint(`${srv.host}: SQLInject`);
					ns.sqlinject(srv.host);
					break;
			}
			await ns.sleep(500);
		}
	}
	return true;
}
