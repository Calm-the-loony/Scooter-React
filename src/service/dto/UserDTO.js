class RegisterUser {
    constructor (emailUser, passwordUser, nameUser, surnameUser, mainNameUser) {
        this.emailUser = emailUser;
        this.passwordUser = passwordUser;
        this.nameUser = nameUser;
        this.surnameUser = surnameUser;
        this.mainNameUser = mainNameUser;
    }
};

class UpdateUser {
    constructor (mainNameUser, dateBirthDay, address, telephone) {
        this.main_name_user = mainNameUser;
        this.address = address;
        this.telephone = telephone;
        this.date_birthday = new Date(dateBirthDay);
    }
}

export default (RegisterUser, UpdateUser);