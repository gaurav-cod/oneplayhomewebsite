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
        return '4K';
    } else if (sub['can_run_hd'] == 'true') {
        return '1080p';
    } else {
        return '720p';
    }
}

const currencyMap = {
    'inr': '₹'
}

/**
 * 
 * @param {object} sub 
 */
function makeElementFromSubscription(sub, all_offer_flag = false) {
    let individual_offer_available_flag = false;
    let offer_available = 0;
    if(sub['plan_config']?.actual_price > 0)
    {
        offer_available = parseInt(sub['plan_config']?.actual_price - sub['value']);
    }

    if(offer_available > 0)
    {
        individual_offer_available_flag = true;
    }
    if(all_offer_flag)
    {
        individual_offer_available_flag = false;
    }

    return ` 
        <div class="col d-md-none">
            <span class="data-span" data-hrs-per-day="${sub['gameplay_limit_hrs_per_day']}" ></span>
            <div class="row justify-content-center">
                <div class="col-auto p-0">
                    <div class="w100">
                        <img src="./assets/subscriptionNew/offer.svg" class="img-fluid ${individual_offer_available_flag ? '' : 'invisible'}" alt="" />  
                    </div>
                </div>
            </div>
            ${sub['plan_config']?.is_recommended ? 
                `<div class="row justify-content-center position-relative">
                    <div class="col-auto position-absolute marginTop-20 text-center p-0">
                        <lottie-player src="./js/lottieAnimation/subscription/Recommended.json" background="transparent"  speed="1" class="width100" style="height: auto;" loop autoplay></lottie-player>
                        <button class="btn recommendedBg text-white btn-sm customBorder0 font12 marginTop-67 px-md-4 px-2">Recommended</button>
                    </div>
                </div>`
            : ''}
            <div class="row justify-content-center">
                <div class="col-auto text-center p-0">
                    <div class="brTop20 w100 ${sub['plan_name'] == 'Foundation' ? 'foundationSubCard' : 'enhancedGradient' && sub['plan_name'] == 'Ultimate' ? 'unlimitedSubCard' : 'enhancedGradient'} py-3 px-2 ${sub['plan_config']?.is_recommended ? 'recommendSubCard' : ''}">
                        <p class="font24 font500 mb-2 ${sub['plan_name'] == 'Foundation' ? 'fountGradientText' : 'orangeGradientText' && sub['plan_name'] == 'Ultimate' ? 'unlimitedGradientText' : 'orangeGradientText'}">${sub['plan_name']}</p> 
                        <p class="mutedColor my-2 ${sub['plan_config']?.actual_price == sub['value'] ? 'invisible' : ''} ${sub['plan_config'].actual_price ? '' : 'invisible'}"><del>${currencyMap[sub['currency']] || sub['currency']}${sub['plan_config']?.actual_price}</del></p>
                        <p class="font38 font700 text-white mb-3">${currencyMap[sub['currency']] || sub['currency']}${sub['value']}</p> 
                        <div class="d-grid">
                            <a href="${config.APP_URL + '/checkout/' + sub['id']}" onclick="subscriptionCardClick('${sub['plan_name']}', '${sub['value']}')" class="btn disabledBtnGradient customBorder0 borderRadius60 text-white hoverGradient">Select</a>
                        </div>
                    </div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}"><p class="mb-0 text-white text-truncate">${getResolution(sub)}</p></div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}"><p class="mb-0 text-white">${sub['plan_duration_in_days']}</p></div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}"><p class="mb-0 text-white">${sub['plan_config']?.is_unlimited ? '<img src="./assets/subscriptionNew/Unlimited.svg" width="28px" class="img-fluid" alt="" /><span class="unlimited-star">*</span>' : `${sub['total_offered_tokens'] / 60}`}</p></div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                        <p class="mb-0 text-white">
                            ${sub['plan_config']?.is_queue ? '<img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" />' : '<img src="./assets/subscriptionNew/Cross.svg" width="20px" class="img-fluid" alt="" />'}
                        </p>
                    </div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                        <p class="mb-0 text-white"><img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" /></p>
                    </div>
                    <div class="height40"></div>
                    <div class="w100 p-2 height45 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                        <p class="mb-0 text-white">${!sub['plan_config']?.is_refundable ? '<img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" />' : '<img src="./assets/subscriptionNew/Cross.svg" width="20px" class="img-fluid" alt="" />'}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col p-0 text-center font20 font500 d-none d-md-block">
            <div class="row justify-content-center">
                <div class="col-12 p-0">
                    <div class="w218">
                        <img src="./assets/subscriptionNew/offer.svg" class="img-fluid ${individual_offer_available_flag ? '' : 'invisible'}" alt="" /> 
                    </div>
                </div>
                <div class="col-auto brTop30 ${sub['plan_name'] == 'Foundation' ? 'foundationSubCard' : '' && sub['plan_name'] == 'Ultimate' ? 'unlimitedSubCard' : 'enhancedGradient'} py-3 px-md-3 px-2 w218 ${sub['plan_config']?.is_recommended ? 'recommendSubCard' : ''}">
                    ${sub['plan_config']?.is_recommended ? 
                        `<div class="row justify-content-center position-relative">
                            <div class="col-auto position-absolute marginTop-20">
                            <lottie-player src="./js/lottieAnimation/subscription/Recommended.json" background="transparent"  speed="1"  style="width: auto; height: auto;" loop autoplay></lottie-player>
                            <button class="btn recommendedBg text-white btn-sm customBorder0 marginTop-67 px-lg-4 px-2">Recommended</button>
                            </div>
                        </div>`
                    : ''}
                    <p class="font24 font500 mb-2 ${sub['plan_name'] == 'Foundation' ? 'fountGradientText' : 'orangeGradientText' && sub['plan_name'] == 'Ultimate' ? 'unlimitedGradientText' : 'orangeGradientText'}">${sub['plan_name']}</p> 
                    <p class="mutedColor my-2 ${sub['plan_config']?.actual_price == sub['value'] ? 'invisible' : ''} ${sub['plan_config'].actual_price ? '' : 'invisible'}"><del>${currencyMap[sub['currency']] || sub['currency']}${sub['plan_config']?.actual_price}</del></p>
                    <p class="font38 font700 text-white">${currencyMap[sub['currency']] || sub['currency']}${sub['value']}</p> 
                    <div class="d-grid">
                        <a href="${config.APP_URL + '/checkout/' + sub['id']}" onclick="subscriptionCardClick('${sub['plan_name']}', '${sub['value']}')" class="btn disabledBtnGradient customBorder0 borderRadius10 text-white hoverGradient">Select</a>
                    </div>
                </div>
            </div>
            <div class="row lightBlackBg justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 text-white py-3 px-md-3 px-2 lightBlackBg text-truncate">${getResolution(sub)}</p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 mutedColor py-3 px-md-3 px-2 ">${sub['plan_duration_in_days']} Days </p>
                </div>
            </div>
            <div class="row lightBlackBg justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 mutedColor py-3 px-md-3 px-2 lightBlackBg">
                        ${sub['plan_config']?.is_unlimited ? 'Unlimited<span class="unlimited-star">*</span>' : `${sub['total_offered_tokens'] / 60}`}
                    </p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 mutedColor py-3 px-md-3 px-2 ">
                        ${sub['plan_config']?.is_queue ? '<img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" />' : '<img src="./assets/subscriptionNew/Cross.svg" width="20px" class="img-fluid" alt="" />'}
                    </p>
                </div>
            </div>
            <div class="row lightBlackBg justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 text-white py-3 px-md-3 px-2 lightBlackBg">
                        ${sub['plan_config']?.play_games_you_own ? '<img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" />' : '<img src="./assets/subscriptionNew/Cross.svg" width="20px" class="img-fluid" alt="" />'}
                    </p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-auto p-0 w218 ${sub['plan_config']?.is_recommended ? 'recommendBorder' : ''}">
                    <p class="mb-0 mutedColor py-3 px-md-3 px-2 ">
                        ${sub['plan_config']?.is_refundable ? '<img src="./assets/subscriptionNew/Tick.svg" width="20px" class="img-fluid" alt="" />' : '<img src="./assets/subscriptionNew/Cross.svg" width="20px" class="img-fluid" alt="" />'}
                    </p>
                </div>
            </div>
            
        </div>
        <div class="position-absolute justify-content-center text-center">
            <img src="./assets/subscriptionNew/offer-for-all.svg" class="${all_offer_flag ? '' : 'invisible'} img-fluid" alt="" />
        </div>
    `
}

