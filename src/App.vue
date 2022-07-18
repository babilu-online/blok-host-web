<template>
	<div id="app">
		<Topnav class="mb-3"></Topnav>
		<div class="view">
			<div class="container mb-3" v-show="$store.state.wallet_connected">
				<div class="row text-black">
					<div class="col-auto">
						<router-link to="/dashboard" class="sub-heading p-2">Overview</router-link>
					</div>
					<div class="col-auto">
						<router-link to="/sites" class="sub-heading p-2">Sites</router-link>
					</div>
					<div class="col-auto">
						<router-link to="/drives" class="sub-heading p-2">Drives</router-link>
					</div>
					<div class="col-auto">
						<router-link to="/coming-soon" class="sub-heading coming-soon p-2">Domains</router-link>
					</div>
					<div class="col-auto">
						<router-link to="/coming-soon" class="sub-heading coming-soon p-2">Deployments</router-link>
					</div>
				</div>
			</div>
			<router-view class="container-fluid"></router-view>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>

import Footer from "./components/Footer";
import Topnav from "./components/Topnav";

export default {
	name: 'App',
	components: {
		Topnav, Footer
	},
	mounted() {
	}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap');


.inner-view {
	margin-left: 60px;
	width: 98%;
}

.sub-heading {
	color: rgba(0, 0, 0, 0.6);
	font-weight: bold;
	text-decoration: none;
	transition: all 0.3s ease-in-out;
}

.sub-heading.coming-soon {
	color: rgba(0, 0, 0, 0.2);
}

.sub-heading:hover {
	color: rgba(0, 0, 0, 1);
	font-weight: bold;
	text-decoration: underline;
}

.sub-heading.coming-soon:hover {
	color: rgba(0, 0, 0, 0.4);
}
</style>
