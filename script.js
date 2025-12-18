document.addEventListener('DOMContentLoaded', function () {
    // Ambil teks tanggal lahir dari HTML (contoh: "23 juni 2006")
    const dobElement = document.getElementById('dob');
    const dobText = dobElement.textContent.trim(); // "23 juni 2006"

    // Fungsi untuk mengubah nama bulan Indonesia ke indeks (0-11)
    function parseIndonesianDate(dateString) {
        const months = [
            'januari', 'februari', 'maret', 'april', 'mei', 'juni',
            'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
        ];

        // Membersihkan string selain huruf dan angka bisa membantu jika format tidak baku
        // Tapi untuk split spasi sederhana:
        const parts = dateString.split(' '); // ["23", "juni", "2006"]

        if (parts.length < 3) return new Date(); // Fallback ke sekarang jika format salah

        const day = parseInt(parts[0]);
        // Ambil bagian bulan, ubah ke lower case
        const monthName = parts[1].toLowerCase();
        const year = parseInt(parts[2]);

        const monthIndex = months.indexOf(monthName);

        if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
            return new Date(year, monthIndex, day);
        }
        return new Date(); // Fallback
    }

    const birthDate = parseIndonesianDate(dobText);

    function calculateAge(dob) {
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    const ageElement = document.getElementById('age');
    const age = calculateAge(birthDate);

    // Animasi angka usia
    let currentCount = 0;
    // Jika usia nyata adalah 19, animasi berjalan dari 0 sampai 19
    const interval = setInterval(() => {
        if (currentCount >= age) {
            clearInterval(interval);
            ageElement.textContent = age + " Tahun";
        } else {
            currentCount++;
            ageElement.textContent = currentCount;
        }
    }, 50);

    // Interaktifitas Tombol Sapa
    const greetBtn = document.getElementById('greet-btn');
    if (greetBtn) {
        greetBtn.addEventListener('click', function () {
            alert("Halo! Terima kasih sudah mampir ke profil saya. Senang berkenalan dengan Anda!");
            this.textContent = "Terima Kasih! 😊";
            this.style.background = "linear-gradient(to right, #11998e, #38ef7d)";
        });
    }

    // Efek hover tambahan pada info card
    const infoGroups = document.querySelectorAll('.info-group');
    infoGroups.forEach(group => {
        group.addEventListener('mouseenter', () => {
            group.style.transform = "translateX(5px)";
            group.style.transition = "transform 0.2s";
        });
        group.addEventListener('mouseleave', () => {
            group.style.transform = "translateX(0)";
        });
    });
});
