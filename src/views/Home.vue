<template>
	<div class="container">
		<div class="row">
			<div class="col-12 text-center">
				<h1 class="mt-5">BLOK HOST</h1>

				<h2 class="my-5">Simple, Secure Web3 Hosting</h2>
			</div>
		</div>

		<div class="row text-center">
			<div class="col-4">
				<div :style="style()" class="card">
					<div class="card-body">
						<h1>{{ fmt.format(stats.accounts_created) }}</h1>
						<h5>ACCOUNTS CREATED</h5>
					</div>
				</div>
			</div>

			<div class="col-4">
				<div :style="style()" class="card">
					<div class="card-body">
						<h1>{{ fmt.format(stats.sites_uploaded) }}</h1>
						<h5>SITES HOSTED</h5>
					</div>
				</div>
			</div>

			<div class="col-4">
				<div :style="style()" class="card">
					<div class="card-body">
						<h1>{{ (stats.total_allocated / 1024 / 1024 / 1024 / 1024).toFixed(2) }} GB</h1>
						<h5>DATA MONITORED</h5>
					</div>
				</div>
			</div>

			<!--			<div class="col text-black">-->
			<!--				<h1>{{ fmt.format(node_stats.requests_served) }}</h1>-->
			<!--				<h5>REQUESTS SERVED</h5>-->
			<!--			</div>-->
		</div>

		<div class="row my-5">
			<div class="col-12 col-md-8 col-lg-6 offset-0 offset-md-2 offset-lg-3">
				<div :style="style()" class="card">
					<div class="card-body" v-if="!$store.state.wallet_connected">
						<h1>LOGIN</h1>

						<div class="text-center">
							<Phantom class="btn btn-outline-primary btn-lg"></Phantom>
						</div>
					</div>
					<div class="card-body" v-if="$store.state.wallet_connected">
						<h1 class="mb-3">GETTING STARTED</h1>

						<p class="text-center">New & existing sites can be managed from the dashboard.</p>

						<div class="text-center">
							<router-link class="btn btn-outline-primary btn-lg" to="/dashboard">DASHBOARD</router-link>
						</div>
					</div>
				</div>


			</div>
		</div>


		<div class="text-black text-center my-5">
			<a class="mx-2 nl" href="https://explorer.blok.host" target="_blank">Blok Explorer</a>
			<a class="mx-2 nl" href="https://drive.blok.host" target="_blank">Drive Manager</a>
		</div>

		<div class="text-center text-black mt-5">
			<pre><code>{{ node_stats.checksum }}</code></pre>
			<!--			<pre><code>{{ node_stats.uptime / 8.64e+13 }}</code></pre>-->
		</div>
	</div>
</template>

<script>
import Phantom from "../components/Phantom";
import {BlokHost} from "../api/blok_host";

export default {
	name: "Home",
	components: {Phantom},
	data() {
		return {
			stats: {},
			node_stats: {},
			fmt: new Intl.NumberFormat(),
		}
	},
	methods: {
		style: function() {
			return {animationDelay: `${Math.random()}s`, animationDuration: `${Math.random() * 10}s`}
		}
	},
	mounted() {
		new BlokHost().shadowStats().then(r => {
			this.stats = r.data
		})
		new BlokHost().nodeStats().then(r => {
			this.node_stats = r.data
		})
	}
}
</script>

<style scoped>
.card {
	padding: 5px;
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	animation: gradient 3s ease infinite;
}

.card-body {
	border-radius: 3px;
	background: white;
}

.nl {
	text-transform: uppercase;
	font-weight: bold;
	color: grey;
}

.nl:hover {
	color: darkgray;
}
</style>