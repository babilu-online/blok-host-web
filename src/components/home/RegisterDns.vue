<template>
	<section id="dns">
		<div class="col-12 col-lg-8 offset-lg-2 my-5">
			<div class="text-start">
				<h4>STEP 4. <sup class="fs-xs">(optional)</sup></h4>
				<p>Register existing DNS to point to your site.</p>
			</div>
		</div>

		<div class="row">
			<div class="col-12 col-lg-4 offset-lg-2">
				<div class="dns-example card h-100">
					<div class="card-body pt-4">
						<p>Record Type: <code>CNAME</code></p>
						<p>Name: <code>{{ `www.example.com` }}</code></p>
						<p>Value: <code>{{ `af8a6408523463441a997b4f900f7af9.blok.host` }}</code></p>
						<p>TTL: <code>3600</code></p>
					</div>
				</div>
			</div>

			<div class="col-12 col-lg-6 mt-5 mt-lg-0 text-center">

				<h5><i class="fa fa-cloud"></i> <code>{{ `www.example.com` }}</code></h5>

				<p><i class="fa fa-down-long"></i></p>

				<h5><i class="fa fa-bridge"></i> <code>{{ `af8a6408523463441a997b4f900f7af9.blok.host` }}</code></h5>

				<p><i class="fa fa-down-long"></i></p>

				<h5><i class="fa fa-chain"></i> <code>{{ `Shadow Drive & Solana` }}</code></h5>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "RegisterDns"
}
</script>

<style scoped>
sup {
	top: -1.6em;
}

.fs-xs {
	font-size: 0.4em;
}

.dns-example {
	text-align: left;
}

.dns-example p {
	margin-bottom: 0;
}
</style>