loadSubscriptions().then((allSubscriptions) => {
    const heading1 = document.getElementById('heading1');
    const subscriptions = allSubscriptions
        .filter(sub => sub?.partner_id === config.PARTNER_ID || !sub?.partner_id);

    if (subscriptions.length > 0) {
        const pricings = document.querySelectorAll('#pricings');
        pricings.forEach(el => el.removeAttribute('hidden'));
        heading1.innerText = 'Experience the Thrill of High Graphics at Low Prices!';
        subscriptions.forEach(sub => countlyService.updateEventData("websiteSubscriptionView", {
          [`${sub['plan_name'].replace(/\s/g, '')}${sub['value']}Clicked`]: 'no',
        }))
    } else {
        const comingSoon = document.getElementById('coming-soon');
        comingSoon?.removeAttribute('hidden');
        heading1.innerText = 'Coming Soon';
    }

    const container1 = document.getElementById('plan1Hour');
    const container3 = document.getElementById('plan3Hour');
    const container5 = document.getElementById('plan5Hour');
    const container10 = document.getElementById('plan10Hour');
    const container20 = document.getElementById('plan20Hour');
    const containerUnlimited = document.getElementById('UnlimitedHours-plan');
    const hourlyPlan1 = subscriptions.filter(s => s?.total_offered_tokens <= 60);
    const hourlyPlan3 = subscriptions.filter(s => s?.total_offered_tokens > 60 && s?.total_offered_tokens <=180);
    const hourlyPlan5 = subscriptions.filter(s => s?.total_offered_tokens > 180 && s?.total_offered_tokens <= 300);
    const hourlyPlan10 = subscriptions.filter(s => s?.total_offered_tokens > 300 && s?.total_offered_tokens <= 600);
    const hourlyPlan20 = subscriptions.filter(s => s?.total_offered_tokens > 600 && s?.total_offered_tokens <= 1200);
    const hourlyPlanUnlimited = subscriptions.filter(s => s?.total_offered_tokens > 1200 || s.plan_config?.is_unlimited == true);

    let hourlyPlan1_flag = false;
    document.getElementById('discountGif1hrs').hidden = true;
    document.getElementById('discountGif3hrs').hidden = true;
    document.getElementById('discountGif5hrs').hidden = true;
    document.getElementById('discountGif10hrs').hidden = true;
    document.getElementById('discountGif20hrs').hidden = true;
    document.getElementById('discountGifunlimited').hidden = true;

    if(Object.keys(hourlyPlan1).length == Object.keys(hourlyPlan1.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlan1_flag = true;
    }
    if(Object.keys(hourlyPlan1.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGif1hrs').hidden = false;
    }
    const child1 = hourlyPlan1.map(function(x) { return makeElementFromSubscription(x, hourlyPlan1_flag);}).join("");

    let hourlyPlan3_flag = false;
    if(Object.keys(hourlyPlan3).length == Object.keys(hourlyPlan3.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlan3_flag = true;
    }
    if(Object.keys(hourlyPlan3.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGif3hrs').hidden = false;
    }

    const child3 = hourlyPlan3.map(function(x) { return makeElementFromSubscription(x, hourlyPlan3_flag);}).join("");

    let hourlyPlan5_flag = false;
    if(Object.keys(hourlyPlan5).length == Object.keys(hourlyPlan5.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlan5_flag = true;
    }
    if(Object.keys(hourlyPlan5.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGif5hrs').hidden = false;
    }
    const child5 = hourlyPlan5.map(function(x) { return makeElementFromSubscription(x, hourlyPlan5_flag);}).join("");

    let hourlyPlan10_flag = false;
    if(Object.keys(hourlyPlan10).length == Object.keys(hourlyPlan10.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlan10_flag = true;
    }
    if(Object.keys(hourlyPlan10.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGif10hrs').hidden = false;
    }
    const child10 = hourlyPlan10.map(function(x) { return makeElementFromSubscription(x, hourlyPlan10_flag);}).join("");

    let hourlyPlan20_flag = false;
    if(Object.keys(hourlyPlan20).length == Object.keys(hourlyPlan20.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlan20_flag = true;
    }
    if(Object.keys(hourlyPlan20.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGif20hrs').hidden = false;
    }
    const child20 = hourlyPlan20.map(function(x) { return makeElementFromSubscription(x, hourlyPlan20_flag);}).join("");

    let hourlyPlanUnlimited_flag = false;
    if(Object.keys(hourlyPlanUnlimited).length == Object.keys(hourlyPlanUnlimited.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length)
    {
        hourlyPlanUnlimited_flag = true;
    }
    if(Object.keys(hourlyPlanUnlimited.filter(s => s?.plan_config?.actual_price > 0 && s?.plan_config?.actual_price != s?.value)).length > 0)
    {
        document.getElementById('discountGifunlimited').hidden = false;
    }
    const childUnlimited = hourlyPlanUnlimited.map(function(x) { return makeElementFromSubscription(x, hourlyPlanUnlimited_flag);}).join("");

    container1?.insertAdjacentHTML('afterbegin', child1);
    container3?.insertAdjacentHTML('afterbegin', child3);
    container5?.insertAdjacentHTML('afterbegin', child5);
    container10?.insertAdjacentHTML('afterbegin', child10);
    container20?.insertAdjacentHTML('afterbegin', child20);
    containerUnlimited?.insertAdjacentHTML('afterbegin', childUnlimited);

    document.querySelector('#hoursPerDay').innerText = hourlyPlan1[0]?.gameplay_limit_hrs_per_day;
})
