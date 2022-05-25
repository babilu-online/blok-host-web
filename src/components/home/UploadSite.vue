<template>
	<section id="upload" class="text-center">
		<h2 class="mt-5">Upload</h2>

		<div class="row mt-5">
			<div class="col-12 col-lg-8 offset-lg-2">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur corporis earum eos eveniet expedita ipsa itaque molestias necessitatibus non obcaecati,
					odit omnis perferendis praesentium quae quas, quisquam repudiandae tenetur!</p>
			</div>

			<div class="col-12 col-lg-8 offset-lg-2 mt-5">

				<!--			Uploader-->
				<div class="text-start">
					<h4>STEP 1.</h4>
					<p>Upload your site & create your decentralised storage drive.</p>
				</div>

				<div class="upload-outer">
					<h4 class="upload-text">Drag Zip File</h4>
				</div>

			</div>

		</div>


	</section>
</template>

<script>
export default {
	name: "UploadSite"
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