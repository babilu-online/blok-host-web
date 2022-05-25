<template>
	<a :class="`${isActive ? 'active' : ''} nav-link text-uppercase`" :href="`#${hash}`">{{ title }}</a>
</template>

<script>
export default {
	name: "NavHashLink",
	props: {
		hash: {
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
			return this.activeHash === `#/${this.hash}`
		}
	}
}
</script>

<style scoped>
a {
	transition: all 0.3s ease-in-out;
}
</style>