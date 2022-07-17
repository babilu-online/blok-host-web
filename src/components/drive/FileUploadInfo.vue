<template>
	<div class="file-outer">
		<div class="file p-1">
			<div class="row text-end">
				<div class="col-auto text-start">
					<i class="fa fa-download"></i>
					<span class="small ms-2">{{ request.file.name }}</span>
				</div>
				<div class="col">
					<code>{{ request.file.type }}</code>
				</div>
				<div class="col-auto">
					<div class="badge bg-secondary me-3" v-if="request.file.name.indexOf('index.') !== -1">INDEX FILE</div>
					<div class="badge bg-primary">{{ request.status }}</div>
				</div>
				<div class="col-2 text-end">
					{{ size }} MB
				</div>
				<div class="col-auto pe-4" @click="remove">
					<i class="fa fa-close"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "FileUploadInfo",
	props: {
		request: {
			type: Object,
			required: true
		}
	},
	computed: {
		size: function () {
			return (this.request.file.size / 1024 / 1024).toFixed(2);
		}
	},
	methods: {
		remove: function (e) {
			e.preventDefault()
			this.$emit("remove", this.request.file);
		}
	},
	mounted() {
		console.log("FileUpload mounted", this.request);
	}
}
</script>

<style scoped>
.file-outer {
	padding: 3px;
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	border-radius: 13px;
}
.file {
	background: #fefefe;
	border: 3px solid transparent;
	border-radius: 9px;
}
</style>