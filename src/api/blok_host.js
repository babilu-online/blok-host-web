import axios from "axios"

export class BlokHost {

	base = `https://webhost2.alphabatem.com`


	async ownerSites(ownerAddr) {
		const sites = await this.searchSites(ownerAddr, 25)
		const ownerSites = [];

		for (let i = 0; i < sites.data.results.length; i++) {
			const site = sites.data.results[i]
			if (site.meta.owner !== ownerAddr)
				continue

			ownerSites.push(site)
		}

		return ownerSites
	}

	async ownerSite(ownerAddr, driveID) {
		const sites = await this.searchSites(driveID, 1)
		let ownerSite = null;
		for (let i = 0; i < sites.data.results.length; i++) {
			const site = sites.data.results[i]
			if (site.meta.owner !== ownerAddr)
				continue

			ownerSite = site
		}

		return ownerSite
	}

	searchSites(query = '*', limit = 25) {
		return axios.get(`${this.base}/search/sites?q=${query}&limit=${limit}`)
	}

	searchDrives(query = '*', limit = 25) {
		return axios.get(`${this.base}/search/drives?q=${query}&limit=${limit}`)
	}

	shadowStats() {
		return axios.get(`${this.base}/shadow/stats`)
	}

	nodeStats() {
		return axios.get(`${this.base}/stats`)
	}


	pingBlokHost(drive) {
		return axios.post("https://webhost2.alphabatem.com/cid/register", {
			address: drive,
		})
	}
}
