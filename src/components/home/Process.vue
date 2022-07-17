<template>
	<section id="process">
		<div class="container">
			<div class="col-12 col-lg-8 offset-lg-2 mt-5">
				<div class="text-start">
					<h4>STEP 2.</h4>
					<p>Register your site for hosting.</p>
				</div>

				<div v-show="false">
					<div class="col-12 col-lg-8 offset-lg-2 site-info text-center mt-5">
						<div class="bordered p-3">
							<h5>Permalink</h5>
							<a class="fs-5 text-break" v-show="url !== ''" :href="url">{{ url }}</a>
							<VueTyper :shuffle="true" :text="randomUrls"></VueTyper>
						</div>
					</div>

					<HRText class="col-8 offset-2 my-3">OR</HRText>

					<div class="text-center">

						<div class="col-12 col-lg-8 offset-lg-2">
							<div class="bordered p-3 text-center">
								<h5>Custom Domain</h5>

								<form @submit="searchDomain">
									<div class="input-group">
										<input required title="Three or more characters" :readonly="loading" pattern="[0-9A-Za-z]{3,32}" v-model="domainSearch" @keyup="onKeyUp"
												placeholder="Search URL"
												class="form-control">
										<button :disabled="loading" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
									</div>
								</form>

								<div v-show="searchResult.domain !== ''">
									<div v-show="!isDomainAvailable" class="alert alert-warning mt-3 p-1">Name not available.</div>
									<div v-show="isDomainAvailable" class="alert alert-success mt-3 p-1"><a :href="`//${domainSearch}.blok.host`">{{ domainSearch }}.blok.host</a> is available!</div>
								</div>

							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-12 text-center">
						<h3 class="text-uppercase">Hosting Cost</h3>

						<p class="fw-bold fs-4 mt-3 mb-0">
							<SOL></SOL>
							{{ solCost }} SOL
						</p>
					</div>
				</div>

				<div class="small col-4 offset-4">
					<table class="table table-sm small text-white table-borderless">
						<tbody>
						<tr>
							<td class="text-start">Domain Registration</td>
							<td>
								<SOL class="small"></SOL>
								{{ customDomainCost }} SOL
							</td>
						</tr>
						<tr>
							<td class="text-start">Storage Cost</td>
							<td>
								<SOL class="small"></SOL>
								{{ customDomainCost }} SOL
							</td>
						</tr>
						<tr>
							<td class="text-start">Gas Fee</td>
							<td>
								<SOL class="small"></SOL>
								{{ storeCost }} SOL
							</td>
						</tr>
						</tbody>
					</table>
				</div>

				<div class="row">
					<div class="col-12 questions small mt-5 text-center">
						<p :class="`${termsAgreed ? 'text-blue' : 'text-white'} small mb-1`"><span>I agree that this content is of legal origin & complies with my local laws:</span></p>
						<label class="switch">
							<input type="checkbox" v-model="termsAgreed">
							<span class="slider round noselect"></span>
						</label>
					</div>

					<div v-if="!siteHosted" class="text-center col-12">
						<button :disabled="!termsAgreed" class="btn btn-outline-light btn-lg mt-5 text-white" @click="onHostSite"> <span :style="loadingState"><i
								class="fa fa-spinner fa-spin"></i></span> {{ loading ? 'HOSTING SITE' : 'HOST SITE' }}
						</button>
					</div>

					<div v-if="siteHosted">
						<div class="col-12 col-lg-8 offset-lg-2 site-info text-center mt-5">
							<div class="bordered p-3">
								<h5 class="mb-3">SITE HOSTED!</h5>
								<a href="https://af8a6408523463441a997b4f900f7af9.blok.host/index.html"><VueTyper :repeat='0' :erase-on-complete="false"
										text="https://af8a6408523463441a997b4f900f7af9.blok.host"></VueTyper></a>


								<div class="mt-3"><a href="#view-site" class="btn btn-outline-light btn-lg">VIEW SITE</a></div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	</section>
</template>

<script>

import HRText from "../HRText";
import SOL from "../tokens/SOL";
import axios from 'axios';
import {VueTyper} from "vue-typer"

