import NhanVien from "../model/nhan-vien.js";
import NvManager from "../model/Nv-Manager.js";


const manager = new NvManager();
const getEleID = (id) => document.getElementById(id);



const getInfoNhanVien = () => {

    const id = getEleID("tknv").value;
    const name = getEleID("name").value;
    const email = getEleID("email").value;
    const password = getEleID("password").value;
    const startDay = getEleID("datepicker").value;
    const salary = getEleID("luongCB").value;
    const jobTitle = getEleID("chucvu").value;
    const workHours = getEleID("gioLam").value;
    const NV = new NhanVien(id, name, email, password, startDay, salary, jobTitle, workHours);
    return NV;

};

const renderListNhanVien = (data) => {
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const NV = data[i];
        const jobTitleConvert = function () {
            if (NV.jobTitle.value === 1 || NV.jobTitle.value === "1") {
                return "Nhan vien"
            }
            else if (NV.jobTitle.value === 2 || NV.jobTitle.value === "2") {
                return "Truong Phong"
            }
            else if (NV.jobTitle.value === 3 || NV.jobTitle.value === "3") {
                return "Sep"
            }
        }
        contentHTML += `
        <tr>

            <td>${NV.id} </td>
            <td>${NV.name} </td>
            <td>${NV.email} </td>
            <td>${NV.password} </td>
            <td>${NV.datepicker} </td>
            <td>${NV.salary} </td>
            <td>${jobTitleConvert()} </td>
            <td>${NV.workHours} </td>
            <td>${NV.totalSalary} </td>
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
    getEleID("btnCapNhat").style.display = "none";
    getEleID("btnThemNV").style.display = "block";

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


const handleEditNhanVien = () => {

    getEleID("btnCapNhat").style.display = "block";
    getEleID("btnThemNV").style.display = "none";

    const NV = manager.getNhanVienByID(id);
    if (NV) {
        getEleID("tknv").innerHTML = NV.id;
        getEleID("name").innerHTML = NV.name;
        getEleID("email").innerHTML = NV.email;
        getEleID("password").innerHTML = NV.password;
        getEleID("datepicker").innerHTML = NV.startDay;
        getEleID("luongCB").innerHTML = NV.salary;
        getEleID("chucvu").innerHTML = NV.jobTitle;
        getEleID("gioLam").innerHTML = NV.workHours;

    }
}
window.handleEditNhanVien = handleEditNhanVien;

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
}
getLocalStorage();
