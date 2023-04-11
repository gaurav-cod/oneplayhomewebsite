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
function makeElementFromSubscription(sub) {
    return `
    <div class="col-lg-12 mt-4">
        <div
            class="card border-top-0 border-start-0 border-end-0 lightBlackBg borderRadius30"
        >
            <div class="card-body p-4">
                <div class="row ps-lg-3 pt-lg-2">
                    <div class="col-lg-4 col-md-6 col-7">
                        <p class="mb-1 font16 font500 offWhiteColor">
                            ${sub['plan_name']} (${sub['package_type'] == 'base' ? 'Monthly' : 'Hourly'})
                        </p>
                        <p class="mb-1 font38 font700 text-white">
                            ₹ ${sub['value']}
                        </p>
                        <p class="mb-1 font16 font500 offWhiteColor">
                            <img
                                src="./assets/subscriptionNew/Alarm.svg"
                                class="img-fluid me-2"
                                alt=""
                            />
                            <span>${sub['total_offered_tokens']} minutes</span>
                        </p>
                    </div>
                    <div
                        class="col-lg-8 col-md-6 col-5 text-end align-self-center"
                    >
                        <span class="d-inline-block">
                            <a
                                href="${config.APP_URL + '?subscribe=' + sub['id']}"
                                class="btn font16 text-white font500 ps-3 pe-3 linearGradient borderRadius10 border-top-0 border-start-0 border-end-0 mt-2"
                                >Buy Now</a
                            >
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

loadSubscriptions().then((subscriptions) => {
    const container = document.getElementById('list-subscriptions');
    const child = subscriptions.map(makeElementFromSubscription).join();
    container?.insertAdjacentHTML('afterbegin', child);
})