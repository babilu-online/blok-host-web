<template>
	<section id="hero">

		<div class="hero-container mb-5">
			<div class="card hero-content p-lg-5">
				<div class="card-body p-5">
					<h1>Blok Host</h1>
					<h2><span class="mover">{{word}}</span> Web Hosting</h2>

					<p class="mt-3">Powered by the Solana blockchain & Shadow Drive Layer-2 Storage</p>


					<div class="col-12 col-lg-8 offset-lg-2 mt-5">
						<h3 class="text-uppercase text-center my-5">as easy as 1,2,3!</h3>
						<div class="row">
							<div class="col-4 text-center">
								<h4>1. Upload Site</h4>
								<p class="small">Upload your sites files to the shadow drive</p>
								<img alt="" src="@/assets/images/icon_windows.png" class="img-thumbnail w-75">
							</div>

							<div class="col-4 text-center">
								<h4>2. Register Domain</h4>
								<p class="small">Register a predictable domain hash or custom subdomain</p>
								<img alt="" src="@/assets/images/icon_windows.png" class="img-thumbnail w-75">
							</div>

							<div class="col-4 text-center">
								<h4>3. View Site</h4>
								<p class="small">Your site is now available for eternity!</p>
								<img alt="" src="@/assets/images/icon_windows.png" class="img-thumbnail w-75">
							</div>

						</div>
					</div>
				</div>
			</div>

		</div>


	</section>
</template>

<script>
export default {
	name: "Hero",
	data() {
		return {
			interval: null,
			words: ["Democratised", "Decentralised", "Community Governed", "High Performance", "Low Latency"],
			word: "Democratised"
		}
	},
	methods: {
		getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}
	},
	mounted() {
		this.interval = setInterval(() => {
			this.word = this.words[this.getRandomInt(this.words.length - 1)]
		}, 10000)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	}
}
</script>

<style scoped>
.hero-container {
	background: rgba(0, 0, 0, 0.8);
}

.hero-content {
	min-height: 700px;
	background: rgba(0, 0, 0, 0.8);
	border-radius: 8px;
}

.mover {
	transition: all 0.2s ease-in-out;
}

.img-thumbnail {
	background: rgba(0,0,0,0.8);
}
</style>