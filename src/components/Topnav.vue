<template>
	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/explorer">
				<img src="/logo.svg" height="40" class="d-inline-block align-top" alt="BlokHost"> <span class="fs-3">BLOK HOST</span>
			</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<NavHashLink hash="home" title="Home" :active-hash="hash"></NavHashLink>
					</li>
					<li class="nav-item">
						<NavHashLink hash="features" title="Features" :active-hash="hash"></NavHashLink>
					</li>
					<li class="nav-item">
						<NavHashLink hash="upload" title="Upload" :active-hash="hash"></NavHashLink>
					</li>
					<li class="nav-item">
						<NavHashLink hash="process" title="Process" :active-hash="hash"></NavHashLink>
					</li>
					<li class="nav-item">
						<NavHashLink hash="operators" title="Operators" :active-hash="hash"></NavHashLink>
					</li>
					<li class="nav-item">
						<NavHashLink hash="roadmap" title="Roadmap" :active-hash="hash"></NavHashLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>

import NavHashLink from "./NavHashLink";

export default {
	name: "Topnav",
	components: {NavHashLink},
	data() {
		return {
			hash: '#/'
		}
	},
	mounted() {
		window.addEventListener('hashchange', event => {
			console.log(event, window.location.hash)
			this.hash = window.localStorage.getItem("hash")
			if (["#/dns", "#/view-site"].includes(this.hash)) {
				this.hash = "#/process"
			}
			console.log("Hash set: ", this.hash)

		});
	}
}
</script>

<style scoped>
.topnav {
	position: fixed;

}

.navbar-brand, .navbar-dark .navbar-nav .nav-link, .nav-item {
	color: white;
}

.sol-icon {
	border-radius: 33px;
}
</style>