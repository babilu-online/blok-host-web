<template>
	<section id="view-site">
		<div class="container">

		<div class="col-12 col-lg-8 offset-lg-2">
			<div class="text-start mt-5">
				<h4>STEP 3.</h4>
				<p>View your site online</p>
			</div>

			<div class="site-container text-center">
				<div v-if="siteUri === ''" class="site-placeholder">
					<div v-if="loading">Loading your site, please wait</div>
					<div v-else>
						<p>Upload a site to view it</p>
						<a href="#upload" class="btn btn-outline-light">Upload</a>
					</div>

				</div>
				<iframe v-if="siteUri !== ''" :src="siteUri"></iframe>
			</div>
		</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "ViewSite",
	props: {
		siteUri: {
			type: String,
			default() {
				// return `https://af8a6408523463441a997b4f900f7af9.blok.host/`
				return ``
			}
		},
		loading: {
			type: Boolean,
			default() {
				return false
			}
		}
	}
}
</script>

<style scoped>

.site-container {
	height: 400px;
}

iframe {
	width: 100%;
	height: 100%;
}

.site-placeholder {
	border: 2px solid white;
	border-radius: 9px;
	height: 100%;
	position: relative;
}

.site-placeholder div {
	position: absolute;
	text-transform: uppercase;
	top: 45%;
	width: 100%;
}
</style>