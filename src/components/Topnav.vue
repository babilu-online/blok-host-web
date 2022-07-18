<template>
	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark gradient-primary">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/explorer">
				<img src="/logo.svg" height="40" class="d-inline-block align-top" alt="BlokHost">
			</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-lg-0">
					<li class="nav-item">
						<NavRouterLink link="home" title="Home" :active-hash="hash"></NavRouterLink>
					</li>
					<li class="nav-item">
						<NavRouterLink link="sites" title="sites" :active-hash="hash"></NavRouterLink>
					</li>
				</ul>

				<ul class="navbar-nav ms-auto me-5 mb-lg-0">
					<li class="nav-item">
						<router-link class="btn btn-outline-light btn-block btn-sm" to="/upload">NEW SITE</router-link>
					</li>
				</ul>
			</div>
			<div class="auth">
				<Phantom class="btn btn-outline-light btn-block btn-sm wow fadeIn"></Phantom>
			</div>
		</div>
	</nav>
</template>

<script>

import Phantom from "./Phantom";
import NavRouterLink from "./NavRouterLink";

export default {
	name: "Topnav",
	components: {NavRouterLink, Phantom},
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