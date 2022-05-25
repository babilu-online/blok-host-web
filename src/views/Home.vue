<template>
	<div class="home">
		<Hero></Hero>
		<div class="home-container">
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
			lastKnownScrollPosition: 0,
			ticking: false,
			sections: [],
			currentHash: window.location.hash,
		}
	},
	computed: {
		//
	},
	methods: {
		//
		onScroll: function () {
			this.lastKnownScrollPosition = window.scrollY;
			this.handleScroll()
		},

		handleScroll: function () {
			for (let i = 0; i < this.sections.length; i++) {
				const hash = `#/${this.sections[i].id}`

				if (this.checkVisible(this.sections[i])) {

					if (this.currentHash === hash)
						return;

					console.log("Setting hash: ", hash)
					this.currentHash = hash;
					window.localStorage.setItem("hash", hash)
					window.dispatchEvent(new CustomEvent('hashchange', {}));

					return;
				}
			}
		},

		checkVisible: function (el) {
			const position = el.getBoundingClientRect();
			// checking for partial visibility
			if (position.top < window.innerHeight && position.bottom >= 0) {
				return true;
			}
			return false;
		}
	},
	mounted() {
		document.addEventListener('scroll', this.onScroll)
		this.sections = [];

		const htSections = document.getElementsByTagName("section");
		for (let i = 0; i < htSections.length; i++) {
			this.sections.push(htSections[i])
		}

		// this.sections = this.sections.reverse();
	},
	beforeDestroy() {
		document.removeEventListener('scroll', this.onScroll)
	}
}
</script>

<style scoped>

.home, .home-container {
	color: white;
}

h6 {
	text-transform: uppercase;
}

link {
	cursor: pointer;
}

section {
	padding-top: 5%;
	padding-bottom: 5%;
}

section {
	background: black;
}

section:nth-child(2n) {
	background: darkorange;
}
</style>