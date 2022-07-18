<template>
	<div class="container">


		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h2 class="text-start mb-0">Site</h2>
							</div>
							<div class="col-auto">
							</div>
						</div>
					</div>
					<div class="card-body">

						<div class="row">
							<div class="col ms-2">
								<h2 class="mb-0">{{siteName}}</h2>

								<a target="_blank" :href="`https://${site.subdomain}.blok.host`"><p class="small">https://{{site.subdomain}}.blok.host</p></a>


								<div class="row mt-4">
									<div class="col-auto"><button class="btn btn-outline-primary btn-sm">Update</button></div>
									<div class="col-auto"><button class="btn btn-outline-secondary btn-sm">Delete</button></div>
								</div>

							</div>
							<div class="col-auto">
								<img :src="siteImage" alt="site image" class="img-fluid">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row my-4">

			<div class="col-6">
				<div class="card">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h2 class="text-start mb-0">Metadata</h2>
							</div>
							<div class="col-auto">
							</div>
						</div>
					</div>
					<div class="card-body">
						<pre class="ms-4"><code>{{site.meta}}</code></pre>
					</div>
				</div>
			</div>



			<div class="col-6">
				<div class="card">
					<div class="card-header mx-4">
						<div class="row mt-3">
							<div class="col">
								<h2 class="text-start mb-0">Files</h2>
							</div>
							<div class="col-auto">
							</div>
						</div>
					</div>
					<div class="card-body">
						<table class="table table-striped">
							<thead>
							<tr>
								<th>Name</th>
								<th>State</th>
								<th>Size</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="(file, key) in files" :key="key">
								<td class="col">{{file.name}}</td>
								<td class="col-auto">{{file.immutable ? 'Immutable' : 'Mutable'}}</td>
								<td class="col-auto">{{file.size}} Bytes</td>
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
import {BlokHost} from "../api/blok_host";
import {Shadow} from "../api/shadow";

export default {
	name: "SiteShow",
	data() {
		return {
			blokHost: null,
			loading: false,
			site: {
				meta: {
					site_name: "",
				}
			},
			files: [],
		}
	},
	watch: {
		'$store.state.wallet_addr'() {
			console.log("Wallet address changed", this.$store.state.wallet_addr);
			this.onWalletConnected()
		}
	},
	computed: {
		siteName: function() {
			if (!this.site.meta)
				return "Unknown"

			return this.site.meta.site_name
		},
		siteImage: function() {
			if (!this.site.meta)
				return ""

			return this.site.meta.image
		}
	},
	methods: {
		async onWalletConnected() {
			this.shadow = new Shadow();
			await this.shadow.initDrive(this.$store.state.wallet_addr);
			this.siteShow();
			this.fileIndex();
		},

		fileIndex() {
			this.shadow.indexFiles(this.$route.params.id).then(f => {
				console.log("f", f)
				this.files = f
			})
		},

		siteShow() {
			this.loading = true;
			this.blokHost.ownerSite(this.$store.state.wallet_addr, this.$route.params.id).then(r => {
				if (!r)
					return

				this.site = r
			}).finally(() => this.loading = false)
		},
	},
	mounted() {
		this.blokHost = new BlokHost()
		this.blokHost.pingBlokHost(this.$route.params.id)
		this.siteShow()

		if (this.$store.state.wallet_connected)
			this.onWalletConnected();
	}
}
</script>

<style scoped>
.img-fluid {
	max-width: 200px;
	border-radius: 7px;
}
</style>