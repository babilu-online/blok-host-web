<template>
	<div class="container">
		<div class="card">
			<div class="card-header mx-4">
				<div class="row mt-3">
					<div class="col">
						<h2 class="text-start mb-0">Sites</h2>
					</div>
					<div class="col-auto">
					</div>
				</div>
			</div>
			<div class="card-body">
				<div class="text-center p-5" v-if="sites.length === 0">
					<i class="info my-5" v-if="loading"><span><i class="fa fa-spinner fa-spin"></i></span> Loading sites...</i>
					<i class="info my-5" v-if="!loading">No sites created</i>
				</div>

				<SiteContainer @click="onSiteClick" v-for="(site, key) in sites" :key="key" :site="site"></SiteContainer>
			</div>
		</div>
	</div>
</template>

<script>
import {BlokHost} from "../api/blok_host";
import SiteContainer from "../components/dashboard/SiteContainer";

export default {
	name: "SiteIndex",
	components: {SiteContainer},
	data() {
		return {
			blokHost: null,
			loading: false,
			sites: []
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
			this.siteIndex();
		},

		siteIndex() {
			this.loading = true;
			this.blokHost.ownerSites(this.$store.state.wallet_addr).then(r => {
				this.sites = r
			}).finally(() => this.loading = false)
		},

		onSiteClick: function (site) {
			console.log("Going to ", site)
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

</style>