<template>
	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/explorer">
				<!--						TODO LOGO-->
				<img src="" height="40" class="d-inline-block align-top" alt="BlokHost">
			</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item active">
						<router-link to="/" class="nav-link text-uppercase" href="#">Home <span class="sr-only">(current)</span></router-link>
					</li>
					<li class="nav-item active">
						<router-link to="/" class="nav-link text-uppercase" href="#">Features <span class="sr-only">(current)</span></router-link>
					</li>
					<li class="nav-item active">
						<router-link to="/" class="nav-link text-uppercase" href="#">Upload <span class="sr-only">(current)</span></router-link>
					</li>
					<li class="nav-item active">
						<router-link to="/" class="nav-link text-uppercase" href="#">Process <span class="sr-only">(current)</span></router-link>
					</li>
					<li class="nav-item active">
						<router-link to="/" class="nav-link text-uppercase" href="#">Roadmap <span class="sr-only">(current)</span></router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>

export default {
	name: "Topnav",
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