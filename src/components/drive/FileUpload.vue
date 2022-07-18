<template>
	<div class="text-center">
		<div class="upload-outer">
			<div ref="uploader" class="upload-container">
				<form enctype="multipart/form-data">
					<input id="file-upload" ref="file" type="file" multiple="true" class="file-upload" @change="filesChange">
				</form>
				<h1 class="my-5">Drag to upload</h1>
			</div>
		</div>

		<div class="row mt-3">
			<div class="pending-file-container" v-show="uploadFiles.length > 0">
				<div class="col-12 my-1" v-for="(file,key) in uploadFiles" :key="key">
					<FileUploadInfo @remove="uploadFiles.splice(key,1)" :request="file"></FileUploadInfo>
				</div>
			</div>

			<div class="col-12 text-center mt-3">
				<p class="small mb-3 fw-bold">Total Upload Size: {{ (uploadSize / 1024 / 1024).toPrecision(3) }} MB</p>
				<!--				<p v-show="!canUpload" class="small text-danger">Upload size exceeds available size!</p>-->
				<p v-show="!hasIndex" class="small text-danger mb-1">Missing index page</p>
				<button :disabled="!hasIndex" class="btn btn-primary text-uppercase fw-bold px-4 py-2" @click="onUploadClick">Create Site</button>
			</div>
		</div>

		<div class="row mt-3">
			<div class="col-12">
				<div class="row">
					<div class="offset-3 col-6">
						<table class="table table-striped text-start small">
							<thead></thead>
							<tbody>
							<tr>
								<td>Shadow Storage cost:</td>
								<td>
									<span class="fw-bold ms-1">{{ uploadCost.toPrecision(3) }} </span>
									<SHDW class="fw-bold"></SHDW>
								</td>
							</tr>
							<tr>
								<td>Solana account creation cost:</td>
								<td>
									<span class="fw-bold"> ~ 0.004 </span>
									<SOL></SOL>
								</td>
							</tr>
							<tr>
								<td>Blok Host cost:</td>
								<td>
									<span class="fw-bold">FREE while in ALPHA</span>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="loading" v-if="loading">
			<div class="loading-container">
				<div class="inner-loading">
					<span class="mt-4"><i class="fa fa-spin fa-spinner text-white"></i> {{ loadingHints }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FileUploadInfo from "./FileUploadInfo";
import JSZip from 'jszip';
import SOL from "../tokens/SOL";
import SHDW from "../tokens/SHDW";
import {Shadow} from "../../api/shadow";

export default {
	name: "FileUpload",
	components: {SHDW, SOL, FileUploadInfo},
	props: {
		uploadFiles: {
			type: Array,
			default: function () {
				return [];
			}
		},
		files: {
			default: function () {
				return {};
			}
		},
	},
	data() {
		return {
			loading: false,
			loadingHints: "Loading, please wait...",
			shadow: null,
			drive: {
				account: {}
			}
		}
	},
	watch: {
		'$store.state.wallet_addr'() {
			console.log("Wallet address changed", this.$store.state.wallet_addr);
			this.onWalletConnected()
		}
	},
	computed: {
		uploadCost: function () {
			return (this.uploadSize / 1024 / 1024 / 1000) * 0.25
		},

		canUpload: function () {
			const avail = this.drive.account.storageAvailable || (this.drive.account.reserved_bytes - this.drive.account.current_usage)
			return this.uploadSize < avail;
		},

		hasIndex: function () {
			return this.uploadFiles.filter((file) => {
				return file.file.name.indexOf("index.") > -1
			}).length > 0
		},

		uploadSize: function () {
			return this.uploadFiles.reduce((acc, file) => {
				return acc + file.file.size;
			}, 0);
		},
	},
	methods: {
		onUploadClick: async function () {
			this.$emit("upload")

			const drive = await this.onDriveCreate({
				name: `blok_host_` + new Date().toISOString().slice(0, -8),
				size: Math.ceil(this.uploadSize / 1024),
				denom: "B"
			}).catch(e => {
				console.error("Drive create error: ", e)
			}).finally(() => {
				this.loading = false
			})

			if (!drive) {
				this.$toastr.e("Unable to create storage drive")
				return
			}

			console.log("Drive Created!", drive)
			this.drive.shdw_bucket = drive.shdw_bucket;

			this.uploadMultipleFiles(this.uploadFiles)

		},

		onUploadComplete: function (drive) {
			this.$emit("upload-complete", drive)
		},


		onDriveCreate(cfg) {
			console.log("Creating drive", cfg)
			this.loading = true;
			this.loadingHints = "Creating storage drive, please wait..."
			return this.shadow.create(cfg.name, cfg.size, cfg.denom)
		},

		uploadMultipleFiles(uploadArr) {

			const files = []
			this.loading = true;
			this.loadingHints = "Uploading files, please wait..."

			//Validate file names
			for (let i = 0; i < uploadArr.length; i++) {
				if (uploadArr[i].status !== "pending") {
					console.warn("File already uploaded: ", uploadArr[i])
					continue
				}

				uploadArr[i].status = "uploading"

				const data = uploadArr[i].file
				if (data.name.length > 32) {
					const ext = "." + data.name.split('.').pop();
					const shorterName = data.name.substr(0, 32 - ext.length) + ext
					Object.defineProperty(data, 'name', {
						writable: true,
						value: shorterName
					});
				}

				files.push(uploadArr[i].file)
			}

			this.shadow.uploadMultipleFiles(this.drive.shdw_bucket, files).then((resp) => {
				console.log("File Uploaded", resp);
				this.$toastr.s("Files Uploaded");

				for (let i = 0; i < uploadArr.length; i++) {
					uploadArr[i].status = "uploaded"
					uploadArr[i].result = resp
				}

				this.onUploadComplete(this.drive.shdw_bucket);

			}).catch((err) => {
				console.log("File upload error", err);

				for (let i = 0; i < err.length; i++) {
					this.$toastr.e(err[i].error, err[i].file);
				}

			}).finally(() => {
				this.loading = false;
			});
		},

		onDragOver(e) {
			e.stopPropagation();
			e.preventDefault()
			e.dataTransfer.effectAllowed = "move";
			this.visible = true;
		},

		onDragLeave(e) {
			if (e.pageX !== 0 || e.pageY !== 0) { //Stops flickering
				return false;
			}

			e.stopPropagation();
			e.preventDefault()
			// console.log('onDragLeave', e);
			this.visible = false;
		},
		filesChange: function () {
			for (let i = 0; i < this.$refs.file.files.length; i++) {
				this.onFile(this.$refs.file.files[i])
			}
		},

		onFile: function (file) {
			if (!file) {
				return
			}
			console.log("File dropped", file)
			// handle file changes

			if (file.type === "application/x-zip-compressed") {
				JSZip.loadAsync(file).then((zip) => {
					console.log("Zip loaded:", zip)

					zip.forEach((relativePath, file) => {
						console.log("File", file, relativePath)

						if (file.dir) {
							//TODO handle dir
							return
						}

						const parts = file.name.split("/")
						const fileName = parts.pop();
						const folder = parts.pop() || "";
						const folderParent = parts.pop() || "";

						file.async("blob").then(str => {
							this.onFileAdded(new File([str], fileName), folder, folderParent)
						})

					})
				});

			} else {
				this.onFileAdded(file)
			}

		},

		onFileAdded: function (file, folder = "", parentFolder = "") {
			if (file.name.length > 32) {
				const ext = "." + file.name.split('.').pop();
				const shorterName = file.name.substr(0, 32 - ext.length) + ext
				Object.defineProperty(file, 'name', {
					writable: true,
					value: shorterName
				});
			}

			const alreadyExists = this.uploadFiles.filter((f) => f.file.name === file.name)
			const alreadyUploaded = Object.values(this.files).filter((f) => f.name === file.name && f.status !== "pending")

			if (alreadyUploaded.length > 0 || alreadyExists.length > 0) {
				this.$toastr.e("File already uploaded")
				return
			}

			this.$emit("addFile", file, folder, parentFolder)
		},


		async onWalletConnected() {
			this.shadow = new Shadow();
			await this.shadow.initDrive(this.$store.state.wallet_addr);
		},
	},
	mounted() {
		if (this.$store.state.wallet_connected) {
			this.onWalletConnected()
		}

		this.$refs.uploader.addEventListener('dragover', this.onDragOver);
		this.$refs.uploader.addEventListener('dragleave', this.onDragLeave);
	},
	beforeDestroy() {
		if (!this.$refs.uploader)
			return

		this.$refs.uploader.removeEventListener('dragover', this.onDragOver)
		this.$refs.uploader.removeEventListener('dragleave', this.onDragLeave)
	},
}
</script>

<style scoped>


.upload-container {
	position: relative;
	min-height: 100px;
}

.pending-file-container {
	max-height: 300px;
	overflow-y: scroll;
}

.upload-container {
	background: rgba(255, 255, 255, 1);
	border: 3px solid white;
	border-radius: 7px;
	transition: all 0.3s ease-in-out;
	font-weight: bold;
}

.upload-container h1 {
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	-webkit-background-clip: text;
	font-weight: bolder;
	-webkit-text-fill-color: transparent;
	transition: all 0.3s ease-in-out;
}

.upload-container:hover {
	background: rgba(255, 255, 255, 0.8);
}

.upload-container:hover h1 {
	background: linear-gradient(90deg, rgba(212, 20, 90, 1) 0%, rgba(251, 176, 59, 1) 100%);
	-webkit-background-clip: text;
	font-weight: bolder;
	-webkit-text-fill-color: transparent;
}

.upload-outer {
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	animation: gradient 3s ease infinite;
	padding: 5px;
	border-radius: 9px;
}

.file-upload {
	margin: 1%;
	content: '';
	display: inline-block;
	cursor: pointer;
	height: 100%;
	width: 100%;
	opacity: 0;

	background: transparent;
	transform: none;
	text-align: center;
	vertical-align: center;
}


form {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.loading {
	background: rgba(255, 255, 255, 0.8);
	color: white;
	position: absolute;
	border-radius: 7px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
}

.loading-container {
	position: relative;
	top: 45%;
	text-transform: uppercase;
}

.inner-loading span {
	font-family: "Arial Black", monospace;
	font-size: 2.2em;
	font-weight: 900;
	color: white;
}

.inner-loading span {
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	animation: gradient 3s ease infinite;
	width: auto;
	border-radius: 14px;
	padding: 2%;
}

@keyframes glow {
	from {
		text-shadow: 0 0 20px rgba(212, 20, 90, 1);
	}
	to {
		text-shadow: 0 0 30px rgba(212, 20, 90, 1), 0 0 10px rgba(212, 20, 90, 1);
	}
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>