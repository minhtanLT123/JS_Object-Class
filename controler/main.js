import NhanVien from "./../model/nhanVien.js";
import NvManager from "./../model/nhanVienManage.js";
import Validation from "./../model/validation.js";


export const getEleID = (id) => document.getElementById(id);
const validate = new Validation();
const manager = new NvManager();
// clear form
const resetForm = () => {
    getEleID("form-id").reset();
}
// close form
const closeForm = () => {
    getEleID("btnDong").click();
}
/**
 * function getInfoNhanVien
 */
const getInfoNhanVien = (isAdd) => {
    const id = getEleID("tknv").value;
    const name = getEleID("name").value;
    const email = getEleID("email").value;
    const password = getEleID("password").value;
    const startDay = getEleID("datepicker").value;
    const baseSalary = parseFloat(getEleID("luongCB").value);
    const jobTitle = getEleID("chucvu").value;
    const workHours = parseFloat(getEleID("gioLam").value);

    let isValid = true; // flag: boolean
    /**
     * kiểm tra tính hợp lệ -  validation
     */

    // id validation
    if (isAdd) {
        isValid &=
            validate.checkEmpty(id, "tbTKNV", "(*) Vui Lòng nhập ID") &&
            validate.checkExist(id, "tbTKNV", "(*) ID đã tồn tại vui lòng nhập mới", manager.arr);

    }

    // name validation
    isValid &=
        validate.checkEmpty(name, "tbTen", "(*) Vui Lòng nhập Tên") &&
        validate.checkName(name, "tbTen", "(*) Vui Lòng nhập Tên đúng cách không có ký tự đặc biệt");
    // email validation
    isValid &=
        validate.checkEmpty(email, "tbEmail", "(*) Vui Lòng nhập Email") &&
        validate.checkEmail(email, "tbEmail", "(*) Vui Lòng nhập Email đúng cách");

    // password validation
    isValid &=
        validate.checkEmpty(password, "tbMatKhau", "(*) Vui Lòng nhập Mật Khẩu") &&
        validate.checkPassWord(password, "tbMatKhau", "(*) Vui Lòng nhập Mật Khẩu đúng cách");

    // date validation
    // isValid &=
    //     validate.checkEmpty(startDay, "tbNgay", "(*) Vui Lòng chọn ngày làm");
    // salary validation
    // isValid &=
    //     validate.checkEmpty(baseSalary, "tbLuongCB", "(*) Vui Lòng nhập lương cơ bản");

    // jobTitile validation
    isValid &=
        validate.checkOption("chucvu", "tbChucVu", "(*) Vui Lòng chọn vị trí công việc");
    // work hours validation
    // isValid &=
    //     validate.checkEmpty(workHours, "tbGiolam", "(*) Vui Lòng nhập giờ làm");


    if (!isValid) return null;

    const NV = new NhanVien(id, name, email, password, startDay, baseSalary, jobTitle, workHours);
    NV.tinhTongLuong();
    NV.xepLoaiRank();
    return NV;

};
/**
 * function deleteValidationTag
 */
const deleteValidationTag = () => {

    const tags = document.getElementsByClassName("sp-thongbao");
    for (let tag of tags) {
        tag.innerHTML = "";
        tag.style.display = "none";
    }

}
/**
 * function renderListNhanVien
 */
const renderListNhanVien = (listNhanVien) => {
    let contentHTML = "";
    for (let i = 0; i < listNhanVien.length; i++) {
        const NV = listNhanVien[i];
        const jobTitleConvert = (job) => {
            switch (job) {
                case "nhanvien": return "Nhân viên";
                case "truongphong": return "Trưởng phòng";
                case "sep": return "Sếp";
                default: return "";

            }
        }
        contentHTML += `
        <tr>
            <td>${NV.id} </td>
            <td>${NV.name} </td>
            <td>${NV.email} </td>
            <td>${NV.startDay} </td>
            <td>${jobTitleConvert(NV.jobTitle)} </td>
            <td>${NV.totalSalary}</td>
            <td>${NV.rank} </td>
            <td class = "btn btn-info" data-toggle="modal" data-target="#myModal"  onclick ="handleEditNhanVien('${NV.id}')" >Edit </td>
            <td class = "btn btn-danger" onclick = "handleDeleteNhanVien('${NV.id}')">Delete </td>
        </tr>
        `;
    }
    getEleID("tableDanhSach").innerHTML = contentHTML;
}
/**
 * mở form add nhân viên
 */
getEleID("btnThem").onclick = function () {
    deleteValidationTag();
    getEleID("header-title").innerHTML = "Thêm Nhân Viên";
    getEleID("btnCapNhat").style.display = "none";
    getEleID("btnThemNV").style.display = "block";
    resetForm();

}
// Add nhân viên vào localStorage
getEleID("btnThemNV").onclick = function () {

    const NV = getInfoNhanVien(true);
    if (!NV) return;
    manager.addNhanVien(NV);
    renderListNhanVien(manager.arr);
    setLocalStorage();

    closeForm();

}
/**
 * Edit Nhân viên
 */
const handleEditNhanVien = (id) => {

    getEleID("header-title").innerHTML = "Sửa Thông Tin";
    getEleID("btnCapNhat").style.display = "block";
    getEleID("btnThemNV").style.display = "none";
    deleteValidationTag();
    const NV = manager.getNhanVienByID(id);
    if (NV) {
        getEleID("tknv").value = NV.id;
        getEleID("name").value = NV.name;
        getEleID("email").value = NV.email;
        getEleID("password").value = NV.password;
        getEleID("datepicker").value = NV.startDay;
        getEleID("luongCB").value = NV.baseSalary;
        getEleID("chucvu").value = NV.jobTitle;
        getEleID("gioLam").value = NV.workHours;
        NV.tinhTongLuong();
        NV.xepLoaiRank();

    }
}
window.handleEditNhanVien = handleEditNhanVien;
/**
 * Update Nhân viên
*/
getEleID("btnCapNhat").onclick = () => {
    const NV = getInfoNhanVien(false);
    manager.updateNhanVien(NV);
    renderListNhanVien(manager.arr)
    setLocalStorage();
    closeForm();

}
/**
 * Delete Nhân viên
 */
const handleDeleteNhanVien = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
    if (confirmDelete) {
        manager.deleteNhanVien(id);
        renderListNhanVien(manager.arr);
        setLocalStorage();
    }
}
window.handleDeleteNhanVien = handleDeleteNhanVien;

/**
 * set localStorage
 */
const setLocalStorage = () => {
    const dataString = JSON.stringify(manager.arr);
    localStorage.setItem("LIST_NV", dataString);
}


/**
 * get localStorage
 */
const getLocalStorage = () => {

    const dataString = localStorage.getItem("LIST_NV");
    if (!dataString) return true;

    const dataJson = JSON.parse(dataString);
    manager.arr = dataJson;
    renderListNhanVien(dataJson);
};
getLocalStorage();

/**
 * search Nhân viên
 */
getEleID("searchName").addEventListener("keyup", () => {
    const keyword = getEleID("searchName").value;
    const searchNV = manager.searchNhanVien(keyword);
    console.log(searchNV);
    renderListNhanVien(searchNV);

});





