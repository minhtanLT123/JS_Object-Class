import { getEleID } from "./../controler/main.js";

class Validation {
    checkEmpty(value, errorId, mess) {
        if (value === "" || !value) {
            getEleID(errorId).style.display = "block";
            getEleID(errorId).innerHTML = mess;
            return false;
        }

        getEleID(errorId).style.display = "none";
        getEleID(errorId).innerHTML = "";
        return true;
    };
    checkName(value, errorId, mess) {
        let letter =
            /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

        if (value.match(letter)) {
            getEleID(errorId).style.display = "none";
            getEleID(errorId).innerHTML = "";
            return true;

        }
        getEleID(errorId).style.display = "block";
        getEleID(errorId).innerHTML = mess;
        return false;
    };

    checkEmail(value, errorId, mess) {
        let Email =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(Email)) {
            getEleID(errorId).style.display = "none";
            getEleID(errorId).innerHTML = "";
            return true;

        }
        getEleID(errorId).style.display = "block";
        getEleID(errorId).innerHTML = mess;
        return false;

    };
    checkPassWord(value, errorId, mess) {
        let Password =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
        if (value.match(Password)) {
            getEleID(errorId).style.display = "none";
            getEleID(errorId).innerHTML = "";
            return true;

        }
        getEleID(errorId).style.display = "block";
        getEleID(errorId).innerHTML = mess;
        return false;

    };

    checkExist(value, errorId, mess, listNhanVien) {
        let isExist = false; // chua ton tai

        for (let i = 0; i < listNhanVien.length; i++) {
            const NV = listNhanVien[i];
            if (NV.id === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getEleID(errorId).style.display = "block";
            getEleID(errorId).innerHTML = mess;
            return false;
        }
        getEleID(errorId).style.display = "none";
        getEleID(errorId).innerHTML = "";
        return true;

    };
    checkLength(value, errorId, mess, min, max) {
        if (value && min <= value.trim().length && value.trim().length <= max) {
            getEleID(errorId).style.display = "none";
            getEleID(errorId).innerHTML = "";
            return true;
        }
        getEleID(errorId).style.display = "block";
        getEleID(errorId).innerHTML = mess;
        return false;

    };
    checkOption(idSelect, errorId, mess) {
        const optionIndex = getEleID(idSelect).selectedIndex;
        if (optionIndex === 0) {
            getEleID(errorId).style.display = "block";
            getEleID(errorId).innerHTML = mess;
            return false;

        }
        getEleID(errorId).style.display = "none";
        getEleID(errorId).innerHTML = "";
        return true;

    };
};


export default Validation;