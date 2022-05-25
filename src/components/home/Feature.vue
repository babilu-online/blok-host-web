<template>
	<div class="feature card">
		<div class="card-body">
			<h3>{{ feature.title }}</h3>
			<p>{{ feature.description }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Feature",
	props: {
		feature: {
			type: Object,
			required: true,
		},
	}
}
</script>

<style scoped>
.feature {
	height: 100%;
}

h3 {
	text-align: center;
	text-transform: uppercase;
}
</style>