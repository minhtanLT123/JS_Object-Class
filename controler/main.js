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


// dong nhan vien
const closeForm = () => {
    getEleID("btnDong").click();
}

const getInfoNhanVien = (isAdd) => {
    const id = getEleID("tknv").value;
    const name = getEleID("name").value;
    const email = getEleID("email").value;
    const password = getEleID("password").value;
    const startDay = getEleID("datepicker").value;
    const baseSalary = parseFloat(getEleID("luongCB").value);
    const jobTitle = getEleID("chucvu").value;
    const workHours = parseFloat(getEleID("gioLam").value);

    // dat co: boolean
    let isValid = true;

    /**
     * kiem tra tinh hop le -  validation
     */

    // id validation
    if (isAdd) {

        isValid &=
            validate.checkEmpty(id, "tbTKNV", "(*) Vui Lòng nhập ID") &&
            validate.checkExist(id, "tbTKNV", "(*) ID đã tồn tại vui lòng nhập mới", manager.arr) &&
            validate.checkLength(id, "tbTKNV", "(*) ID có độ dài không quá 6 ký tự số", 1, 6);
    }



    // jobTitile validation
    // isValid &= validate.checkOption(id, "chucvu",)

    // option validaton



    if (!isValid) return null;

    const NV = new NhanVien(id, name, email, password, startDay, baseSalary, jobTitle, workHours);
    NV.tinhTongLuong();
    NV.xepLoaiRank();
    return NV;

};

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
    getInfoNhanVien();
    resetForm();


}
getEleID("btnThemNV").onclick = function () {

    const NV = getInfoNhanVien(true);
    manager.addNhanVien(NV);
    renderListNhanVien(manager.arr);
    setLocalStorage();
    closeForm();

}
/**
 * Edit Nhan vien
 */
const handleEditNhanVien = (id) => {
    getEleID("header-title").innerHTML = "Sửa Thông Tin";
    getEleID("btnCapNhat").style.display = "block";
    getEleID("btnThemNV").style.display = "none";

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





