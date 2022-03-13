import moment from "moment";

// remove hyphens from phone numbers or any other string
const removeHyphen = (value = "") => value.replaceAll("-", " ");

// Check date value and set the date format form by moment
const arrangeDate = (value = new Date()) =>
  typeof value === "string"
    ? moment(value).format("DD/MM/YYYY")
    : moment(value?.date).format("DD/MM/YYYY");

export { removeHyphen, arrangeDate };
