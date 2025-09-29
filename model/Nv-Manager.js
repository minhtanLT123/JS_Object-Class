
class NvManager {
    constructor() {
        this.arr = [];

    }
    addNhanVien(NhanVien) {
        this.arr.push(NhanVien)

    }
    findIndexNV(id) {
        let index = -1;
        for (i = 0; i < this.arr.length; i++) {
            const nhanVien = this.arr[i];
            if (nhanVien.id === id) {
                index = i;
                break;

            }
        }
        return index;

    }
    updateNhanVien() {

    }
    deleteNhanVien(id) {
        const index = this.findIndexNV(id);
        this.arr.splice(index, 1);

    }

}
export default NvManager;