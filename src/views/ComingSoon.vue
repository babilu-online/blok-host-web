<template>
	<div class="container">
		<div class="row">
			<div class="col-8 offset-2 mt-5">
				<div class="card">
					<div class="card-body">
						<h1 class="my-5">Coming soon</h1>

						<div class="p-4">

							<div class="row">
								<div class="col-6">
									<h4 class="mb-4">Upcoming:</h4>
									<ul>
										<li>Geo & Edge Caching</li>
										<li>GitHub Actions</li>
										<li>CI/CD Support</li>
										<li>Custom Domains & Bonafida Support</li>
										<li>Site Analytics</li>
									</ul>
								</div>
								<div class="col-6">
									<h4 class="mb-4">&nbsp;</h4>
									<ul>
										<li>Token Launch</li>
										<li>Open Source Nodes</li>
										<li>DAO Handover</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ComingSoon"
}
</script>

<style scoped>
li {
	list-style: none;
	border: 2px solid rgba(212, 20, 90, 1);
	font-family: monospace;
	font-weight: bold;
	border-radius: 7px;
	padding: 2%;
	margin: 2% 0 2% 0;
}

ul :nth-child(odd) {
	border-color: rgba(251, 176, 59, 1);
}

</style>