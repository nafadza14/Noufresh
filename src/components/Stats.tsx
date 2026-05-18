export default function Stats() {
  const stats = [
    { number: '1,000+', label: 'Pengguna Aktif' },
    { number: '4.9/5', label: 'Rating Kepuasan' },
    { number: '90 Hari', label: 'Program Pendampingan' },
    { number: '24/7', label: 'Konsultasi WhatsApp' }
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 group-hover:text-mint-fresh transition-colors">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-gray-400 tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
