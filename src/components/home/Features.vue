<template>
	<section id="features">
		<div class="container">
		<h2 class="text-center my-5">Features</h2>

		<div class="row">
			<div class="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0" v-for="(feature,key) in features" :key="key">
				<Feature :feature="feature"></Feature>
			</div>
		</div>
		</div>
	</section>
</template>

<script>
import Feature from "./Feature";

export default {
	name: "Features",
	components: {Feature},
	data() {
		return {
			features: [
				{
					title: "Hosted Forever",
					description: "Once a site has been registered on blok.host it is available forever through our fleet of community driven node operators."
				},
				{
					title: "Web Security",
					description:
							"Immutable websites are perfece for DApp's looking to further secure their offering. All files are verified against their on-chain SHA256 checksum prior to being served."
				},
				{
					title: "Cost Effective",
					description: "By leveraging the scalability of Solana & the Shadow Drive customers can host their site for a fraction of a cost compared to web2 competitors."
				},
				{
					title: "Performance",
					description: "Through our decentralised operator network BlokHost can serve your site from the optimal geo location & storage location to ensure the fastest TTFB."
				},
			]
		}
	}
}
</script>

<style scoped>

</style>