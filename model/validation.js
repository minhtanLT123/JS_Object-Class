import { getEleID } from "./../controler/main.js";

class Validation {
    checkEmpty(value, errorId, mess) {
        if (value === "") {
            getEleID(errorId).style.display = "block";
            getEleID(errorId).innerHTML = mess;
            return false;
        }

        getEleID(errorId).style.display = "none";
        getEleID(errorId).innerHTML = "";
        return true;
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

    }
    checkLength(value, errorId, mess, min, max) {
        if (value && min <= value.trim().length && value.trim().length <= max) {
            getEleID(errorId).style.display = "none";
            getEleID(errorId).innerHTML = "";
            return true;
        }
        getEleID(errorId).style.display = "block";
        getEleID(errorId).innerHTML = mess;
        return false;

    }
};


export default Validation;