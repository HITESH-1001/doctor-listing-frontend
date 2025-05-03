// import Head from 'next/head';
// import { useEffect, useState } from 'react';

// interface Doctor {
//     _id: string;
//     name: string;
//     specialty: string;
//     experience: number;
//     rating: number;
//     consultationFees: number;
//     availability: string;
//     location: string;
// }

// interface ApiResponse {
//     doctors: Doctor[];
//     totalPages: number;
//     currentPage: number;
// }

// export default function GeneralPhysicianPage() {
//     const [doctors, setDoctors] = useState<Doctor[]>([]);
//     const [filters, setFilters] = useState<{
//         specialty: string;
//         experience: string;
//         fees: string;
//         rating: string;
//         page: number;
//     }>({
//         specialty: '',
//         experience: '',
//         fees: '',
//         rating: '',
//         page: 1,
//     });
//     const [totalPages, setTotalPages] = useState<number>(1);

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 const query = new URLSearchParams({
//                     ...filters,
//                     page: filters.page.toString(),
//                     limit: '10',
//                 }).toString();
//                 const res = await fetch(`http://localhost:5000/api/list-doctor?${query}`);
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const data: ApiResponse = await res.json();
//                 console.log('API Response:', data);
//                 if (!data.doctors) {
//                     console.error('No doctors found in response:', data);
//                     setDoctors([]);
//                     setTotalPages(1);
//                     return;
//                 }
//                 setDoctors(data.doctors);
//                 setTotalPages(data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//                 setDoctors([]);
//                 setTotalPages(1);
//             }
//         };
//         fetchDoctors();
//     }, [filters]);

//     const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
//     };

//     const handlePageChange = (newPage: number) => {
//         setFilters((prev) => ({ ...prev, page: newPage }));
//     };

//     const schemaData = {
//         '@context': 'https://schema.org',
//         '@type': 'Physician',
//         name: 'General Physician Internal Medicine',
//         description: 'Find the best general physicians and internal medicine specialists.',
//         specialty: 'Internal Medicine',
//     };

//     return (
//         <>
//             <Head>
//                 <title>General Physician & Internal Medicine | Apollo 247 Clone</title>
//                 <meta
//                     name="description"
//                     content="Consult top general physicians and internal medicine specialists online. Filter by experience, fees, and ratings."
//                 />
//                 <meta
//                     name="keywords"
//                     content="general physician, internal medicine, doctor consultation, online doctor"
//                 />
//                 <meta name="robots" content="index, follow" />
//                 <meta property="og:title" content="General Physician & Internal Medicine | Apollo 247 Clone" />
//                 <meta
//                     property="og:description"
//                     content="Consult top general physicians and internal medicine specialists online."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://www.apollo247.com/specialties/general-physician-internal-medicine" />
//                 <meta property="og:image" content="https://www.apollo247.com/og-image.jpg" />
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="General Physician & Internal Medicine | Apollo 247 Clone" />
//                 <meta
//                     name="twitter:description"
//                     content="Consult top general physicians and internal medicine specialists online."
//                 />
//                 <meta name="twitter:image" content="https://www.apollo247.com/og-image.jpg" />
//                 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
//             </Head>

//             <div className="min-h-screen bg-gray-100">
//                 {/* Header */}
//                 <header className="bg-white shadow">
//                     <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//                         <img src="/apollo247.svg" alt="Apollo 247 Logo" className="h-10" />
//                         <div className="flex-1 max-w-xl mx-4">
//                             <input
//                                 type="text"
//                                 placeholder="Search for doctors, specialties..."
//                                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <nav>
//                             <ul className="flex space-x-4">
//                                 <li><a href="#" className="text-gray-600 hover:text-blue-500">Medicines</a></li>
//                                 <li><a href="#" className="text-gray-600 hover:text-blue-500">Consult Doctors</a></li>
//                                 <li><a href="#" className="text-gray-600 hover:text-blue-500">Lab Tests</a></li>
//                                 <li><a href="#" className="text-gray-600 hover:text-blue-500">Login/Signup</a></li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </header>

//                 {/* Hero Section */}
//                 <section className="bg-blue-50 py-10">
//                     <div className="max-w-7xl mx-auto px-4 flex items-center">
//                         <div className="w-1/2">
//                             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                                 General Physician & Internal Medicine
//                             </h1>
//                             <p className="text-gray-600 mb-4">
//                                 Consult top general physicians and internal medicine specialists online for your healthcare needs.
//                             </p>
//                             <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
//                                 Consult Now
//                             </button>
//                         </div>
//                         {/* <div className="w-1/2">
//                             <div className="h-48 bg-gray-300 rounded-lg flex items-center justify-center">
//                                 <span className="text-gray-500">[Placeholder Image]</span>
//                             </div>
//                         </div> */}
//                     </div>
//                 </section>

//                 {/* Main Content */}
//                 <main className="max-w-7xl mx-auto px-4 py-8 flex">
//                     {/* Filters */}
//                     <aside className="w-1/4 pr-8">
//                         <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
//                             <select
//                                 name="specialty"
//                                 value={filters.specialty}
//                                 onChange={handleFilterChange}
//                                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">All Specialties</option>
//                                 <option value="General Physician">General Physician</option>
//                                 <option value="Internal Medicine">Internal Medicine</option>
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
//                             <select
//                                 name="experience"
//                                 value={filters.experience}
//                                 onChange={handleFilterChange}
//                                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Any</option>
//                                 <option value="5">5+ Years</option>
//                                 <option value="10">10+ Years</option>
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fees (₹)</label>
//                             <select
//                                 name="fees"
//                                 value={filters.fees}
//                                 onChange={handleFilterChange}
//                                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Any</option>
//                                 <option value="500">Up to ₹500</option>
//                                 <option value="1000">Up to ₹1000</option>
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
//                             <select
//                                 name="rating"
//                                 value={filters.rating}
//                                 onChange={handleFilterChange}
//                                 className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Any</option>
//                                 <option value="4">4+ Stars</option>
//                                 <option value="4.5">4.5+ Stars</option>
//                             </select>
//                         </div>
//                     </aside>

//                     {/* Doctor Listing */}
//                     <section className="w-3/4">
//                         <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Doctors</h2>
//                         <div className="grid grid-cols-1 gap-6">
//                             {Array.isArray(doctors) && doctors.length > 0 ? (
//                                 doctors.map((doctor) => (
//                                     <div key={doctor._id} className="bg-white p-4 rounded-lg shadow flex items-center">
//                                         {/* <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
//                                             <span className="text-gray-500 text-sm">[Profile]</span>
//                                         </div> */}
//                                         <div className="flex-1">
//                                             <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//                                             <p className="text-gray-600">{doctor.specialty}</p>
//                                             <p className="text-gray-600">{doctor.experience} Years Experience</p>
//                                             <p className="text-gray-600">Rating: {doctor.rating} / 5</p>
//                                             <p className="text-gray-600">Fees: ₹{doctor.consultationFees}</p>
//                                             <p className="text-gray-600">{doctor.availability}</p>
//                                             <p className="text-gray-600">{doctor.location}</p>
//                                         </div>
//                                         <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//                                             Consult Now
//                                         </button>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600">No doctors found.</p>
//                             )}
//                         </div>

//                         {/* Pagination */}
//                         <div className="mt-6 flex justify-center space-x-2">
//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                                 <button
//                                     key={page}
//                                     onClick={() => handlePageChange(page)}
//                                     className={`px-4 py-2 border rounded-lg ${filters.page === page
//                                         ? 'bg-blue-500 text-white'
//                                         : 'bg-white text-gray-600 hover:bg-gray-100'
//                                         }`}
//                                 >
//                                     {page}
//                                 </button>
//                             ))}
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </>
//     );
// }


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
            try {
                const query = new URLSearchParams({
                    ...filters,
                    page: filters.page.toString(),
                    limit: '10',
                }).toString();
                const res = await fetch(`https://doctor-listing-backend-4e3a.onrender.com/api/list-doctor?${query}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: ApiResponse = await res.json();
                console.log('API Response:', data);
                if (!data.doctors) {
                    console.error('No doctors found in response:', data);
                    setDoctors([]);
                    setTotalPages(1);
                    return;
                }
                setDoctors(data.doctors);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setDoctors([]);
                setTotalPages(1);
            }
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
                <meta property="og:url" content="https://www.apollo247.com/specialties/general-physician-internal-medicine" />
                <meta property="og:image" content="https://www.apollo247.com/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="General Physician & Internal Medicine | Apollo 247 Clone" />
                <meta
                    name="twitter:description"
                    content="Consult top general physicians and internal medicine specialists online."
                />
                <meta name="twitter:image" content="https://www.apollo247.com/og-image.jpg" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <img src="/apollo247.svg" alt="Apollo 247 Logo" className="h-10" />
                        <div className="flex-1 max-w-xl mx-4">
                            <input
                                type="text"
                                placeholder="Search for doctors, specialties..."
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <nav>
                            <ul className="flex space-x-4">
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Medicines</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Consult Doctors</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Lab Tests</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Login/Signup</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-blue-50 py-10">
                    <div className="max-w-7xl mx-auto px-4 flex items-center">
                        <div className="w-1/2">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                General Physician & Internal Medicine
                            </h1>
                            <p className="text-gray-600 mb-4">
                                Consult top general physicians and internal medicine specialists online for your healthcare needs.
                            </p>
                            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                                Consult Now
                            </button>
                        </div>
                        <div className="w-1/2">
                            {/* <div className="h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">[Placeholder Image]</span>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 py-8 flex">
                    {/* Filters */}
                    <aside className="w-1/4 pr-8">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                            <select
                                name="specialty"
                                value={filters.specialty}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Specialties</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Internal Medicine">Internal Medicine</option>
                                <option value="Family Medicine">Family Medicine</option>
                                <option value="Emergency Medicine">Emergency Medicine</option>
                                <option value="Geriatric Medicine">Geriatric Medicine</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                            <select
                                name="experience"
                                value={filters.experience}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Any</option>
                                <option value="1">1+ Years</option>
                                <option value="3">3+ Years</option>
                                <option value="5">5+ Years</option>
                                <option value="10">10+ Years</option>
                                <option value="15">15+ Years</option>
                                <option value="20">20+ Years</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fees (₹)</label>
                            <select
                                name="fees"
                                value={filters.fees}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Any</option>
                                <option value="300">Up to ₹300</option>
                                <option value="500">Up to ₹500</option>
                                <option value="800">Up to ₹800</option>
                                <option value="1000">Up to ₹1000</option>
                                <option value="1500">Up to ₹1500</option>
                                <option value="2000">Up to ₹2000</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Any</option>
                                <option value="3">3+ Stars</option>
                                <option value="3.5">3.5+ Stars</option>
                                <option value="4">4+ Stars</option>
                                <option value="4.5">4.5+ Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                    </aside>

                    {/* Doctor Listing */}
                    <section className="w-3/4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Doctors</h2>
                        <div className="grid grid-cols-1 gap-6">
                            {Array.isArray(doctors) && doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <div key={doctor._id} className="bg-white p-4 rounded-lg shadow flex items-center">
                                        {/* <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">[Profile]</span>
                                        </div> */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                                            <p className="text-gray-600">{doctor.specialty}</p>
                                            <p className="text-gray-600">{doctor.experience} Years Experience</p>
                                            <p className="text-gray-600">Rating: {doctor.rating} / 5</p>
                                            <p className="text-gray-600">Fees: ₹{doctor.consultationFees}</p>
                                            <p className="text-gray-600">{doctor.availability}</p>
                                            <p className="text-gray-600">{doctor.location}</p>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                            Consult Now
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No doctors found.</p>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 border rounded-lg ${filters.page === page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100'
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