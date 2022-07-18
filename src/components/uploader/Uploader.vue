<template>
	<div id="site-uploader" class="p-3">
		<Login v-if="step === -1"></Login>
		<ExistingDrive @new="onNewDrive" @existing="onExistingDrive" v-if="step === 0"></ExistingDrive>
		<UploadSite v-if="step === 1" @upload="onUpload" ></UploadSite>
		<!--		<Process v-if="step === 1" @site-hosted="onHosted"></Process>-->
		<RegisterDns :drive="site.driveID" v-if="step === 2" @done="onDNSDone"></RegisterDns>
		<ViewSite :drive="site.driveID" :siteUri="site.url" v-if="step === null"></ViewSite>
	</div>
</template>

<script>
import UploadSite from "./UploadSite";
import RegisterDns from "./RegisterDns";
// import Process from "../home/Process";
import ViewSite from "./ViewSite";
import Login from "./Login";
import ExistingDrive from "./ExistingDrive";

export default {
	name: "Uploader",
	components: {ExistingDrive, Login, ViewSite, RegisterDns, UploadSite},
	data() {
		return {
			site: {
				driveID: '',
				url: '',
			},
			step: -1,
			steps: {
				0: {
					name: "Upload",
					templateOnly: false,
					nextStep: 1,
				},
				1: {
					name: "Register",
					templateOnly: true,
					nextStep: 2,
				},
				2: {
					name: "DNS",
					templateOnly: false,
					nextStep: null,
				},
			}
		}
	},
	computed: {
		isFinished: function () {
			return this.step === null;
		}
	},
	watch: {
		'$store.state.wallet_addr'() {
			console.log("Wallet address changed", this.$store.state.wallet_addr);
			this.onWalletConnected()
		}
	},
	methods: {
		onNext: function () {
			this.step = this.steps[this.step].nextStep
		},

		onNewDrive: function() {
			this.onNext()
		},

		onExistingDrive: function(drive) {
			this.step = 2
			this.site.driveID = drive
		},

		onHosted: function (uri) {
			this.site.url = uri
			this.onNext()
		},
		onUpload: function (drive) {
			this.site.driveID = drive
			this.onNext();
		},

		onDNSDone: function (uri) {
			this.site.url = uri
			this.onNext();
		},

		async onWalletConnected() {
			this.step = 0;
		},
	},
	mounted() {
		if (this.$store.state.wallet_connected) {
			this.onWalletConnected()
		}

	}
}
</script>

<style scoped>
</style>