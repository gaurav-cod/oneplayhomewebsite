
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
        return '<span class="font8">Upto</span> 4K';
    } else if (sub['can_run_hd'] == 'true') {
        return '<span class="font8">Upto</span> 1080p';
    } else {
        return '720p';
    }
}

const currencyMap = {
        "INR": "₹",
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

   
}

loadSubscriptions().then((allSubscriptions) => {
   
    const subscriptions = allSubscriptions
        .filter(sub => sub?.partner_id === config.PARTNER_ID || !sub?.partner_id);
        const heading1 = document.getElementById('heading1');
        
        if (subscriptions.length > 0) {
            const pricings = document.querySelectorAll('#pricings');
        const emptySection = document.querySelector('#emptySection');
        emptySection.setAttribute('hidden', true);
        pricings.forEach(el => el.removeAttribute('hidden'));
            heading1.innerText = 'Experience the Thrill of High Graphics at Low Prices!';
        } else {
            const comingSoon = document.getElementById('coming-soon');
            comingSoon?.removeAttribute('hidden');
            heading1.innerText = 'Coming Soon';
        }


  let tabs = [];

let seen = {};
let label_margin_trial=0;
let label_margin_monthly=0;
let countMonthly=0;
let countTrial=0;
let trial_less_than_two=true;
let monthly_less_than_two=true;
let maxAllowed=2;
subscriptions.forEach(sub=>{
    let currentItem = sub?.tab_label;
    if (!seen[currentItem]) {
        tabs.push(currentItem);
        seen[currentItem] = true;
    }
    if(sub?.tab_label === 'Trial'){
        
        if(countTrial<maxAllowed){
            label_margin_trial+=300;
        }
        else{
            trial_less_than_two = false;
        }
        countTrial++;
    }
    if(sub?.tab_label === 'Monthly'){
       if(countMonthly<maxAllowed){
       label_margin_monthly+=300;
       }
       else{
       monthly_less_than_two=false;
       }
       countMonthly++;
    }
   
})


  const isActive='Monthly';
 const tabContainer = document.getElementById('tabContainer');

tabs.forEach(tab => {
    const swiperSlide = document.createElement('div');
    swiperSlide.style.display='flex';
    swiperSlide.style.justifyContent='center';
    swiperSlide.style.alignItems='center';
    swiperSlide.innerHTML = `
        <a href="#${tab.toLowerCase()}" class="btn fontCustom tab ${tab === isActive ? 'activeTab' : 'disabledTab'}" id="${tab.toLowerCase()}" onclick="switchTab('${tab.toLowerCase()}')">${tab}</a>
    `;
    tabContainer.appendChild(swiperSlide);
});

if(trial_less_than_two){
    const mainContainer=document.getElementById('main-trial');
mainContainer.innerHTML=
`
<div class="swiper-container position-relative">
        <div id="labels" class="position-absolute">
          <div class="row">
            <div class="col label-container-tab">
              <span class="discount text-sold-out hidden">Hidden</span>
              <span class="price text-sold-out hidden">Hidden</span>
              <span class="plan-name text-sold-out hidden">Hidden</span>
              <div class="img-container">
                <button class="btn grey-btn sub-btn text-white margin-trial hidden">Know More</button>
              <span class="margin10 label-content fontCustom">Validity</span>
              <span class="margin10 label-content fontCustom">Resolution</span>
              <span class="margin10 label-content fontCustom">Gaming Hours</span>
              </div>
              <div class="img-container">
              <span class="margin10 label-content fontCustom">Queue Basis</span>
              <span class="margin10 label-content fontCustom">Play Games you Own*</span>
              <span class="margin10 label-content fontCustom">Refundable</span>
            </div>
            </div>
         </div>
        </div>
        <div class="swiper" id="sub-swiper-trial">
          <div class="swiper-wrapper" id="swiper-wrapper-trial">     
            </div>  
             </div>
          <div class="swiper-pagination"></div>
        </div>
`
document.getElementById('labels').style.right = label_margin_trial + 'px';
}
else{
    const mainContainer=document.getElementById('main-trial');
    mainContainer.innerHTML=
    `
            <div id="labels">
              <div class="row">
                <div class="col label-container-tab">
                  <span class="discount text-sold-out hidden">Hidden</span>
                  <span class="price text-sold-out hidden">Hidden</span>
                  <span class="plan-name text-sold-out hidden">Hidden</span>
                  <div class="img-container">
                    <button class="btn grey-btn sub-btn text-white margin-trial hidden">Know More</button>
                  <span class="margin10 label-content fontCustom">Validity</span>
                  <span class="margin10 label-content fontCustom">Resolution</span>
                  <span class="margin10 label-content fontCustom">Gaming Hours</span>
                  </div>
                  <div class="img-container">
                  <span class="margin10 label-content fontCustom">Queue Basis</span>
                  <span class="margin10 label-content fontCustom">Play Games you Own*</span>
                  <span class="margin10 label-content fontCustom">Refundable</span>
                </div>
                </div>
             </div>
            </div>
            <div class="swiper" id="sub-swiper-trial">
              <div class="swiper-wrapper" id="swiper-wrapper-trial">     
                </div>  
                 </div>
              <div class="swiper-pagination"></div>
    `   
}
if(monthly_less_than_two){
const mainContainer=document.getElementById('main');
mainContainer.innerHTML=
`
<div id="swiper-container-monthly" class="position-relative">
          <div id="labels-monthly" class="position-absolute">
        <div class="row">
          <div class="col label-container">
            <span class="discount text-sold-out hidden">Hidden</span>
                        <span class="price text-sold-out hidden">Hidden</span>
                        <span class="plan-name text-sold-out hidden">Hidden</span>
                        <div class="img-container">
                            
                        
                          <button class="btn grey-btn sub-btn text-white hidden">Know More</button>
            <span class="margin10 label-content fontCustom">Validity</span>
            <span class="margin10 label-content fontCustom">Resolution</span>
            <span class="margin10 label-content fontCustom">Daily Gameplay Limit</span>
            <span class="margin10 label-content fontCustom">Gaming Hours</span>
            </div>
            <div class="img-container">
            <span class="margin10 label-content fontCustom">Queue Basis</span>
            <span class="margin10 label-content fontCustom">RTX Enabled</span>
            <span class="margin10 label-content fontCustom">Play Games you Own*</span>
            <span class="margin10 label-content fontCustom">Refundable</span>
            </div>
          </div>
       </div>
      </div>
        <div class="swiper" id="sub-swiper">
          <div class="swiper-wrapper" id="swiper-wrapper-monthly">
            
             </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
`


document.getElementById('labels-monthly').style.right = label_margin_monthly + 'px';
}
else{
    const mainContainer=document.getElementById('main');
    mainContainer.innerHTML=
    `
              <div id="labels-monthly">
            <div class="row">
              <div class="col label-container">
                <span class="discount text-sold-out hidden">Hidden</span>
                            <span class="price text-sold-out hidden">Hidden</span>
                            <span class="plan-name text-sold-out hidden">Hidden</span>
                            <div class="img-container">
                                
                            
                              <button class="btn grey-btn sub-btn text-white hidden">Know More</button>
                <span class="margin10 label-content fontCustom">Validity</span>
                <span class="margin10 label-content fontCustom">Resolution</span>
                <span class="margin10 label-content fontCustom">Daily Gameplay Limit</span>
                <span class="margin10 label-content fontCustom">Gaming Hours</span>
                </div>
                <div class="img-container">
                <span class="margin10 label-content fontCustom">Queue Basis</span>
                <span class="margin10 label-content fontCustom">RTX Enabled</span>
                <span class="margin10 label-content fontCustom">Play Games you Own*</span>
                <span class="margin10 label-content fontCustom">Refundable</span>
                </div>
              </div>
           </div>
          </div>
            <div class="swiper" id="sub-swiper">
              <div class="swiper-wrapper" id="swiper-wrapper-monthly">
                
                 </div>
              </div>
              <div class="swiper-pagination"></div>
    `
    
      
}
      
    const subCard=document.getElementById('swiper-wrapper-monthly');
    const subCardTrial=document.getElementById('swiper-wrapper-trial');
    countMonthly=-1;
    countTrial=-1;
    let firstRecommendMonthly=false;
    let firstRecommendTrial=false;
    let firstRecommendTrialIndex=0;
    let firstRecommendMonthlyIndex=0;
    subscriptions.forEach(sub=>{
       
        if (sub?.tab_label === 'Monthly') {
            ++countMonthly;
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.classList.add('swiper-slide-monthly');
            if(sub['plan_config']?.is_recommended && !sub['plan_config']?.is_sold_out){
            swiperSlide.classList.add('recommendedBorder');
            if(!firstRecommendMonthly){
                firstRecommendMonthly=true;
                firstRecommendMonthlyIndex=countMonthly;
            }
            }
            swiperSlide.innerHTML = `
            
                    ${(sub['plan_config']?.is_recommended && !sub['plan_config']?.is_sold_out) ? 
                        `<div class="row justify-content-center position-relative">
                            <div class="col-auto position-absolute marginTop-20">
                            <lottie-player src="./js/lottieAnimation/subscription/Recommended.json" background="transparent"  speed="1"  style="width: auto; height: auto;" loop autoplay></lottie-player>
                            <button class="btn recommendedBg text-white btn-sm customBorder0 marginTop-67 px-lg-4 px-2">Recommended</button>
                            </div>
                        </div>`
                    : ''}
                    ${sub['plan_config']?.is_sold_out ? 
                `<div class="row justify-content-center position-relative">
                    <div class="col-auto position-absolute marginTopSoldOut">
                        <div class="btn disabledBtnGradient btn-sm customBorder0 marginTop-5 px-lg-1 py-lg-0 px-1 sold-out">SOLD OUT</div>
                    </div>
                </div>`
            : ''}
            <div class="row"
                    <div class="col sub-container ">
            ${sub['plan_config']?.is_sold_out ? 
                        `<span class="discount text-sold-out">${currencyMap[sub['currency']] || sub['currency']} ${sub['plan_config']?.actual_price}</span>
                        <span class="price text-sold-out">${currencyMap[sub['currency']] || sub['currency']} ${sub?.value}</span>
                        <span class="plan-name text-sold-out">${sub.plan_name}</span>
                        <div class="img-container">
                            
                        
                            <button class="btn grey-btn sub-btn text-white " onclick="openPopup('${sub['id']}')">Know More</button>
                            <span class="mobile-tag">Validity</span>
                            <span class="margin10 text-sold-out font500">${sub.plan_duration_in_days} Days</span>
                            <span class="mobile-tag">Resolution</span>
                            <span class="margin10 text-sold-out font500">${getResolution(sub)}</span>
                            <span class="mobile-tag">Daily Gaming Limit</span>
                            <span class="margin10 text-sold-out font500">${sub.gameplay_limit_hrs_per_day} hrs</span>
                            <span class="mobile-tag">Gaming Hours</span>
                            <span class="margin10 text-sold-out font500">${sub['total_offered_tokens'] / 60} hrs</span>
                        </div>
                        <div class="img-container">
                            <span class="mobile-tag">Queue Basis</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.is_queue ? '<img class="cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
                            </div>
                            <span class="mobile-tag">RTX Enabled</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.has_rtx_enabled ? '<img class="cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
                            </div>
                            <span class="mobile-tag">Play games you own*</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.play_games_you_own ? '<img class="cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
                            </div>
                            <span class="mobile-tag">Refundable</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.is_refundable ? '<img class="cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
                        </div>
                            </div>`:
                        `<span class="discount fontCustom">${currencyMap[sub['currency']] || sub['currency']} ${sub['plan_config']?.actual_price}</span>
                        <span class="price text-white">${currencyMap[sub['currency']] || sub['currency']} ${sub?.value}</span>
                        <span class="plan-name ${sub['plan_name'] == 'Foundation' ? 'blue-gradient' : sub['plan_name'] == 'Ultimate' ? 'dark-orange-gradient' : 'orange-gradient'}">${sub.plan_name}</span>
                        <div class="img-container">
                            <a href="${config.APP_URL + '/checkout/' + sub['id']}" onclick="subscriptionCardClick('${sub['plan_name']}', '${sub['value']}', '${sub['total_offered_tokens']}')" class="btn grey-btn sub-btn text-white ">Select</a>
                            <span class="mobile-tag">Validity</span>
                            <span class="margin10 text-dull">${sub.plan_duration_in_days} Days</span>
                            <span class="mobile-tag">Resolution</span>
                            <span class="margin10 text-dull">${getResolution(sub)}</span>
                            <span class="mobile-tag">Daily Gaming Limit</span>
                            <span class="margin10 text-muted">${sub.gameplay_limit_hrs_per_day} hrs</span>
                            <span class="mobile-tag">Gaming Hours</span>
                            <span class="margin10 text-muted">${sub['total_offered_tokens'] / 60} hrs</span>
                        </div>
                        <div class="img-container">
                            <span class="mobile-tag">Queue Basis</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.is_queue ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
                            </div>
                            <span class="mobile-tag">RTX Enabled</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.has_rtx_enabled ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
                            </div>
                            <span class="mobile-tag">Play games you own*</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.play_games_you_own ? '<img class=" cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
                            </div>
                            <span class="mobile-tag">Refundable</span>
                            <div class="img-wrapper margin10">
                            ${sub['plan_config']?.is_refundable ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
                            </div>
                        </div>`

        }
                    </div>
                </div>
                </div>
                `;
            subCard.appendChild(swiperSlide);
            
        }
        else if (sub?.tab_label === 'Trial') {
            ++countTrial;
            const swiperSlide2 = document.createElement('div');
            swiperSlide2.classList.add('swiper-slide');
            swiperSlide2.classList.add('swiper-slide-trial');
            if(sub['plan_config']?.is_recommended && !sub['plan_config']?.is_sold_out){
                swiperSlide2.classList.add('recommendedBorder');
                if(!firstRecommendTrial){
                    firstRecommendTrial=true;
                    firstRecommendTrialIndex=countTrial;
                }
            }
    
            swiperSlide2.innerHTML = `
            ${(sub['plan_config']?.is_recommended && !sub['plan_config']?.is_sold_out) ? 
            `<div class="row justify-content-center position-relative">
                <div class="col-auto position-absolute marginTop-20">
                <lottie-player src="./js/lottieAnimation/subscription/Recommended.json" background="transparent"  speed="1"  style="width: auto; height: auto;" loop autoplay></lottie-player>
                <button class="btn recommendedBg text-white btn-sm customBorder0 marginTop-67 px-lg-4 px-2">Recommended</button>
                </div>
            </div>`
        : ''}
        ${sub['plan_config']?.is_sold_out ? 
    `<div class="row justify-content-center position-relative">
        <div class="col-auto position-absolute marginTopSoldOut">
            <div class="btn disabledBtnGradient btn-sm customBorder0 marginTop-5 px-lg-1 py-lg-0 px-1 sold-out">SOLD OUT</div>
        </div>
    </div>`
: ''}
            <div class="row">
              <div class="col sub-container">

              ${sub['plan_config']?.is_sold_out ?`<span class="discount text-sold-out">${currencyMap[sub['currency']] || sub['currency']} ${sub['plan_config']?.actual_price}</span>
                <span class="price text-sold-out">${currencyMap[sub['currency']] || sub['currency']} ${sub?.value}</span>
                <div class="img-container">
                <button class="btn grey-btn sub-btn text-white margin-trial" onclick="openPopup('${sub['id']}')">Know More</button>
                <span class="mobile-tag">Validity</span>
                <span class="margin10 text-sold-out">${sub.plan_duration_in_days} Days</span>
                <span class="mobile-tag">Resolution</span>
                <span class="margin10 text-sold-out">${getResolution(sub)}</span>
                <span class="mobile-tag">Gaming Hours</span>
                <span class="margin10 text-sold-out">${sub['total_offered_tokens'] / 60} hrs</span>
              </div>
              <div class="img-container">
              <span class="mobile-tag">Queue Basis</span>
              <div class="img-wrapper margin10">
              ${sub['plan_config']?.is_queue ? '<img class="margin10 cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="margin10 cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
              </div>
              <span class="mobile-tag">Play games you own*</span>
              <div class="img-wrapper margin10">
              ${sub['plan_config']?.play_games_you_own ? '<img class="margin10 cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="margin10 cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
              </div>
              <span class="mobile-tag">Refundable</span>
              <div class="img-wrapper margin10">
              ${sub['plan_config']?.is_refundable ? '<img class="margin10 cross" src="../assets/subscriptionNew/TickSoldOut.svg"/>':'<img class="margin10 cross" src="./assets/subscriptionNew/Cross_Sold_Out.svg"/>'}
              </div>
              </div>`:
          `<span class="discount fontCustom">${currencyMap[sub['currency']] || sub['currency']} ${sub['plan_config']?.actual_price}</span>
          <span class="price text-white">${currencyMap[sub['currency']] || sub['currency']} ${sub?.value}</span>
          <div class="img-container">
          <a href="${config.APP_URL + '/checkout/' + sub['id']}" onclick="subscriptionCardClick('${sub['plan_name']}', '${sub['value']}', '${sub['total_offered_tokens']}')" class="btn grey-btn sub-btn text-white margin-trial">Select</a>
          <span class="mobile-tag">Validity</span>
          <span class="margin10 text-dull">${sub.plan_duration_in_days} Days</span>
          <span class="mobile-tag">Resolution</span>
          <span class="margin10 text-dull">${getResolution(sub)}</span>
          <span class="mobile-tag">Gaming Hours</span>
          <span class="margin10 text-muted">${sub['total_offered_tokens'] / 60} hrs</span>
        </div>
        <div class="img-container">
        <span class="mobile-tag">Queue Basis</span>
        <div class="img-wrapper margin10">
        ${sub['plan_config']?.is_queue ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
        </div>
        <span class="mobile-tag">Play games you own*</span>
        <div class="img-wrapper margin10">
        ${sub['plan_config']?.play_games_you_own ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
        </div>
        <span class="mobile-tag">Refundable</span>
        <div class="img-wrapper margin10">
        ${sub['plan_config']?.is_refundable ? '<img class="cross" src="../assets/subscriptionNew/Tick.svg"/>':'<img class="cross" src="./assets/subscriptionNew/Cross.svg"/>'}
        </div>
        </div>`
    }
              </div>
           </div>`;
            subCardTrial.appendChild(swiperSlide2); 
        }
 
})

new Swiper('#sub-swiper',{
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween:30,
    initialSlide:firstRecommendMonthlyIndex,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        spaceBetween:15,
        centeredSlides:false,
        initialSlide:0,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
        },
      }
    }
  });


  new Swiper('#sub-swiper-trial', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween:30,
    initialSlide:firstRecommendTrialIndex,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        spaceBetween:15,
        centeredSlides:false,
        initialSlide:0,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
        },
      }
    }
   
  });
  

})
