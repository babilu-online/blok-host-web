<template>
	<div class="home">
		<Hero></Hero>
		<div class="container">
			<Features></Features>
			<UploadSite></UploadSite>
			<Process></Process>
			<ViewSite></ViewSite>
			<RegisterDns></RegisterDns>
			<Operators></Operators>
			<Roadmap></Roadmap>
		</div>
	</div>
</template>

<script>
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Process from "../components/home/Process";
import UploadSite from "../components/home/UploadSite";
import ViewSite from "../components/home/ViewSite";
import RegisterDns from "../components/home/RegisterDns";
import Roadmap from "../components/home/Roadmap";
import Operators from "../components/home/Operators";

export default {
	name: "Home",
	components: {
		Operators,
		Roadmap,
		RegisterDns,
		ViewSite,
		UploadSite,
		Process,
		Features,
		Hero,
	},
	data() {
		return {
			//
		}
	},
	computed: {
		//
	},
	methods: {
		//
	}
}
</script>

<style scoped>

.home {
	color: white;
}

h6 {
	text-transform: uppercase;
}

link {
	cursor: pointer;
}
</style>