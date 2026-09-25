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
    const [kategori, setKategori] = useState([]);

    useEffect(() => {
         fetch(`http://localhost:5000/produk/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         })
         .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
         })
            .then((data) => {
                console.log("Data produk:", data);

                // Kalau API mengembalikan array
                if (Array.isArray(data)) {
                    setFormData(data[0]);
                } else {
                    //Kalau API langsung mengembalikan object
                    setFormData(data);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil produk:", err);
            setLoading(false)
        });
    }, []);

    //Mengambil data kategori dari tabel kategori
    useEffect(() => {
        fetch("http://localhost:5000/kategori", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            console.log("Status kategori:", res.status);

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
            }

            return res.json();
        })
        .then((data) => {
            console.log("Data kategori:", data);

            if (Array.isArray(data)) {
                setKategori(data);
            } else if (Array.isArray(data.data)) {
                setKategori(data.data);
            } else {
                console.error("Format data kategori tidak sesuai:", data);
                setKategori([]);
            }
        })
        .catch((err) => {
            console.error("Gagal mengambil kategori:", err);
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("Yakin ingin memperbarui produk ini?")) {
            return;
        }
        
        await fetch(`http://localhost:5000/produk/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">--- Pilih Kategori ---</option>
                        
                        {kategori.map((k) => (
                            <option
                            key={k.id_kategori}
                            value={k.id_kategori}
                            >
                                {k.kategori}
                            </option>
                        ))}
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