<template>
	<router-link :class="`${isActive ? 'active' : ''} nav-link text-uppercase`" :to="`${link}`">{{ title }}</router-link>
</template>

<script>
export default {
	name: "NavRouterLink",
	props: {
		link: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		activeHash: {
			type: String,
			required: true,
		}
	},
	computed: {
		isActive: function() {
			return this.activeHash === `#/${this.link}`
		}
	}
}
</script>

<style scoped>
a {
	transition: all 0.3s ease-in-out;
}
</style>