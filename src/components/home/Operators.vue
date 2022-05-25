<template>
<section id="operators">
	<h2 class="mt-5 text-center">Become An Operator</h2>

	<div class="row">
		<div class="col-12 col-lg-8 offset-lg-2 text-center">

			<p>Blok operators are essential to the networks health and enables users to earn TIME through hosting sites for others. By running a node you are contributing to the overall
				bandwidth & capacity available within the network.</p>

		</div>
	</div>

	<div class="row text-center">
		<div class="col-12 mb-3">
			Current Version: <i class="fw-bold"><code>v0.0.6</code></i>
		</div>

		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<img src="@/assets/images/icon_windows.png" class="img-fluid dl-logo">
					<h4 class="mt-3">Windows</h4>
					<button class="btn btn-outline-light btn-sm my-3">DOWNLOAD</button>
					<p>SHA: <i><code>0x0</code></i></p>
				</div>
			</div>
		</div>
		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<img src="@/assets/images/icon_linux.png" class="img-fluid dl-logo">
					<h4 class="mt-3">Linux</h4>
					<button class="btn btn-outline-light btn-sm my-3">DOWNLOAD</button>
					<p>SHA: <i><code>0x0</code></i></p>
				</div>
			</div>
		</div>
		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<img src="@/assets/images/icon_apple.png" class="img-fluid dl-logo">
					<h4 class="mt-3">Mac</h4>
					<button class="btn btn-outline-light btn-sm my-3">DOWNLOAD</button>
					<p>SHA: <i><code>0x0</code></i></p>
				</div>
			</div>
		</div>
	</div>

</section>
</template>

<script>
export default {
	name: "Operators"
}
</script>

<style scoped>
.dl-logo {
	max-height: 100px;
}
</style>