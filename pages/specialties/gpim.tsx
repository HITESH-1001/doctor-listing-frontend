import Head from 'next/head';
import { useEffect, useState } from 'react';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  consultationFees: number;
  availability: string;
  location: string;
}

interface ApiResponse {
  doctors: Doctor[];
  totalPages: number;
  currentPage: number;
}

export default function GeneralPhysicianPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState<{
    specialty: string;
    experience: string;
    fees: string;
    rating: string;
    page: number;
  }>({
    specialty: '',
    experience: '',
    fees: '',
    rating: '',
    page: 1,
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      const query = new URLSearchParams({
        ...filters,
        page: filters.page.toString(),
        limit: '10',
      }).toString();
      const res = await fetch(`http://localhost:5000/api/list-doctor?${query}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: ApiResponse = await res.json();
      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
    };
    fetchDoctors();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'General Physician Internal Medicine',
    description: 'Find the best general physicians and internal medicine specialists.',
    specialty: 'Internal Medicine',
  };

  return (
    <>
      <Head>
        <title>General Physician & Internal Medicine | Apollo 247 Clone</title>
        <meta
          name="description"
          content="Consult top general physicians and internal medicine specialists online. Filter by experience, fees, and ratings."
        />
        <meta
          name="keywords"
          content="general physician, internal medicine, doctor consultation, online doctor"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="General Physician & Internal Medicine | Apollo 247 Clone" />
        <meta
          property="og:description"
          content="Consult top general physicians and internal medicine specialists online."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-site.com/specialties/general-physician-internal-medicine" />
        <meta property="og:image" content="https://your-site.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="General Physician & Internal Medicine | Apollo 247 Clone" />
        <meta
          name="twitter:description"
          content="Consult top general physicians and internal medicine specialists online."
        />
        <meta name="twitter:image" content="https://your-site.com/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <img src="/logo.png" alt="Apollo 247 Logo" className="h-10" />
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-600">Home</a></li>
                <li><a href="#" className="text-gray-600">Specialties</a></li>
                <li><a href="#" className="text-gray-600">Consult</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 flex">
          <aside className="w-1/4 pr-8">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Specialty</label>
              <select
                name="specialty"
                value={filters.specialty}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">All Specialties</option>
                <option value="General Physician">General Physician</option>
                <option value="Internal Medicine">Internal Medicine</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Experience (Years)</label>
              <select
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Consultation Fees (₹)</label>
              <select
                name="fees"
                value={filters.fees}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                <option value="500">Up to ₹500</option>
                <option value="1000">Up to ₹1000</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Rating</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </aside>

          <section className="w-3/4">
            <h1 className="text-2xl font-bold mb-6">General Physician & Internal Medicine</h1>
            <div className="grid grid-cols-1 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.experience} Years Experience</p>
                  <p className="text-gray-600">Rating: {doctor.rating} / 5</p>
                  <p className="text-gray-600">Fees: ₹{doctor.consultationFees}</p>
                  <p className="text-gray-600">{doctor.availability}</p>
                  <p className="text-gray-600">{doctor.location}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded ${filters.page === page ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}