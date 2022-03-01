const profileForm = document.getElementById("form-profile");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () =>{
 window.location.href = "/logout";
})


profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileFormValidate();
  });

  const storeProfile = async (age,gender,address,education,martal_status,Nationality,phone, user_id ) => {
    let profile = {

        user_id: user_id,
        age :age,
        gender :gender,  
        address :address,
        education :education,
        martal_status :martal_status,
        Nationality :Nationality,
        phone :phone
  
    };
  
    const response = await fetch("./api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json "
      },
      body: JSON.stringify(profile),
    });
   if(response.status == 200){
     window.location.href = "/dashboard.ejs";
   }
  };
  
  // This function validate form and call the store function then return true if all element have valid input
  
  function profileFormValidate() {
    const userId = profileForm["user__id"];
    const userAge = profileForm["age"];
    const userGender = profileForm["gender"];
    const userAddress = profileForm["address"];
    const userEducation = profileForm["education"];
    const userMartalStatus = profileForm["martal_status"];
    const userNationality = profileForm["nationality"];
    const userPhone = profileForm["phone"];
   
    
    let isValid = false;
    
    isValid =
      userAge.value &&userGender.value &&userAddress.value &&userPhone.value && userMartalStatus.value && userNationality.value && userEducation.value && userId.value;
  
    if (isValid) {
      storeProfile(userAge.value ,userGender.value ,userAddress.value ,userPhone.value , userMartalStatus.value , userNationality.value , userEducation.value, userId.value);
      return isValid;
    }
  }
  