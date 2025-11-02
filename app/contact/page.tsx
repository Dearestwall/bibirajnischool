export default function Contact() {
  return (
    <section className="wrap section">
      <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
      <div className="mt-8 max-w-xl space-y-4">
        <div className="p-6 rounded-xl border bg-white">
          <h3 className="font-semibold">Address</h3>
          <p className="mt-2 text-gray-600">
            Bibi Rajni School<br />
            [Your Address]<br />
            Punjab, India
          </p>
        </div>
        <div className="p-6 rounded-xl border bg-white">
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 space-y-2">
            <a href="tel:+911234567890" className="btn w-full">
              📞 Call Us
            </a>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              className="btn w-full"
            >
              💬 WhatsApp
            </a>
            <a href="mailto:info@school.example" className="btn w-full">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
