import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
        nama_file: "",
        tgl_input: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/produk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Produk berhasil ditambahkan!");
                navigate("/produk");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambah produk");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat menambah produk");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk 🛠</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Judul Produk</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan nama produk"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan deskripsi produk"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan harga"
                        required
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        type="number"
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Kategori"
                        >
                            <option value="">--- Pilih Kategori---</option>
                            <option value="1">Facial Wash</option>
                            <option value="2">Toner</option>
                            <option value="3">Serum</option>
                            <option value="4">Mask</option>
                        </select>
                </div>


                <div className="mb-3">
                    <label className="form-label">Nama File</label>
                    <input
                        type="text"
                        name="nama_file"
                        value={formData.nama_file}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Nama File"
                        required
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">Tanggal Input</label>
                    <input
                        type="date"
                        name="tgl_input"
                        value={formData.tgl_input}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Tanggal Input"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Simpan
                </button>
            </form>
        </div>
    );
}