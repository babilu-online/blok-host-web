<template>
	<div id="app">
		<Topnav class="mb-3"></Topnav>
		<router-view class="container-fluid"></router-view>
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
</style>
