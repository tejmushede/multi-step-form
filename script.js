let prevButton = document.querySelector(".prev-button-desktop");
let nextButton = document.querySelector(".next-button-desktop");
let toggleSwitch = document.querySelector(".switch");
let plans = document.querySelectorAll(".plan");
let addOns = document.querySelectorAll(".add-on");
let currentPage = 1;

const planObject = {
  name: "",
  paymentPlan: "",
  price: "",
};

window.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector(".page-one").style.display = "flex";
    prevButton.style.visibility = "hidden";
    document.querySelector(".step-number-one").classList.add("active-step");
})

nextButton.addEventListener("click", () =>{
  if (currentPage == 1) {
    validateForm();
  } else if (currentPage == 4){
    document.querySelector(".next-button-desktop").innerHTML = "Confirm";
    currentPage++;
    updatePage(currentPage);
  }
  else {
    currentPage++;
    updatePage(currentPage);
  }
  });

prevButton.addEventListener("click", () => {
  currentPage--;
  updatePage(currentPage);
});

function updatePage(x){

  switch(x){

    case 1:
      document.querySelector(".page-one").style.display = "flex";
      document.querySelector(".page-two").style.display = "none";
      prevButton.style.visibility = "hidden";

      document.querySelector(".step-number-two").classList.remove("active-step");
      document.querySelector(".step-number-one").classList.add("active-step");
      break;

    case 2:
      document.querySelector(".page-one").style.display = "none";
      document.querySelector(".page-two").style.display = "flex";
      document.querySelector(".page-three").style.display = "none";
      prevButton.style.visibility = "visible";

      document.querySelector(".step-number-one").classList.remove("active-step");
      document.querySelector(".step-number-two").classList.add("active-step");
      document.querySelector(".step-number-three").classList.remove("active-step");
      break;
    
      case 3:
      document.querySelector(".page-two").style.display = "none";
      document.querySelector(".page-three").style.display = "flex";
      document.querySelector(".page-four").style.display = "none";

      document.querySelector(".step-number-two").classList.remove("active-step");
      document.querySelector(".step-number-three").classList.add("active-step");
      document.querySelector(".step-number-four").classList.remove("active-step");
      break;

      case 4:
      document.querySelector(".page-three").style.display = "none";
      document.querySelector(".page-four").style.display = "flex";
      document.querySelector(".page-five").style.display = "none";

      document.querySelector(".step-number-three").classList.remove("active-step");
      document.querySelector(".step-number-four").classList.add("active-step");
      break;

      case 5:
      document.querySelector(".page-four").style.display = "none";
      document.querySelector(".page-five").style.display = "flex";
      document.querySelector(".desktop-buttons").style.display = "none";
      break; 
  }
}

function validateForm (){
  let flag = false;
  let name = document.getElementById("name").value;
  let emailAddress = document.getElementById("email").value.toLowerCase();
  let emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let phoneNumber = document.getElementById("phone").value;
  let phonePattern = /^\+[0-9]+$/;

  let nameFlag = true;
  let emailFlag = true;
  let phoneFlag = true;

  if (name.length == 0) {
    document.querySelector(".error").style.display = "inline";
    document.querySelector("input").style.border = "1px solid var(--strawberry-red)";
  } else {
    document.querySelector(".error").style.display = "none";
    nameFlag = true;
  }

  if (emailAddress.match(emailPattern)) {
    document.querySelector(".error-email").style.display = "none";
    emailFlag = true;
  } else {
    document.querySelector(".error-email").style.display = "inline";
    document.getElementById("email").style.border = "1px solid var(--strawberry-red)";
  }

  if (phonePattern.test(phoneNumber)) {
    document.querySelector(".error-phone").style.display = "none";
    phoneFlag = true;
  } else {
    document.querySelector(".error-phone").style.display = "inline";
    document.getElementById("phone").style.border = "1px solid var(--strawberry-red)";
  }
  
  if (nameFlag && emailFlag && phoneFlag){
    currentPage++;
    updatePage(currentPage);
  }
}

toggleSwitch.addEventListener("click", () => {
  const value = toggleSwitch.querySelector("input").checked;
  let planContainer = document.querySelectorAll(".title-price");
  let price = document.querySelectorAll(".price");
  let pricesYearly = ["$10/yr", "$20/yr", "$20/yr"];
  let pricesMonthly = ["$1/mo", "$2/mo", "$2/mo"];

  if (value == true) {
    planObject["paymentPlan"] = "(Yearly)";

    for (let i=0; i<planContainer.length; i++){
      planContainer[i].querySelector(".monthly-price").style.display = "none";
      planContainer[i].querySelector(".yearly-price").style.display = "block";
      planContainer[i].querySelector(".discount").style.display = "block";
      planContainer[i].querySelector(".discount").style.color = "var(--marine-blue)";
      planContainer[i].querySelector(".discount").style.fontWeight = "400";
    }

    for (let j =0; j < price.length; j++){
      price[j].innerHTML = `${pricesYearly[j]}`;
    }

  } else {
    planObject["paymentPlan"] = "(Monthly)";

    for (let i=0; i<planContainer.length; i++){
      planContainer[i].querySelector(".monthly-price").style.display = "block";
      planContainer[i].querySelector(".yearly-price").style.display = "none";
      planContainer[i].querySelector(".discount").style.display = "none";
    }

    for (let j =0; j < price.length; j++){
      price[j].innerHTML = `${pricesMonthly[j]}`;
    }
  }
});

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".active-plan").classList.remove("active-plan");
    plan.classList.add("active-plan");

    updateCheckout(plan);
  })
})

addOns.forEach((addOn) => {
  addOn.addEventListener("click", () => {
    const addonTicked = addOn.querySelector("input").checked;

    addonTicked ? addOn.classList.add("active-addon") : addOn.classList.remove("active-addon");
  })
})

function updateCheckout(planDetails){
  planObject.name = planDetails.getElementsByTagName("h4")[0].textContent + " " + planObject["paymentPlan"];
  document.querySelector(".selected-plan").innerHTML = planObject.name;
  //document.querySelector(".selected-plan-price") = 

  //console.log(planObject["name"]);
  //console.log(planDetails);
}