import { Award } from "lucide-react";

const Awards = () => {
  return (
    <div>
      
      {/* Awards & Recognition */}
      <section className="py-16 bg-[#1A365D] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Award-Winning Excellence</h2>
            <p className="text-gray-300 text-lg">Recognition for our outstanding service and facilities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Best Luxury Hotel', year: '2024', org: 'Travel Excellence Awards' },
              { title: 'Outstanding Service', year: '2024', org: 'Hospitality World' },
              { title: 'Top Spa Destination', year: '2023', org: 'Wellness Travel' },
              { title: 'Culinary Excellence', year: '2023', org: 'Fine Dining Guide' }
            ].map((award, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#C9A55C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-[#C9A55C] font-medium">{award.year}</p>
                <p className="text-gray-300 text-sm">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Awards
