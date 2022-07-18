<template>
	<div class="container">
		<div class="card">
			<div class="card-header mx-4">
				<div class="row mt-3">
					<div class="col">
						<h2 class="text-start mb-0">Drives</h2>
					</div>
					<div class="col-auto">
					</div>
				</div>
			</div>
			<div class="card-body">
				<div class="text-center p-5" v-if="drives.length === 0">
					<i class="info my-5" v-if="loading"><span><i class="fa fa-spinner fa-spin"></i></span> Loading drives...</i>
					<i class="info my-5" v-if="!loading">No drives created</i>
				</div>

				<table class="table table-striped" v-if="drives.length > 0">
					<thead>
					<tr class="text-center">
						<th class="text-start">Name</th>
						<th>Drive ID</th>
						<th>Epoch</th>
						<th>Immutable</th>
						<th class="text-end">Size</th>
						<th class="text-end">Created At</th>
					</tr>
					</thead>
					<tbody class="text-end">
					<tr v-for="(drive, key) in drives" :key="key">
						<td class="text-start fw-bold text-capitalize">{{ drive.account.identifier }}</td>
						<td class="text-start">{{ drive.publicKey }}</td>
						<td class="text-center">{{ drive.account.creationEpoch }}</td>
						<td class="text-center">{{ drive.account.immutable ? 'Yes' : 'No' }}</td>
						<td class="text-end">{{ ((drive.account.storageAvailable || (drive.account.reserved_bytes)) / 1024 / 1024).toFixed(2) }} MB</td>
						<td>{{ new Date(drive.account.creationTime * 1000).toDateString() }}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import {Shadow} from "../api/shadow";
import {BlokHost} from "../api/blok_host";

export default {
	name: "DriveIndex",
	data() {
		return {
			loading: false,
			shadow: null,
			drives: []
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

			this.loading = true
			this.shadow.index().then(i => {
				console.log("Index: ", i)
				this.drives = i;
			}).catch(e => {
				console.log("Index err", e)
			}).finally(() => {
				this.loading = false;
			})
		},
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