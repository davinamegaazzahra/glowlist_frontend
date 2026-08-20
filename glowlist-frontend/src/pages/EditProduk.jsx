import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
        nama_file: "",
        tgl_input: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData(data[0]); // ambil data pertama hasil query
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/produk/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        alert("Produk berhasil diperbarui!");
        navigate("/produk");
    };

    if (loading) {
        return <div className="container mt-4">Loading Ngapunten Lama...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
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

                <button type="submit" className="btn btn-success me-2">Simpan Perubahan</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/produk")}>Batal</button>
            </form>
        </div>
    );
}