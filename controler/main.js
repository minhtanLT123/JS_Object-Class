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



const getInfoNhanVien = () => {
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

    isValid &=
        validate.checkEmpty(id, "tbTKNV", "(*) Vui Lòng nhập ID") &&
        validate.checkExist(id, "tbTKNV", "(*) ID đã tồn tại vui lòng nhập mới", manager.arr) &&
        validate.checkLength(id, "tbTKNV", "(*) ID có độ dài không quá 6 ký tự số", 1, 6);

    // name validation
    isValid &=
        validate.checkEmpty(name, "tbTen", "(*) Vui Lòng nhập Tên") &&
        validate.checkName(name, "tbTen", "(*) Vui Lòng nhập Tên đúng cách không có ký tự đặc biệt");
    // email validation
    isValid &=
        validate.checkEmpty(email, "tbEmail", "(*) Vui Lòng nhập Email") &&
        validate.checkEmail(email, "tbEmail", "(*) Vui Lòng nhập Email đúng cách")

    // password validation
    isValid &=
        validate.checkEmpty(password, "tbMatKhau", "(*) Vui Lòng nhập Mật Khẩu") &&
        validate.checkEmail(password, "tbMatKhau", "(*) Vui Lòng nhập Mật Khẩu đúng cách")

    // date validation
    isValid &=
        validate.checkEmpty(startDay, "tbNgay", "(*) Vui Lòng chọn ngày làm");
    // salary validation
    isValid &=
        validate.checkEmpty(baseSalary, "tbLuongCB", "(*) Vui Lòng nhập lương cơ bản");

    // jobTitile validation
    isValid &=
        validate.checkOption("chucvu", "tbChucVu", "(*) Vui Lòng chọn vị trí công việc");
    // work hours validation
    isValid &=
        validate.checkEmpty(workHours, "tbGiolam", "(*) Vui Lòng nhập giờ làm");


    if (!isValid) return null;

    const NV = new NhanVien(id, name, email, password, startDay, baseSalary, jobTitle, workHours);
    NV.tinhTongLuong();
    NV.xepLoaiRank();
    return NV;

};
/**
 * function reset validation tag 
 */
const deleteValidationTag = () => {

    document.getElementsByClassName("sp-thongbao").innerHTML = "";
}

const renderListNhanVien = (listNhanVien) => {
    let contentHTML = "";
    for (let i = 0; i < listNhanVien.length; i++) {
        const NV = listNhanVien[i];
        const jobTitleConvert = function () {
            if (NV.jobTitle === "1") {
                return "Nhân Viên";
            }
            else if (NV.jobTitle === "2") {
                return "Trưởng Phòng";
            }
            else if (NV.jobTitle === "3") {
                return "Sếp";
            }
            else {
                return "";
            }
        }
        contentHTML += `
        <tr>
            <td>${NV.id} </td>
            <td>${NV.name} </td>
            <td>${NV.email} </td>
            <td>${NV.startDay} </td>
            <td>${jobTitleConvert()} </td>
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
 * Add Nhan vien
 */
getEleID("btnThem").onclick = function () {

    getEleID("header-title").innerHTML = "Thêm Nhân Viên";
    getEleID("btnCapNhat").style.display = "none";
    getEleID("btnThemNV").style.display = "block";
    resetForm();


}
getEleID("btnThemNV").onclick = function () {

    const NV = getInfoNhanVien();
    manager.addNhanVien(NV);
    renderListNhanVien(manager.arr);
    setLocalStorage();
    getEleID("tknv").disable = false;
    closeForm();

}
/**
 * Edit Nhan vien
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
 * Update Nhan vien
*/
getEleID("btnCapNhat").onclick = () => {
    const NV = getInfoNhanVien();
    manager.updateNhanVien(NV);
    renderListNhanVien(manager.arr)
    setLocalStorage();
    closeForm();

}
/**
 * Delete Nhan vien
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
 * search nhan vien
 *  
 */
getEleID("searchName").addEventListener("keyup", () => {
    const keyword = getEleID("searchName").value;
    const searchNV = manager.searchNhanVien(keyword);
    console.log(searchNV);
    renderListNhanVien(searchNV);

});





