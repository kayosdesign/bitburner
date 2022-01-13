/** @param {NS} ns **/
export const serverInfo = (ns, host) => {
	return {
		host,
		portReq: ns.getServerNumPortsRequired(host),
		hackReq: ns.getServerRequiredHackingLevel(host),
		maxMoney: ns.getServerMaxMoney(host),
		growth: ns.getServerGrowth(host),
		minSec: ns.getServerMinSecurityLevel(host),
		ram: ns.getServerRam(host)[0],
		root: ns.hasRootAccess(host),
	};
};
