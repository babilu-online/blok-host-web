<template>
	<section id="view-site">
		<div class="container">

			<div class="col-12">
				<h4>STEP 4.</h4>

				<div class="text-center">
					<h1>Site Hosted!</h1>

					<p>View your site online</p>

					<div class="mt-5">
						<div class="link-outer">
							<div class="link-inner">
								<a :href="siteUri" target="_blank" class="link">
									<VueTyper :repeat='0' :erase-on-complete="false"
											:text="siteUri"></VueTyper>
								</a>
							</div>
						</div>
					</div>

					<div class="mt-5">
						<a target="_blank" :href="siteUri" class="btn btn-primary py-3 px-5 fw-bold">VIEW SITE</a>
						<router-link :to="`/sites/${drive}`" class="btn btn-outline-primary py-3 px-5 fw-bold ms-3">DASHBOARD</router-link>
					</div>

				</div>

			</div>
		</div>
	</section>
</template>

<script>
import {VueTyper} from "vue-typer"

export default {
	name: "ViewSite",
	components: {VueTyper},
	props: {
		drive: {
			type: String,
			required: true,
		},
		siteUri: {
			type: String,
			default() {
				// return `https://af8a6408523463441a997b4f900f7af9.blok.host/`
				return ``
			}
		},
		loading: {
			type: Boolean,
			default() {
				return false
			}
		}
	},
	computed: {
		containerStyle: function () {
			if (this.siteUri === '')
				return {height: "200px"}

			return {height: "600px"}
		}
	}
}
</script>

<style scoped>

.site-container {
	transition: all 0.6ms ease-in-out;
	/*height: 400px;*/
}

iframe {
	width: 100%;
	height: 100%;
}

.site-placeholder {
	border: 2px solid white;
	border-radius: 9px;
	height: 100%;
	position: relative;
}

.site-placeholder div {
	position: absolute;
	text-transform: uppercase;
	top: 25%;
	width: 100%;
}

.site-placeholder {
	max-height: 150px;
}

.link {
	font-size: 2.5em;
	width: 100%;
	border-radius: 7px;
	background: transparent;
}

.link-inner {
	background: white;
	border-radius: 5px;
	padding: 2%;
}

.link-outer {
	background: linear-gradient(90deg, rgba(251, 176, 59, 1) 0%, rgba(212, 20, 90, 1) 100%);
	background-size: 400% 400%;
	animation: gradient 3s ease infinite;
	padding: 5px;
	border-radius: 9px;
}

</style>