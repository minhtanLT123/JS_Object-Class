import NhanVien from "../model/nhanVien.js";
import NvManager from "../model/nhanVienManage.js";


const manager = new NvManager();
const getEleID = (id) => document.getElementById(id);



const getInfoNhanVien = () => {

    const id = getEleID("tknv").value;
    const name = getEleID("name").value;
    const email = getEleID("email").value;
    const password = getEleID("password").value;
    const startDay = getEleID("datepicker").value;
    const baseSalary = parseFloat(getEleID("luongCB").value);
    const jobTitle = getEleID("chucvu").value;
    const workHours = parseFloat(getEleID("gioLam").value);
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


}
getEleID("btnThemNV").onclick = function () {

    const NV = getInfoNhanVien();
    manager.addNhanVien(NV);
    renderListNhanVien(manager.arr);
    setLocalStorage();

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

}
/**
 * Delete Nhan vien
 */
const handleDeleteNhanVien = (id) => {
    manager.deleteNhanVien(id);
    renderListNhanVien(manager.arr);
    setLocalStorage();

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

