 
 
const  v = {
  required: [(v: string) => !!v || "Item is required"],
  passwordRules: [
    (v: string) => !!v || "Password is required",
    (v: string) =>v && v.length >= 7 || "Name must be less than 8 characters"
  ],
  emailRules: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => !!v || "This E-mail is already Exist",
    (v: string) =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        v
      ) || "E-mail must be valid"
  ] 
}

export default v