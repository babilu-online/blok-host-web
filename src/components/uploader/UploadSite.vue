<template>
	<section id="upload" class="text-center text-black">
		<div class="container">
			<div class="row">

				<div class="col-12">

					<!--			Uploader-->
					<div class="text-start">
						<h4>STEP 2.</h4>
						<p class="mb-1">Upload your site & create your decentralised storage drive via the shadow drive. This ensures your files can be accessed by all Blok Operators.</p>
						<p>Once created, a storage drives space allocation can be adjusted & more files can be uploaded into the site.</p>
					</div>
				</div>

				<div class="col-12 mt-4">
					<FileUpload :upload-files="uploadedFiles" @upload-complete="onDriveCreated"
							@addFile="onFileAdded"></FileUpload>
				</div>


				<div class="col-12 mt-4 small">

					<div class="row">
						<div class="col-auto pt-1">
							<span class="me-3">Storage is charged at a flat rate:</span>
							<SHDW class="fw-bold">0.25 SHDW / GB</SHDW>
							<span class="ms-4">|</span>
						</div>
						<div class="col-auto">
							<div class="input-group">
								<input class="form-control form-control-sm text-black" v-model="siteSize" type="number" min="1" placeholder="Site Size"><span class="mt-1 ms-3 fw-bold">MB</span>
							</div>
						</div>
						<div class="col-auto pt-1">
							<span class="me-3 fw-bold">=</span>
							<span><SHDW class="fw-bold">{{ calculatorCost }} SHDW</SHDW> ( <i>~${{ usdCost }}</i> )</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>
</template>

<script>
import SHDW from "../tokens/SHDW";
import axios from "axios";
import FileUpload from "../drive/FileUpload";

export default {
	name: "UploadSite",
	components: {SHDW, FileUpload},
	data() {
		return {
			siteSize: 400,
			shdwPrice: 1,
			uploadedFiles: [],
		}
	}, computed: {
		calculatorCost: function () {
			return (parseFloat(this.siteSize) / 1024).toFixed(4) / 4
		},
		usdCost: function () {
			return (this.calculatorCost * this.shdwPrice).toFixed(2)
		},
	},
	methods: {
		getShdwPrice: function () {
			axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=genesysgo-shadow&vs_currencies=usd`).then(r => {
				this.shdwPrice = r.data["genesysgo-shadow"].usd
			})
		},

		onDriveCreated: function (drive) {
			console.log("Site created!", drive)
			this.$emit("upload", drive)
		},

		onFileAdded: function (f) {
			const pendingFile = {
				status: "pending",
				result: null,
				file: f
			}

			this.uploadedFiles.push(pendingFile)
		},
	},
	mounted() {
		this.getShdwPrice()
	}
}
</script>

<style scoped>
</style>