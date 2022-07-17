<template>
	<section id="dns">
		<div class="container">
			<div class="col-12">
				<div class="text-start">
					<h4>STEP 1.</h4>
					<p>Select creation method</p>
				</div>
			</div>

			<div class="row mt-5">
				<div class="col-6">
					<div class="option-outer" @click="active = 0" :class="`${active === 0 ? 'active' : ''}`">
						<div class="option-inner">
							<h1 class="py-5 mb-0">New Site</h1>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="option-outer" @click="active = 1" :class="`${active === 1 ? 'active' : ''}`">
						<div class="option-inner">
							<h1 class="py-5 mb-0">Existing Drive</h1>
						</div>
					</div>
				</div>
			</div>

			<div class="row mt-5" v-if="active === 1">
				<h4>Existing Drives:</h4>

				<div class="drive-container">
					<div class="row">
						<div class="col-12" v-for="(drive, key) in drives" :key="key">
							<div class="card drive p-2 my-2" @click="activeDrive=drive.publicKey.toString()" :class="`${activeDrive === drive.publicKey.toString() ? 'active' : ''}`">
								<div class="row">
									<div class="col ps-3">{{ drive.account.identifier }}</div>
									<div class="col-auto"><code>{{ drive.publicKey }}</code></div>
									<div class="col-auto"><code>{{ drive.account.owner1 }}</code></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row mt-5">
				<div class="col text-center">
					<button class="btn btn-primary px-5 py-2" @click="onNext">NEXT</button>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import {Shadow} from "../../api/shadow";

export default {
	name: "ExistingDrive",
	data() {
		return {
			shadow: null,
			active: 0,
			drives: [],
			activeDrive: "",
		}
	},
	watch: {
		'$store.state.wallet_addr'() {
			console.log("Wallet address changed", this.$store.state.wallet_addr);
			this.onWalletConnected()
		}
	},
	methods: {
		onNext: function() {
			if (this.active === 0) {
				this.$emit('new')
				return;
			}

			if (this.activeDrive === "") {
				this.$toastr.e("Select a drive")
				return
			}

			this.$emit("existing", this.activeDrive)
		},

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
.text-grey {
	color: lightgray;
}


.option-outer {
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	animation: gradient 3s ease infinite;
	padding: 5px;
	border-radius: 9px;
	cursor: pointer;
}

.option-inner {
	border: 3px solid transparent;
	background: white;
	border-radius: 7px;
}

.drive {
	border: 2px solid white;
	cursor: pointer;
}

.drive:hover {
	transform: scale(1.01);
	border: 2px solid rgba(212, 20, 90, 1);
}

.drive-container {
	max-height: 600px;
	overflow-y: auto;
}
</style>