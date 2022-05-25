<template>
	<section id="process">
		<div class="container">
		<div class="col-12 col-lg-8 offset-lg-2 mt-5">
			<div class="text-start">
				<h4>STEP 2.</h4>
				<p>Register your site for hosting.</p>
			</div>

			<div class="col-12 col-lg-8 offset-lg-2 site-info text-center mt-5">
				<div class="bordered p-3">
					<h5>Permalink</h5>
					<a class="fs-5 text-break" :href="url">{{ url }}</a>
				</div>
			</div>

			<HRText class="col-8 offset-2 my-3">OR</HRText>

			<div class="text-center">

				<div class="col-12 col-lg-8 offset-lg-2">
					<div class="bordered p-3 text-center">
						<h5>Custom Domain</h5>


						<form @submit="searchDomain">
							<div class="input-group">
								<input required title="Three or more characters" :readonly="loading" pattern="[0-9A-Za-z]{3,32}" v-model="domainSearch" @keyup="onKeyUp" placeholder="Search URL"
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

				<p class="fw-bold fs-4 mt-5 mb-1">
					<SOL></SOL>
					{{ solCost }} SOL <i>(~${{usdCost}} USD)</i>
				</p>

				<div class="small col-4 offset-4">
					<table class="table table-sm text-white table-borderless">
						<tbody>
						<tr>
							<td class="text-start">Domain</td>
							<td><SOL class="small"></SOL>{{customDomainCost}} SOL</td>
						</tr>
						<tr>
							<td class="text-start">Gas</td>
							<td><SOL class="small"></SOL>{{storeCost}} SOL</td>
						</tr>
						</tbody>
					</table>
				</div>



				<div class="questions small mt-5">
					<p :class="`${termsAgreed ? 'text-blue' : 'text-white'} small mb-1`"><span>I agree that this content is of legal origin & complies with my local laws:</span></p>
					<label class="switch">
						<input type="checkbox" v-model="termsAgreed">
						<span class="slider round noselect"></span>
					</label>
				</div>

				<button :disabled="!termsAgreed" class="btn btn-outline-light btn-lg mt-5 text-white">HOST SITE</button>
			</div>
		</div>
		</div>
	</section>
</template>

<script>

import HRText from "../HRText";
import SOL from "../tokens/SOL";
import axios from 'axios';

export default {
	name: "Process",
	components: {SOL, HRText},
	props: {
		url: {
			type: String,
			default() {
				return `https://af8a6408523463441a997b4f900f7af9.blok.host/`
			}
		}
	},
	data() {
		return {
			domainSearch: '',
			loading: false,
			searchResult: {
				domain: '',
				available: false,
			},
			solPrice: 100,
			storeCost: 0.02,
			termsAgreed: false,
		}
	},
	computed: {
		isDomainAvailable: function () {
			return this.searchResult.available;
		},

		customDomainCost: function() {
			const slen = this.searchResult.domain.length;

			//32 length == free
			//3 in length = 19
			return (((32 - slen)) + 1) / 100
		},

		solCost: function () {
			const domainCost = this.customDomainCost

			return (domainCost + this.storeCost).toFixed(4)
		},
		usdCost: function() {
			return (this.solCost * this.solPrice).toFixed(2)
		}
	},
	methods: {
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
</style>