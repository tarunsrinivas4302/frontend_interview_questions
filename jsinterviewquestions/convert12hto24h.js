const convert12To24h = function (time12h) {
  let [time, meridan] = time12h.split(" ");

  let [hours, minutes] = time.split(":");
  let hour = parseInt(hours);

  // let ampm = meridan === "PM" && hour < 12? "PM" : meridan === "AM" && hour === 12? "AM" : meridan === "PM"? "AM" : "PM";

  // hour = meridan === "PM" && hour < 12? hour + 12 : meridan === "AM" && hour === 12? 0 : hour;

  if (meridan === "PM" && hour !== 12) hour = parseInt(hour) + 12;
  else if (meridan === "AM" && hour === 12) hour = "0";
  hour = hour.toString().padStart(2, 0);
  minutes = minutes.toString().padStart(2, 0);
  return `${hour}:${minutes}`;
};

console.log(convert12To24h("12:30 AM")); // "00:30"
console.log(convert12To24h("01:45 PM")); // "13:45"
console.log(convert12To24h("12:00 PM")); // "12:00"
console.log(convert12To24h("11:59 PM")); // "23:59"
console.log(convert12To24h("11:59 AM")); // "23:59"
