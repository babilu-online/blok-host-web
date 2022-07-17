<template>
	<div class="login">
		<h1>Login to continue</h1>
		<div class="my-5 text-center">
			<Phantom class="btn btn-primary py-3 px-5 btn-block btn-sm wow fadeIn"></Phantom>
		</div>
		<div class="my-5 small">
			<i class="text-grey">*By creating a site you agree to blok.host's terms & conditions.</i>
		</div>
	</div>
</template>

<script>
import Phantom from "../Phantom";

export default {
	name: "Login",
	components: {Phantom}
}
</script>

<style scoped>
.text-grey {
	color: lightgray;
}
</style>