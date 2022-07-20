<template>
	<section id="dns">
		<div class="container">
		<div class="col-12">
			<div class="text-start">
				<h4>STEP 3. <sup class="fs-xs">(optional)</sup></h4>
				<p>Register existing DNS to point to your site.</p>
			</div>
		</div>

		<div class="row">
			<div class="col-6">
				<div class="dns-example-outer mt-4">
				<div class="dns-example card h-100">
					<div class="card-body pt-4">
						<p>Record Type: <code>CNAME</code></p>
						<p>Name: <code>{{ `www.example.com` }}</code></p>
						<p>Value: <code>{{ driveUri }}</code></p>
						<p>TTL: <code>3600</code></p>
					</div>
				</div>
				</div>
			</div>

			<div class="col-6 text-center">

				<div class="dns-path bg-primary p-2 text-white"><h5 class="mb-0"><i class="fa fa-cloud"></i> <code>{{ `www.example.com` }}</code></h5></div>

				<p class="my-2"><i class="fa fa-down-long"></i></p>

				<div class="dns-path bg-primary p-2 text-white"><h5 class="mb-0"><i class="fa fa-bridge"></i> <code>{{ driveUri }}</code></h5></div>

				<p class="my-2"><i class="fa fa-down-long"></i></p>

				<div class="dns-path bg-primary p-2 text-white"><h5 class="mb-0"><i class="fa fa-chain"></i> <code>{{ `Blok Host Storage Network` }}</code></h5></div>
			</div>
		</div>

			<div class="row mt-5">
				<div class="col text-center">
					<button class="btn btn-primary px-5 py-2" @click="onDone">NEXT</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from "axios";

export default {
	name: "RegisterDns",
	props: {
		drive: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			uri: ''
		}
	},
	computed: {
		driveUri: function() {
			return `${this.uri}.blok.host`
		}
	},
	methods: {
		onDone: function() {
			this.$emit('done', `https://${this.driveUri}`)
		},

		pingBlokHost() {
			axios.post("https://webhost2.alphabatem.com/cid/register", {
				address: this.drive,
			}).then((r) => {
				this.uri = r.data.cid
			}).catch(() => {
				console.log("Unable to verify on blokhost")
			})
		},
	},
	mounted() {
		this.pingBlokHost()
	}
}
</script>

<style scoped>
sup {
	top: -1.6em;
}

.fs-xs {
	font-size: 0.4em;
}

.dns-example {
	text-align: left;
}

.dns-example p {
	margin-bottom: 0;
}


.dns-example-outer {
	background: linear-gradient(45deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	padding: 5px;
	animation: gradient 3s ease infinite;
	border-radius: 9px;
}

.dns-path {
	max-width: 75%;
	margin: auto;
	color: white;
	border-radius: 14px;
}

.dns-path * {
	color: white;
}
</style>