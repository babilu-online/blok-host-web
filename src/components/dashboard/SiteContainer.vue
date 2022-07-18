<template>
	<div v-on:click="$emit('click',site.meta.id)" class="site-container p-2 mb-2">
		<div class="row">
			<div class="col-auto">
				<div :style="style" alt="site-image" :src="site.meta.image" class="img-fluid" width="150px"></div>
			</div>

			<div class="col text-start">
				<h4 class="mb-0">{{ site.meta.site_name }}</h4>
				<p class="small mb-2">{{ site.meta.description }}</p>
				<a target="_blank" :href="`https://${site.subdomain}.blok.host`" class="fw-bold small">{{ site.subdomain }}.blok.host</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SiteContainer",
	props: {
		site: {
			type: Object,
			required: true,
		}
	},
	computed: {
		style: function() {
			return {
				width: `150px`,
				height: `84px`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "contain",
				backgroundImage: `url("${this.site.meta.image}"), url("https://via.placeholder.com/150x84")`
			}
		}
	}
}
</script>

<style scoped>
.site-container {
	border-radius: 7px;
}

.site-container:hover {
	background: rgba(0, 0, 0, 0.2);
	cursor: pointer;
}


.img-fluid {
	border-radius: 7px;
}
</style>