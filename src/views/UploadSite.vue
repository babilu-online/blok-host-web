<template>
	<div class="container site-creation">
		<div class="row">

			<div class="col-12">
				<div class="card my-5">
					<div class="card-header">
						<h1 class="text-start mt-2">New Site</h1>
					</div>
					<div class="card-body">
						<Uploader></Uploader>
					</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script>
import Uploader from "../components/uploader/Uploader";
export default {
	name: "UploadSite",
	components: {Uploader}
}
</script>

<style scoped>
.site-creation {
	min-height: 500px;
}
</style>