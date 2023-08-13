/* eslint-disable*/
import moment from 'moment';

// All kind of validations

const Validator = {
  makeUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return url.includes(`.com`) ?
        `http://${url}` : `http://${url}.com`

    }
    return url;
  },
  validUrl(data) {
    let flag = false;
    if (data.length) {
      if (data.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)) {
        flag = true;
      }
    }
    return flag;
  },

  email(data) {
    let flag = false;
    if (data?.length > 0) {
      if (data.toLowerCase().match(/^[a-z0-9._%+-]{1,64}@(?:[a-z0-9-]{1,63}\.){1,4}[a-z]{2,5}$/)) {
        flag = true;
      }
    }
    return flag;
  },

  mobile(data) {
    let flag = false;
    if (data.length > 0) {
      if (data.match(/^[+0-9\s()-]+$/) && data.length >= 10 && data.length <= 10) { //this is for 10 digit
        flag = true;
      }
    }
    return flag;
  },

  text(s, l = 0) {
    if (s !== null && s !== '' && s !== undefined && s.trim() !== '' && s.length > l) {
      return true;
    }
    return false;
  },

  nameFields(s, l = 0) {
    //Only Take charecter
    if (s !== null && s !== '' && s !== undefined && s.length > l && s.trim().match(/^[a-zA-Z -']*$/)) { //Only phone ---> [0-9-+()@!#$%^&*~<>?]
      return true;
    }
    return false;
  },

  spaceCheck(s, l = 0) {
    if (s !== null && s !== '' && s !== undefined && s.length > l && s.trim().match(/^[a-zA-Z]*$/)) {
      return true;
    }
    return false;
  },

  positiveNumber(n, lowerLimit = 0, uperLimit = 1000000000) {
    if (n !== '' && n !== null && parseInt(n, 10) > lowerLimit && parseInt(n, 10) < uperLimit) {
      return true;
    }
    return false;
  },

  wholeNumber(n) {
    const number = n - (Math.floor(n));
    if (number === 0) {
      return true;
    }
    return false;
  },

  negetiveNumber(n) {
    if (n < 0) {
      return false;
    }
    return true;
  },

  fractionNumber(n) {
    const number = n - (Math.floor(n));
    if (number !== 0) {
      return true;
    }
    return false;
  },

  strWithSpace(value) {
    const val = value.indexOf(' ');
    if (val > -1) {
      return true;
    }
    return false;
  },

  strWithSpaceCount(value, spaceCount) {
    const arr = value.split(' ');
    if (arr.length - 1 === spaceCount) {
      return true;
    }
    return false;
  },

  strWithoutSpecialChar(value) {
    const char = value.match(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/);
    if (char === null) {
      return true;
    }
    return false;
  },

  isArray(value) {
    if (Array.isArray(value)) {
      return true;
    }
    return false;
  },

  isObject(value) {
    const obj = typeof (value);
    if (obj === 'object') {
      if (Array.isArray(value)) {
        return false;
      }
      return true;
    }
    return false;
  },

  strWithSpecialChar(value) {
    const char = value.match(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/);
    if (char === null) {
      return false;
    }
    return true;
  },

  dayToString(days, daysString = '') {
    try {
      if (days === 0) {
        if (daysString === '') {
          daysString = '0 day';
        }
        return daysString.trim();
      } else if (days === 36500) {
        return "Lifetime";
      } else if (days >= 1 && days <= 29) {
        if (days === 1) {
          daysString += " 1 day";
        } else {
          daysString += ` ${days} days`;
        }
        return this.dayToString(0, daysString);
      } else if (days >= 30 && days <= 364) {
        let month = days / 30;
        let day = days % 30;
        if (parseInt(month) === 1) {
          daysString += ' 1 month';
        } else {
          daysString += ` ${parseInt(month)} months`;
        }
        return this.dayToString(day, daysString);
      } else if (days >= 365) {
        const year = days / 365;
        const month = days % 365;
        if (parseInt(year) === 1) {
          daysString += ' 1 year';
        } else {
          daysString += ` ${parseInt(year)} years`;
        }
        return this.dayToString(month, daysString);
      }
    } catch (e) {
      return e.message;
    }
  },

  nearestWholeNumber(value) {
    const numb = (value + (10 - (value % 10)));
    return parseInt(numb);
  },

  generatePassword() {
    let length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  },

  passwordStrength(value, strengthLevel) {
    // REGEX DESCRIPTION
    // ^The password string will start this way
    // (?=.*[a-z])The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])The string must contain at least 1 numeric character
    // (?=.[!@#\$%\^&])The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    // (?=.{8,})The string must be eight characters or longer
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})').test(value);
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})').test(value);
    const weekRegex = new RegExp('^(?=.{8,})').test(value);

    switch (strengthLevel) {
      case 'week':
        return weekRegex;
      case 'medium':
        return mediumRegex;
      case 'strong':
        return strongRegex;
      default:
        return false;
    }
  },

  passwordCheck(data) {
    let flag = false;
    if (data.length > 0) {
      let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (pattern.test(data)) {
        flag = true;
        //error["pass"] = "Please Enter Valid Please enter password minimum 8 characters with at least a number, special character and Capital Letter and Small Letter ";
      }
      return flag;
    }
  },
  passwordConfirmCheck(password, confirmPassword) {
    if (this.text(password) && this.text(confirmPassword)) {
      if (password === confirmPassword) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },


  timeConvert(value) {
    if (value === null || value === undefined || value === '') {
      return 'No Time';
    }
    let num = parseInt(value);
    if (Math.floor(num) < 60) {
      return num + ' MINUTES'
    } else {
      if ((Math.floor(num) % 60) === 0) {
        return Math.floor(num / 60) + " HOUR"
      }
      let hours = Math.floor(num / 60);
      let minutes = num % 60;
      return `${hours} HOUR ${minutes} MINUTES`
    }
  },

  secondsToHms(seconds, colon = '') {
    seconds = Number(seconds);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);

    if (colon !== '' && colon === ':') {
      let hr = h >= 0 && h <= 9 ? '0' + h : h;
      let mn = m >= 0 && m <= 9 ? '0' + m : m;
      let sec = s >= 0 && s <= 9 ? '0' + s : s;
      if (hr != '00') {
        return (hr + ':' + mn + ':' + sec);
      }
      return (mn + ':' + sec);
    } else if (colon !== '' && colon === 'hms') {
      let hourDisplay = h > 0 ? (h > 0 && h < 2 ? h + "hr " : h + "hr ") : "";
      let minuteDisplay = m > 0 ? (m > 0 && m < 2 ? m + "m " : m + "m ") : "";
      let secondDisplay = s > 0 ? (s > 0 && s < 2 ? s + "s " : s + "s ") : "";
      return seconds > 0 ? hourDisplay + minuteDisplay + secondDisplay : "0s";
    } else {
      let hourDisplay = h > 0 ? (h > 0 && h < 2 ? h + " hour " : h + " hours ") : "";
      let minuteDisplay = m > 0 ? (m > 0 && m < 2 ? m + " minute " : m + " minutes ") : "";
      let secondDisplay = s > 0 ? (s > 0 && s < 2 ? s + " second " : s + " seconds ") : "";
      return hourDisplay + minuteDisplay + secondDisplay;
    }
  },

  toCapitalize(string) {
    return string.split(" ").reduce((init, current) => init + " " + current.charAt(0).toUpperCase() + current.slice(1), "");
  },


  leadingZero(x) {
    return x < 10 ? '0' + x : x
  },


  queryParamBind(obj, pageValue = 0) {
    let qArr = [], url = "";
    Object.entries(obj).forEach((value) => {
      if (value[1] !== "" && value[1] !== undefined && value[1] !== null) {
        if (Array.isArray(value[1])) {
          qArr.push(value[0] + '=' + value[1].join(","));
        } else {
          qArr.push(value[0] + '=' + value[1]);
        }
      }
    })
    if (qArr.length > 0 && pageValue != 0) {
      url = "?" + qArr.join('&').concat("&page=" + (pageValue));
    } else if (qArr.length === 0 && pageValue != 0) {
      url = "?page=" + (pageValue)
    } else if (qArr.length > 0) {
      url = "?" + qArr.join('&')
    }
    return url;
  },


  getFromQueryParam(param, filter, page) {
    let keys = Object.keys(filter);
    Object.entries(param).forEach((value, i) => {
      if (keys.indexOf(value[0]) >= 0 || value[0] === "page") {
        if (value[1].indexOf(",") > -1) {
          filter[value[0]] = value[1].split(',');
        } else {
          if (value[0] === "page") {
            page = value[1];
          } else {
            filter[value[0]] = value[1];
          }
        }
      }
    })
    return { filter, page };
  },


  removeCharFromEndInString(str, charecter) {
    if (str.length > 0) {
      return str.slice(charecter, -1);
    } else {
      return str
    }

  },

  phoneNumberFormat(value) {
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,10})/);
    value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    return value
  },

  customFormValueCheckRegex() {
    return /(<([^>]+)>)/ig
  },
  
  showHidePassword(id, visiblity) {
    if (visiblity === false) {
      document.getElementById(id).type = "text";
    }
    else {
      document.getElementById(id).type = "password";
    }
  },

  referralCodeFormat(value) {
    if (value.length === 10) {
      return true;
    } else {
      return false
    }
  },

  getLast12Months() {
    let monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    let date = new Date();
    let dateArr = [];
    date.setDate(1);
    for (let i = 0; i <= 11; i++) {
      // console.log(monthName[date.getMonth()] + ' ' + date.getFullYear());
      dateArr.push(monthName[date.getMonth()] + ' ' + date.getFullYear());
      date.setMonth(date.getMonth() - 1);
    }
    return dateArr;
  },

  getCurrentMonth() {
    let currentMonth = moment().format('MMMM');
    return currentMonth;
  },

  getStartEndDateOfMonth(month) {
    let date = new Date(month);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDayFormated = moment(firstDay).format("YYYY-MM-DDTHH:mm:ss");
    let lastDayFormated = moment(lastDay).format("YYYY-MM-DDTHH:mm:ss");
    let dateObj = {
      startDate: firstDayFormated,
      endDate: lastDayFormated
    }
    return dateObj;
  },

  secureIdGenerator() {
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);
    return crypto.getRandomValues(array); //4589782596
  },

  extractEmailAddress(emailAddress) {
    if(emailAddress) {
      let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
      let receiverEmail = re.exec(emailAddress)
      if(receiverEmail?.length > 0 ) // bug for cc issue and details not opening, prasanta
      return receiverEmail[0];
    }
    return "";
  },
  validateHhMm(inputValue) {
    if (inputValue) {
      const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputValue)
      return isValid;
    }
    return false
  },
  convertToSeconds(time) {
    let totSeconds = "Invalid time";
  
    if (time) {
      let splitTime = time.split(":");
      let h = splitTime[0];
      let m = splitTime[1];
      let s = splitTime[2];
  
      if (parseInt(h)) h = parseInt(h * 60 * 60);
      if (parseInt(m)) m = parseInt(m * 60);
  
      totSeconds = parseInt(h) + parseInt(m) + parseInt(s);
      return totSeconds;
    }
    return totSeconds;
  },

  convertTimeToSeconds(time) {
    let totSeconds = "Invalid time";
  
    if (time) {
      let splitTime = time.split(":");
      let h = splitTime[0];
      let m = splitTime[1];
  
      if (parseInt(h)) h = parseInt(h * 60 * 60);
      if (parseInt(m)) m = parseInt(m * 60);
  
      totSeconds = parseInt(h) + parseInt(m);
      return totSeconds;
    }
    return totSeconds;
  },
  convertTimeToSecondsForCall(time) {
    let totSeconds = "Invalid time";
  
    if (time) {
      let splitTime = time.split(":");
      let h = splitTime[0];
      let m = splitTime[1];
      let s = splitTime[2];
  
      if (parseInt(h)) h = parseInt(h * 60 * 60);
      if (parseInt(m)) m = parseInt(m * 60);
  
      totSeconds = parseInt(h) + parseInt(m) + parseInt(s);
      return totSeconds;
    }
    return totSeconds;
  },
  validateCallerTime(time) {
    let IsValidCallTime = true;
  
    if (time) {
      let tmString = time.toString();
      const isValidNumber = /^\d+(\.\d+)?$/.test(tmString);

      if (!isValidNumber) {
        let splitTime = time.replace(/\s+/g, " ").trim().split(":");
        if (splitTime.length === 3) {
          const isValid = /^([0-9][0-9]):([0-5][0-9])(:[0-5][0-9])?$/.test(tmString);
          if (isValid) {
            return IsValidCallTime = true
          }else {
            IsValidCallTime = false
          }
        }
        if (/^(\.\d+)?$/.test(tmString)) {
          return IsValidCallTime = true      
        }
        if (/^\d+$/.test(tmString)) {
          IsValidCallTime = true
        }else {
          IsValidCallTime = false
        }
      }else {
        IsValidCallTime = true
      }
    } else {
      IsValidCallTime = false;
    }
    
    return IsValidCallTime;
  },
  checkEmptyRecipients(recipients, userEmail, checkUserEmail = true) {
    if(recipients !== null && recipients !== "[]" && recipients !== "") {
      return recipients
        .replace(/[\[\]']+/g, "")
        .split(",")
        .map((l) => this.extractEmailAddress(l))
        .filter((l) => checkUserEmail ? l !== userEmail?.toLowerCase() : l)
    }
    return []
  },
  checkEmptyEmailToString(emailTo) {
    if(emailTo !== null && emailTo !== "[]" && emailTo !== "") {
      return emailTo
        .replace(/[\[\]']+/g, "")
        .split(",")
        .map((l) => this.extractEmailAddress(l))
    }
    return []
  },
  displayTimeInFractional(seconds) {
    if (seconds !== null && seconds !== 0) {
      let hours = seconds / 3600;
      if (hours % 1 === 0) {
        return hours.toFixed(1);
     }
      return parseFloat(hours.toFixed(2));
    }
    return "No time tracking";
  },
  abstractStartEndTime(stTime, eTime){
    let time =  {
      h : "0",
      m : "0",
      s : "0" 
    }
    if (stTime && eTime) {
      let startTime = moment(stTime).format("hh:mm a");
      startTime = moment(startTime, "HH:mm a");
      let endTime = moment(eTime).format("hh:mm a");
      endTime = moment(endTime, "HH:mm a");
      let totalMinutes = endTime.diff(startTime, "minutes");
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      let h = parseInt(hours * 60 * 60);
      let m = parseInt(minutes * 60);
      time.h = hours
      time.m = minutes
      time.s = h + m
    }
    return time;
  },
  isLastEmailLessThan90Days(emailReceivedDate) {
    if(emailReceivedDate) {
      let isoDate = new Date(emailReceivedDate).toISOString();
      const today = new Date();
      const emailDate = new Date(isoDate);
      const daysDiff = (today.getTime() - emailDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 90) return true
    }
    return false
  },
  padNumber(num) {
    return num.toString().padStart(2, '0');
  },
  formattedDate(myDate){
    if(myDate){
      let dateObj = new Date(myDate);
      let newDate = `${dateObj.getFullYear()}-${this.padNumber(dateObj.getMonth() + 1)}-${this.padNumber(dateObj.getDate())} ${this.padNumber(dateObj.getHours())}:${this.padNumber(dateObj.getMinutes())}:${this.padNumber(dateObj.getSeconds())}`;
      return newDate
    }
    return ""
  },
  extractNameFromEmail(email) {
    if (email) {
      let name = "";
      const fName = email.substring(0, email.indexOf("<") - 1);
      if (fName) {
        name = fName;
      } else {
        name = email.substring(1, email.indexOf("@"));
      }
      return name.replaceAll("[","").replaceAll("]","");
    }
    return "";
  },
  extractName(emailAdd, userEmail) {
    let emailRegex = /[\w.-]+@[\w.-]+\.[\w.-]+/g;
    let name = "";
    if (
      emailAdd.match(emailRegex).toString().toLowerCase() ===
      userEmail.toLowerCase()
    ) {
      return "me";
    }
    if (emailAdd.includes("<")) {
      const nameEndIndex = emailAdd.indexOf("<");
      name = emailAdd.substring(0, nameEndIndex);
      if (name) {
        return name.split(" ")[0];
      } else {
        const nameEndIndex = emailAdd.indexOf("@");
        name = emailAdd.substring(1, nameEndIndex);
        return name;
      }
    } else if (emailAdd.includes("[")) {
      const nameEndIndex = emailAdd.indexOf("[");
      name = emailAdd.substring(0, nameEndIndex);
      if (name) {
        return name.split(" ")[0];
      } else {
        const nameEndIndex = emailAdd.indexOf("@");
        name = emailAdd.substring(1, nameEndIndex);
        return name;
      }
    }else {
      const nameEndIndex = emailAdd.indexOf("@");
      name = emailAdd.substring(0, nameEndIndex);
      return name;
    }
  },
  generateToNames(data, userEmail) {
    const { emailTo, ccRecipients, bccRecipients } = data;
    let emailsArr = [];
    if (
      emailTo !== null &&
      emailTo !== "[]" &&
      emailTo !== "" &&
      emailTo !== "undisclosed-recipients:;"
    ) {
      let arr = emailTo.replace(/[\[\]]/g, '').split(",");
      emailsArr.push(...arr);
    }
    if (ccRecipients !== null && ccRecipients !== "[]" && ccRecipients !== "") {
      let arr = ccRecipients.replace(/[\[\]]/g, '').split(",");
      emailsArr.push(...arr);
    }
    if (
      bccRecipients !== null &&
      bccRecipients !== "[]" &&
      bccRecipients !== ""
    ) {
      let arr = bccRecipients.replace(/[\[\]]/g, '').split(",");
      emailsArr.push(...arr);
    }
    let namesArr = [...new Set(emailsArr)].map((email) => this.extractName(email.trim(), userEmail));
  
    return namesArr;
  },
  encloseEmailsWithAngleBrackets(emails, symbol = true) {
    if (!emails) return;
    let reg = /[<>\[\]]/g
    const formatEmail = (name, address) => {
      const formattedAddress = address.replace(reg, '').trim();
      const symbolPrefix = symbol ? '&lt' : '< ';
      const symbolSuffix = symbol ? '&gt' : '>';
  
      return `${name} ${symbolPrefix}${formattedAddress}${symbolSuffix}`;
    };
  
    const emailList = emails.split(',').map(email => {
      const nameEndIndex = email.indexOf("<");
      if (nameEndIndex !== -1) {
        const name = email.substring(0, nameEndIndex);
        const emailAddress = email.substring(nameEndIndex).replace(reg, '').trim();
        return formatEmail(name, emailAddress);
      } else {
        const emailOnly = email.replace(reg, '').trim();
        return formatEmail('', emailOnly);
      }
    });
  
    return emailList.join(', ');
  },
  checkEmptyEmailRecipients(recipients) {
    return (recipients !== null && recipients !== "[]" && recipients !== "") 
  }
};

export default Validator;
