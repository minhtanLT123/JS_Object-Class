
class NvManager {
    constructor() {
        this.arr = [];

    }
    addNhanVien(NV) {
        this.arr.push(NV)

    }
    findIndexNV(id) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const NV = this.arr[i];
            if (NV.id === id) {
                index = i;
                break;

            }
        }
        return index;

    }
    deleteNhanVien(id) {
        const index = this.findIndexNV(id);
        this.arr.splice(index, 1);

    }

    getNhanVienByID(id) {
        const index = this.findIndexNV(id);
        if (index !== -1) {
            return this.arr[index];
        }



    }
    updateNhanVien(NV) {
        const index = this.findIndexNV(NV.id);
        if (index !== -1) {
            this.arr[index] = NV;
        }

    }



}
export default NvManager;