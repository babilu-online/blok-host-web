<template>
	<div class="home container">

		<div class="row text-black">
			<div class="col-auto">
				<router-link to="/" class="sub-heading p-2">Overview</router-link>
			</div>
			<div class="col-auto">
				<router-link to="/" class="sub-heading p-2">Sites</router-link>
			</div>
			<div class="col-auto">
				<router-link to="/" class="sub-heading p-2">Builds</router-link>
			</div>
			<div class="col-auto">
				<router-link to="/" class="sub-heading p-2">Domains</router-link>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12">
				<!--			Overvieww -->
				<div class="card">
					<div class="card-header mx-4">
						<h1 class="text-start mt-3 mb-0">Overview</h1>
					</div>
					<div class="card-body">

						<div class="row">

							<div class="col-3 text-center">
								<div class="overview-info">
									<h5>Page Views</h5>
									<h4>0</h4>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5>Bandwidth Used</h5>
									<h4>0 GB</h4>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5>Cache Ratio</h5>
									<h4>97%</h4>
								</div>
							</div>
							<div class="col-3 text-center">
								<div class="overview-info">
									<h5>Build Minutes Used</h5>
									<h4>0</h4>
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>


		<div class="row my-4">
			<div class="col-7">
				<div class="card">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h1 class="text-start mb-0">Sites</h1>
							</div>
							<div class="col-auto">
								<router-link to="/upload" class="btn btn-primary">NEW SITE</router-link>
							</div>
						</div>
					</div>
					<div class="card-body">

						<div class="text-center p-5" v-if="sites.length === 0">
							<i class="info my-5">No sites created</i>
						</div>


					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-header mx-4">
						<h1 class="text-start mt-3 mb-0">Drives</h1>
					</div>
					<div class="card-body">

						<div class="text-center p-5" v-if="drives.length === 0">
							<i class="info my-5">No drives created</i>
						</div>

						<table class="table table-striped">
							<tbody class="text-end">
							<tr v-for="(drive, key) in drives" :key="key">
								<td class="text-start">{{ drive.account.identifier }}</td>
								<td>{{drive.account.creationEpoch}}</td>
								<td>{{ new Date((1584368940 + ((drive.account.creationEpoch * 432000) * 511.36 / 1000)) * 1000).toDateString() }}</td>
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

export default {
	name: "Home",
	data() {
		return {
			shadow: null,
			sites: [],
			drives: [],
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
			this.shadow.index().then(i => {
				console.log("Index: ", i)
				this.drives = i;
			}).catch(e => {
				console.log("Index err", e)
			})
		},
	},
	mounted() {
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

.sub-heading {
	color: rgba(0, 0, 0, 0.6);
	font-weight: bold;
	text-decoration: none;
	transition: all 0.3s ease-in-out;
}

.sub-heading:hover {
	color: rgba(0, 0, 0, 1);
	font-weight: bold;
	text-decoration: underline;
}
</style>