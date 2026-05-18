import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';

interface LocationItem {
  id: string;
  name: string;
}

interface AddressFormProps {
  onAddressChange: (address: any) => void;
}

const SearchableSelect = ({ 
  label, 
  placeholder, 
  options, 
  value, 
  onChange, 
  disabled = false,
  loading = false
}: { 
  label: string; 
  placeholder: string; 
  options: LocationItem[]; 
  value: string; 
  onChange: (id: string, name: string) => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">{label}</label>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 flex items-center justify-between cursor-pointer transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-mint-fresh focus-within:ring-2 focus-within:ring-mint-fresh'}`}
      >
        <span className={selectedOption ? 'text-gray-900 font-medium' : 'text-gray-400 font-medium'}>
          {loading ? 'Memuat...' : selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && !disabled && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Cari..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-mint-fresh"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => {
                    onChange(opt.id, opt.name);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="px-5 py-3 hover:bg-mint-fresh/5 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-mint-fresh/40" />
                  <span className="text-sm font-medium text-gray-700">{opt.name}</span>
                </div>
              ))
            ) : (
              <div className="px-5 py-4 text-sm text-gray-400 text-center">Data tidak ditemukan</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AddressForm({ onAddressChange }: AddressFormProps) {
  const [formData, setFormData] = useState({
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    districtId: '',
    districtName: '',
    villageId: '',
    villageName: '',
    postalCode: '',
    streetAddress: '',
    additionalDetails: ''
  });

  const [provinces, setProvinces] = useState<LocationItem[]>([]);
  const [cities, setCities] = useState<LocationItem[]>([]);
  const [districts, setDistricts] = useState<LocationItem[]>([]);
  const [villages, setVillages] = useState<LocationItem[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  useEffect(() => {
    setLoadingProvinces(true);
    fetch('/api/wilayah/provinces.json')
      .then(res => res.json())
      .then(data => {
        setProvinces(data.data.map((p: any) => ({ id: p.code, name: p.name })));
        setLoadingProvinces(false);
      })
      .catch(() => setLoadingProvinces(false));
  }, []);

  useEffect(() => {
    if (formData.provinceId) {
      setLoadingCities(true);
      fetch(`/api/wilayah/regencies/${formData.provinceId}.json`)
        .then(res => res.json())
        .then(data => {
          setCities(data.data.map((c: any) => ({ id: c.code, name: c.name })));
          setLoadingCities(false);
        })
        .catch(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [formData.provinceId]);

  useEffect(() => {
    if (formData.cityId) {
      setLoadingDistricts(true);
      fetch(`/api/wilayah/districts/${formData.cityId}.json`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data.data.map((d: any) => ({ id: d.code, name: d.name })));
          setLoadingDistricts(false);
        })
        .catch(() => setLoadingDistricts(false));
    } else {
      setDistricts([]);
    }
  }, [formData.cityId]);

  useEffect(() => {
    if (formData.districtId) {
      setLoadingVillages(true);
      fetch(`/api/wilayah/villages/${formData.districtId}.json`)
        .then(res => res.json())
        .then(data => {
          setVillages(data.data.map((v: any) => ({ id: v.code, name: v.name })));
          setLoadingVillages(false);
        })
        .catch(() => setLoadingVillages(false));
    } else {
      setVillages([]);
    }
  }, [formData.districtId]);

  useEffect(() => {
    if (formData.villageName && formData.districtName) {
      fetch(`https://kodepos.vercel.app/search?q=${encodeURIComponent(formData.villageName)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.data && data.data.length > 0) {
            // Find an exact match by village and district, or just use the first result
            const match = data.data.find((item: any) => 
              item.village.toLowerCase() === formData.villageName.toLowerCase() &&
              item.district.toLowerCase() === formData.districtName.toLowerCase()
            ) || data.data[0];
            
            if (match && match.code) {
              handleUpdate({ postalCode: match.code.toString() });
            }
          }
        })
        .catch(err => console.error("Failed to fetch postal code", err));
    }
  }, [formData.villageName, formData.districtName]);

  const handleUpdate = (updates: Partial<typeof formData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    onAddressChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <SearchableSelect 
          label="Provinsi" 
          placeholder="Pilih Provinsi" 
          options={provinces}
          value={formData.provinceId}
          loading={loadingProvinces}
          onChange={(id, name) => handleUpdate({ 
            provinceId: id, provinceName: name, 
            cityId: '', cityName: '', 
            districtId: '', districtName: '', 
            villageId: '', villageName: '' 
          })}
        />
        <SearchableSelect 
          label="Kota / Kabupaten" 
          placeholder="Pilih Kota/Kabupaten" 
          options={cities}
          value={formData.cityId}
          disabled={!formData.provinceId}
          loading={loadingCities}
          onChange={(id, name) => handleUpdate({ 
            cityId: id, cityName: name, 
            districtId: '', districtName: '', 
            villageId: '', villageName: '' 
          })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SearchableSelect 
          label="Kecamatan" 
          placeholder="Pilih Kecamatan" 
          options={districts}
          value={formData.districtId}
          disabled={!formData.cityId}
          loading={loadingDistricts}
          onChange={(id, name) => handleUpdate({ 
            districtId: id, districtName: name, 
            villageId: '', villageName: '' 
          })}
        />
        <SearchableSelect 
          label="Desa / Kelurahan" 
          placeholder="Pilih Desa" 
          options={villages}
          value={formData.villageId}
          disabled={!formData.districtId}
          loading={loadingVillages}
          onChange={(id, name) => handleUpdate({ 
            villageId: id, villageName: name 
          })}
        />
      </div>

      <div>
        <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Kode Pos</label>
        <input 
          type="text" 
          placeholder="Contoh: 12810"
          value={formData.postalCode}
          onChange={(e) => handleUpdate({ postalCode: e.target.value })}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" 
        />
      </div>

      <div>
        <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Nama Jalan, Gedung, No. Rumah</label>
        <textarea 
          rows={2} 
          placeholder="Jl. Raya No. 123, Gedung A, Lantai 2"
          value={formData.streetAddress}
          onChange={(e) => handleUpdate({ streetAddress: e.target.value })}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all resize-none" 
        />
      </div>

      <div>
        <label className="block text-xs font-black text-gray-400 tracking-widest mb-2">Detail Lainnya (Blok / Unit No., Patokan)</label>
        <input 
          type="text" 
          placeholder="Blok C No. 5, Samping Indomaret"
          value={formData.additionalDetails}
          onChange={(e) => handleUpdate({ additionalDetails: e.target.value })}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-mint-fresh transition-all" 
        />
      </div>
    </div>
  );
}
