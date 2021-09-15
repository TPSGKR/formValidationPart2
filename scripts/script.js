'use strict';
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const inputArr = [username,email,password,confirmPassword];

const showError = function(input,message){
   const formControl=input.parentElement;
   formControl.className = 'form-control error';
   const small =formControl.querySelector('small');
   small.innerText=message;
  };

  const showSucess = function(input){
    const formControl=input.parentElement;
    formControl.className = 'form-control sucess';
   };
  
  const message = function(input){
    let errorMessage = input.id.replace(/-p/,'P');
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
  }
   const validEmail= function(input) { 
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase().trim());
  };

  const checkEmail = function(input) {
    if(validEmail(input.value)) {
      showSucess(input);
    } else {
      showError(input,'Email is not valid')
    }
  };

  const checkRequired = function(inputArr) {
    inputArr.forEach((input) => {
      if(input.value==='') {
        showError(input,`${message(input)} is required`);
     } else {
        showSucess(input);
     }
    });    
 };

 const checkLength = function(input,min,max) {
    if(input.value.length < min) {
      showError(input,`${message(input)} must be atleast ${min} characters`);
    } else if(input.value.length > max) {
      showError(input,`${message(input)} should not be more than ${max} characters`);
    } else {
      showSucess(input);
    }
 }

 const checkPasswordMatch = function (password,confirmPassword) {
   if(password.value !== confirmPassword.value) {
     showError(confirmPassword,'confirm password not matched');
   } else {
     showSucess(password);
     showSucess(confirmPassword);
   }
 }

  form.addEventListener('submit',(e)=> {
    e.preventDefault();
    checkRequired(inputArr);
    checkEmail(email);
    checkLength(username,5,11);
    checkLength(password,8,14);
    checkPasswordMatch(password,confirmPassword);
 });
