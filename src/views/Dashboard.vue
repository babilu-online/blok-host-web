<template>
	<div class="home container">
		<div class="row mt-4">
			<div class="col-12">
				<!--			Overvieww -->
				<div class="card">
					<div class="card-header mx-4">
						<h2 class="text-start mt-3 mb-0">Overview</h2>
					</div>
					<div class="card-body">

						<div class="row">

							<div class="col-3 text-center">
								<div class="overview-info">
									<h5 class="text-start mb-2 ms-2">Page Views</h5>
									<h2 class="mb-0">0</h2>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5 class="text-start mb-2 ms-2">Bandwidth Used</h5>
									<h2 class="mb-0">0 GB</h2>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5 class="text-start mb-2 ms-2">Cache Ratio</h5>
									<h2 class="mb-0">-</h2>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5 class="text-start mb-2 ms-2">Build Minutes Used</h5>
									<h2 class="mb-0">-</h2>
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>


		<div class="row my-4">
			<div class="col-7">
				<div class="card h-100">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h2 class="text-start mb-0">Sites</h2>
							</div>
							<div class="col-auto">
								<router-link to="/upload" class="btn btn-primary btn-sm">NEW SITE</router-link>
							</div>
						</div>
					</div>
					<div class="card-body">

						<div class="text-center p-5" v-if="sites.length === 0">
							<i class="info my-5" v-if="loadingSites"><span><i class="fa fa-spinner fa-spin"></i></span> Loading sites...</i>
							<i class="info my-5" v-if="!loadingSites">No sites created</i>
						</div>


						<SiteContainer @click="onSiteClick(site.meta.id)" v-for="(site, key) in sites" :key="key" :site="site"></SiteContainer>

					</div>
				</div>
			</div>
			<div class="col">
				<div class="card h-100">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h2 class="text-start mb-0">Drives</h2>
							</div>
							<div class="col-auto">
								<router-link to="/drives" class="btn btn-primary btn-sm">ALL DRIVES</router-link>
							</div>
						</div>
					</div>
					<div class="card-body">
						<div class="text-center p-5" v-if="drives.length === 0">
							<i class="info my-5" v-if="loadingDrives"><span><i class="fa fa-spinner fa-spin"></i></span> Loading drives...</i>
							<i class="info my-5" v-if="!loadingDrives">No drives created</i>
						</div>

						<table class="table table-striped" v-if="drives.length > 0">
							<thead>
							<tr class="text-center">
								<th class="text-start">Name</th>
								<th>Epoch</th>
								<th>Size</th>
								<th>Created At</th>
							</tr>
							</thead>
							<tbody class="text-end">
							<tr v-for="(drive, key) in drives.slice(0,5)" :key="key">
								<td class="text-start">{{ drive.account.identifier }}</td>
								<td class="text-center">{{ drive.account.creationEpoch }}</td>
								<td class="text-center">{{ (drive.account.storageAvailable / 1024 / 1024).toPrecision(2) }} MB</td>
								<td>{{ new Date(drive.account.creationTime * 1000).toDateString() }}</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Shadow} from "../api/shadow";
import {BlokHost} from "../api/blok_host";
import SiteContainer from "../components/dashboard/SiteContainer";

export default {
	name: "Dashboard",
	components: {SiteContainer},
	data() {
		return {
			blokHost: null,
			shadow: null,
			sites: [],
			drives: [],
			loadingSites: false,
			loadingDrives: false,
		}
	},
	watch: {
		'$store.state.wallet_addr'() {
			console.log("Wallet address changed", this.$store.state.wallet_addr);
			this.onWalletConnected()
		}
	},
	methods: {
		async onWalletConnected() {
			this.shadow = new Shadow();
			await this.shadow.initDrive(this.$store.state.wallet_addr);
			this.siteIndex();
			this.driveIndex();
		},

		driveIndex() {
			this.loadingDrives = true;
			this.shadow.index().then(i => {
				console.log("Index: ", i)
				this.drives = i;
			}).catch(e => {
				console.log("Index err", e)
			}).finally(() => this.loadingDrives = false)
		},

		siteIndex() {
			this.loadingSites = true;
			this.blokHost.ownerSites(this.$store.state.wallet_addr).then(r => {
				this.sites = r
			}).finally(() => this.loadingSites = false)
		},

		onSiteClick: function (site) {
			this.$router.push("/sites/" + site)
		}
	},
	mounted() {
		this.blokHost = new BlokHost()
		if (this.$store.state.wallet_connected)
			this.onWalletConnected();
	}
}
</script>

<style scoped>
.info {
	color: lightgray;
}

.overview-info {
	border: 2px solid rgba(0, 0, 0, 0.05);
	border-radius: 4px;
	padding: 3%
}
</style>