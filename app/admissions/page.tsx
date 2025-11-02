export default function Admissions() {
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Admissions</h1>
      <p className="mt-4 text-lg text-gray-600">
        Join our learning community and unlock your child's potential.
      </p>
      <div className="mt-8 space-y-4 max-w-2xl">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-lg">Submit Application</h3>
              <p className="mt-2 text-gray-600">
                Fill out the online application form with required documents.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-lg">Entrance Interaction</h3>
              <p className="mt-2 text-gray-600">
                Attend the scheduled interaction and document verification.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-lg">Fee Submission</h3>
              <p className="mt-2 text-gray-600">
                Complete fee payment and onboarding formalities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
