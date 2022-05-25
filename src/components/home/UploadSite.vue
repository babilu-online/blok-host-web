<template>
	<section id="upload" class="text-center">
		<div class="container">
		<h2 class="mt-5">Getting Started</h2>

		<div class="row mt-5">
			<div class="col-12 col-lg-8 offset-lg-2">
				<p>To get started simply zip up your website files and upload them onto the platform, then simply register your site to see it hosted immediately. Custom subdomains can
				be requested and if available are charged at a flat rate based on the length of the subdomain.</p>
			</div>

			<div class="col-12 col-lg-8 offset-lg-2 mt-5">

				<!--			Uploader-->
				<div class="text-start">
					<h4>STEP 1.</h4>
					<p class="mb-4">Upload your site & create your decentralised storage drive via the shadow drive. This ensures your files can be accessed by all Blok Operators.</p>
				</div>

				<div class="col-12">

					<div class="row">
						<div class="col-6">
							<p>Storage is charged at a flat rate:</p>
							<SHDW class="fw-bold">1 SHDW / GB</SHDW>
						</div>
						<div class="col-4 offset-1">
							<div class="input-group mb-3">
								<input class="form-control" v-model="siteSize" type="number" min="1" placeholder="Site Size"><span class="mt-2">MB</span>
							</div>
							<span><SHDW class="fw-bold">{{ calculatorCost }} SHDW</SHDW> ( <i>~${{usdCost}}</i> )</span>
						</div>
					</div>
				</div>

				<div class="upload-outer mt-4">
					<h4 class="upload-text">Drag Zip File</h4>
				</div>

			</div>

		</div>
		</div>


	</section>
</template>

<script>
import SHDW from "../tokens/SHDW";
import axios from "axios";

export default {
	name: "UploadSite",
	components: {SHDW},
	data() {
		return {
			siteSize: 100,
			shdwPrice: 1,
		}
	}, computed: {
		calculatorCost: function () {
			return (parseFloat(this.siteSize) / 1024).toFixed(4)
		},
		usdCost: function() {
			return (this.calculatorCost * this.shdwPrice).toFixed(2)
		},
	},
	methods: {
		getShdwPrice: function() {
			axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=genesysgo-shadow&vs_currencies=usd`).then(r => {
				this.shdwPrice = r.data["genesysgo-shadow"].usd
			})
		}
	},
	mounted() {
		this.getShdwPrice()
	}
}
</script>

<style scoped>
.upload-outer {
	min-height: 300px;
	border: 3px dashed white;
	position: relative;
}

.upload-text {
	position: absolute;
	top: 40%;
	left: 42%;
}

</style>