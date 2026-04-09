# Dashboard Monitoring AISHA

Aplikasi Dashboard Monitoring dengan tampilan CCTV berbasis video, monitoring suhu, IoT, dan tandon air.

## Cara Menjalankan di Komputer Baru

Pastikan komputer sudah terinstall **Node.js** ([Download di sini](https://nodejs.org/)).

### Langkah-langkah:

1.  **Ekstrak File ZIP**
    Ekstrak semua isi file zip ke dalam sebuah folder baru.

2.  **Buka Terminal / Command Prompt**
    Buka folder tersebut di VS Code (klik kanan > *Open with Code*) atau buka CMD dan masuk ke direktori folder tersebut.

3.  **Install Library (Dependencies)**
    Ketik perintah berikut di terminal dan tekan Enter:
    ```bash
    npm install
    ```
    *Tunggu hingga proses selesai (pastikan ada koneksi internet).*

4.  **Jalankan Aplikasi**
    Setelah install selesai, jalankan aplikasi dengan perintah:
    ```bash
    npm run dev
    ```

5.  **Buka di Browser**
    Terminal akan menampilkan alamat lokal, biasanya:
    `http://localhost:5173`
    Tekan **Ctrl + Klik** pada alamat tersebut atau buka browser dan ketik alamatnya secara manual.

---

### Catatan:
- Jika muncul error "command not found" saat mengetik `npm`, itu tandanya Node.js belum terinstall atau perlu restart komputer.
- File video CCTV tersimpan di folder `public/`. Jika ingin mengganti video, cukup ganti file di folder tersebut dengan nama yang sama.