export default {
	name: "Process",
	components: {SOL, HRText, VueTyper},
	props: {
		url: {
			type: String,
			default() {
				return ``
			}
		}
	},
	data() {
		return {
			domainSearch: '',
			siteHosted: false,
			loading: false,
			searchResult: {
				domain: '',
				available: false,
			},
			solPrice: 100,
			storeCost: 0.02,
			termsAgreed: false,

			randomUrls: [],

			verbs: ["huge", "cooked", "lemon", "apple", "watermelon", "soaked",
				"adorable",
				"adventurous",
				"aggressive",
				"agreeable",
				"alert",
				"alive",
				"amused",
				"angry",
				"annoyed",
				"annoying",
				"anxious",
				"arrogant",
				"ashamed",
				"attractive",
				"average",
				"awful",
				"bad",
				"beautiful",
				"better",
				"bewildered",
				"black",
				"bloody",
				"blue",
				"blue-eyed",
				"blushing",
				"bored",
				"brainy",
				"brave",
				"breakable",
				"bright",
				"busy",
				"calm",
				"careful",
				"cautious",
				"charming",
				"cheerful",
				"clean",
				"clear",
				"clever",
				"cloudy",
				"clumsy",
				"colorful",
				"comfortable",
				"confused",
				"cooperative",
				"courageous",
				"crazy",
				"creepy",
				"crowded",
				"curious",
				"cute",
				"dark",
				"defiant",
				"delightful",
				"determined",
				"different",
				"difficult",
				"disgusted",
				"distinct",
				"dizzy",
				"doubtful",
				"drab",
				"dull",

			],
			object: ["microwave", "sausage", "dapp", "gremlin", "cat", "dog", "elephant", "frog", "lion", "zebra"],
		}
	},
	computed: {
		isDomainAvailable: function () {
			return this.searchResult.available;
		},

		loadingState: function () {
			if (this.loading) {
				return {display: "inline-block"}
			}

			return {display: "none"}
		},

		customDomainCost: function () {
			const slen = this.searchResult.domain.length;

			//32 length == free
			//3 in length = 19
			return (((32 - slen)) + 1) / 100
		},

		solCost: function () {
			const domainCost = this.customDomainCost

			return (domainCost + this.storeCost).toFixed(4)
		},
		usdCost: function () {
			return (this.solCost * this.solPrice).toFixed(2)
		}
	},
	methods: {

		onHostSite: function () {
			this.loading = true;
			//TODO

			setTimeout(() => {

				this.siteHosted = true;
				this.loading = false;
				this.$emit("site-hosted", "https://af8a6408523463441a997b4f900f7af9.blok.host/index.html")
			}, 2000)

		},

		generateRandomUrl: function () {
			const custom = Math.floor(Math.random() * 2);
			if (custom) {
				const v = this.verbs[Math.floor(Math.random() * this.verbs.length)]
				const o = this.object[Math.floor(Math.random() * this.object.length)]

				// return "https://{YOUR_SITE_HERE}.blok.host/"
				return `https://${v}-${o}.blok.host`
			}

			let result = '';
			const length = Math.floor(Math.random() * 13) + 3;
			const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
			const charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() *
						charactersLength));
			}

			return `https://${result}.blok.host`
		},

		onKeyUp() {
			if (this.domainSearch.length > 3)
				this.searchDomain()
		},
		searchDomain(e) {
			e.preventDefault()
			//TODO Search
			this.loading = true;
			const domain = this.domainSearch;

			setTimeout(() => {
				this.searchResult.domain = domain;
				this.searchResult.available = true;

				this.loading = false
			}, 300)
		},

		getSolPrice() {
			return axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
		}
	},

	beforeMount() {
		for (let i = 0; i < 20; i++) {
			this.randomUrls.push(this.generateRandomUrl())
		}
	},

	mounted() {
		this.getSolPrice().then(resp => {
			this.solPrice = resp.data.solana.usd;
		})
	}
}
</script>

<style scoped>
.bordered {
	border: 1px solid white;
	border-radius: 9px;
}

.btn-outline-primary:not(:disabled) {
	box-shadow: 0 0 30px rgb(10 159 185);
}

i.small {
	font-size: 0.7em;
	line-height: 0.7em;
	color: grey;
}
</style>