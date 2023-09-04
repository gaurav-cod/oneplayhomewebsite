/**
 * 
 * @returns {Promise<object[]>}
 */
function loadSubscriptions() {
    return fetch(config.BASE_API + "/accounts/subscription/available_plans", {
        headers: {
          "content-type": "application/json",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors",
        credentials: "omit",
      })
        .then((res) => res.json())
        .then((data) => data);
}

/**
 * 
 * @param {object} sub 
 */
function getResolution(sub) {
    if (sub['can_run_4k'] == 'true') {
        return 'Up to 4K';
    } else if (sub['can_run_hd'] == 'true') {
        if (sub['package_type'] == 'topup') {
            return 'Up to 1080p';
        } else {
            return 'Up to Full HD Resolution';
        }
    } else {
        return 'Up to 720p';
    }
}

const currencyMap = {
    'inr': '₹'
}

/**
 * 
 * @param {object} sub 
 */
function makeElementFromSubscription(sub) {
    return `
    <div class="col-12 ${sub['package_type'] == 'base' ? 'col-lg-6' : 'col-lg-3'} col-md-6 mt-4 d-flex align-items-stretch">
        <div
            class="card br30 w-100 ${sub['plan_config']?.is_recommended ? 'activeSubCard' : ''}"
        >
            <div class="card-body p-4 subCard">
                <div class="row justify-content-center">
                    <div class="col-11 col-md-12 text-center py-3">
                        <p class="mb-2 font20 font500 offWhiteColor ${sub['plan_config']?.actual_price ? '' : 'invisible'}"><del>${sub['plan_config']?.actual_price}</del></p>
                        <span class="font38 font700 text-white mb-2 align-middle">
                            ${currencyMap[sub['currency']] || sub['currency']}
                        </span>
                        <span class="font38 font700 text-white mb-2 ms-1 align-middle">${sub['value']}</span>
                        <p class="font20 font600 offWhiteColor mb-0">
                            ${sub['package_type'] == 'topup' ? sub['plan_name'] : 'Per Month'}
                        </p>
                        <a href="${config.APP_URL + '/settings/subscription' + '?subscribe=' + sub['id'] + '&plan=' + sub['package_type']}"
                           class="btn text-nowrap removeFocus border-start-0 border-end-0 text-white gradientBtn my-4 my-lg-5 px-4"
                           onclick="subscriptionCardClick('${sub['package_type']}', '${sub['value']}')"
                        >Get Started Now</a>
                        <p class="font20 font500 offWhiteColor mb-0">
                            <span class="align-middle ${sub['package_type'] == 'topup' ? 'd-none' : ''}"
                                >${sub['total_offered_tokens'] / 60 + ' hours/month'}
                            </span>
                            
                            <img src="./assets/subscriptionNew/Warning.svg" 
                                class="img-fluid ${sub['package_type'] == 'topup' ? 'd-none' : ''}"
                                alt="" 
                                data-bs-toggle="tooltip" 
                                title="Your daily playtime is 4 hours. Kindly adhere to this instruction." 
                            />
                            <br class="${sub['package_type'] == 'topup' ? 'd-none' : ''}"/>
                            Validity ${sub['plan_duration_in_days']} Days <br/>
                            ${getResolution(sub)} <br/>
                            ${sub['plan_config']?.is_queue ? 'Queue basis <br/>' : ''}
                            ${!sub['plan_config']?.is_refundable ? 'Non-Refundable <br/>' : ''}
                            ${sub['plan_description']?.replace(/\.\s/g, '<br/>')}
                        </p>
                        <p class="font20 font500 offWhiteColor mb-0">
                            <span class="align-middle"
                                >Play games you own. 
                            </span><img src="./assets/subscriptionNew/Warning.svg" 
                                class="img-fluid"
                                alt="" 
                                data-bs-toggle="tooltip" 
                                title="To play a game, you must have ownership of the game, through the available stores." 
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

loadSubscriptions().then((subscriptions) => {
    const heading1 = document.getElementById('heading1');

    if (subscriptions.length > 0) {
        const pricings = document.querySelectorAll('#pricings');
        pricings.forEach(el => el.removeAttribute('hidden'));
        heading1.innerText = 'Experience the Thrill of High Graphics at Low Prices!';
        subscriptions.forEach(sub => countlyService.updateEventData("websiteSubscriptionView", {
          [`${sub['package_type'] === 'topup' ? 'hourly' : 'monthly'}Card${sub['value']}Clicked`]: 'no',
        }))
    } else {
        const comingSoon = document.getElementById('coming-soon');
        comingSoon?.removeAttribute('hidden');
        heading1.innerText = 'Coming Soon';
    }

    const container = document.getElementById('hourly-subscriptions');
    const container2 = document.getElementById('monthly-subscriptions');
    const hourlySubs = subscriptions.filter(s => s.package_type === 'topup');
    const monthlySubs = subscriptions.filter(s => s.package_type === 'base');
    const child = hourlySubs.map(makeElementFromSubscription).join("");
    const child2 = monthlySubs.map(makeElementFromSubscription).join("");
    container?.insertAdjacentHTML('afterbegin', child);
    container2?.insertAdjacentHTML('afterbegin', child2);
})
