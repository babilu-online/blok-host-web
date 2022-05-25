<template>
	<section id="hero">

		<div class="hero-container">
			<div class="card hero-content p-5">
				<div class="card-body p-5">
					<h1>Blok Host</h1>
					<h2><span class="mover">{{word}}</span> Web Hosting</h2>

					<p class="mt-3">Powered by the Solana blockchain & Shadow Drive Layer-2 Storage</p>
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
	min-height: 500px;
	background: rgba(0, 0, 0, 0.8);
}

.hero-content {
	background: rgba(0, 0, 0, 0.8);
	border-radius: 8px;
}

.mover {
	transition: all 0.2s ease-in-out;
}
</style>