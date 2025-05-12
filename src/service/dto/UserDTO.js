export class RegisterUser {
  constructor(emailUser, passwordUser, nameUser, mainNameUser) {
    this.emailUser = emailUser;
    this.passwordUser = passwordUser;
    this.nameUser = nameUser;
    this.mainNameUser = mainNameUser;
  }
}

export class UpdateUser {
  constructor(mainNameUser, dateBirthDay, address_city, address, telephone) {
    this.main_name_user = mainNameUser;
    this.address_city = address_city;
    this.address = address;
    this.telephone = telephone;
    this.date_birthday = new Date(dateBirthDay);
  }
}
