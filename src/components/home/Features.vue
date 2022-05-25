<template>
<section id="features">
	<div class="row">
		<div class="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0">
			<Feature></Feature>
		</div>
		<div class="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0">
			<Feature></Feature>
		</div>
		<div class="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0">
			<Feature></Feature>
		</div>
		<div class="col-12 col-md-6 col-lg-3 mt-3 mt-lg-0">
			<Feature></Feature>
		</div>
	</div>
</section>
</template>

<script>
import Feature from "./Feature";
export default {
	name: "Features",
	components: {Feature}
}
</script>

<style scoped>

</style>