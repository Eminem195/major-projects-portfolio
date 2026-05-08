import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const escapePdfString = (text) => text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const buildReceiptPdf = (booking, paymentMethod) => {
  const lines = [
    "Booking Receipt",
    `Booking ID: ${booking.bookingId}`,
    `Guest: ${booking.fullName}`,
    `Property: ${booking.property.title}`,
    `Location: ${booking.property.location}`,
    `Check-in: ${booking.checkIn}`,
    `Check-out: ${booking.checkOut}`,
    `Nights: ${booking.nights}`,
    `Total: ₹${booking.total.toLocaleString()}`,
    `Payment: ${paymentMethod}`,
  ];

  const contentLines = [
    "BT",
    "/F1 24 Tf",
    "72 740 Td",
    `(${escapePdfString(lines[0])}) Tj`,
    "0 -32 Td",
    "/F1 12 Tf",
    ...lines.slice(1).flatMap((line) => [`(${escapePdfString(line)}) Tj`, "0 -20 Td"]),
    "ET",
  ];

  const content = contentLines.join("\n");
  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  const obj3 =
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`;
  const obj4 = `4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`;
  const obj5 = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const pdfParts = ["%PDF-1.4\n", obj1, obj2, obj3, obj4, obj5];
  const encoder = new TextEncoder();
  const offsets = [];
  let currentOffset = 0;
  for (const part of pdfParts) {
    offsets.push(currentOffset);
    currentOffset += encoder.encode(part).length;
  }

  const xrefLines = [
    "xref",
    `0 ${pdfParts.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.map((offset) => `${offset.toString().padStart(10, "0")} 00000 n `),
  ];

  const trailer = [
    "trailer",
    `<< /Size ${pdfParts.length + 1} /Root 1 0 R >>`,
    "startxref",
    `${currentOffset}`,
    "%%EOF",
  ];

  return new Blob([...pdfParts, xrefLines.join("\n") + "\n", trailer.join("\n")], {
    type: "application/pdf",
  });
};

const Confirmation = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const paymentMethod = location.state?.paymentMethod || "Card";

  const progressSteps = useMemo(
    () => [
      { id: "Pending", label: "Pending" },
      { id: "Confirmed", label: "Confirmed" },
      { id: "Checked In", label: "Checked In" },
      { id: "Completed", label: "Completed" },
    ],
    []
  );

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">No confirmation available</h1>
          <p className="mt-4 text-slate-600">Please complete a booking first and return to the payment page.</p>
          <Link
            to="/booking"
            className="mt-8 inline-flex rounded-2xl bg-cyan-600 px-6 py-3 text-white shadow-lg hover:bg-cyan-700"
          >
            Start booking
          </Link>
        </div>
      </div>
    );
  }

  const bookingStateIndex = progressSteps.findIndex(
    (step) => step.id === (booking.progress || "Confirmed")
  );

  const handleDownloadReceipt = () => {
    const blob = buildReceiptPdf(booking, paymentMethod);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `receipt-${booking.bookingId}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200 text-center">
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-5xl text-emerald-700 shadow-inner">
            ✓
          </div>
          <h1 className="text-4xl font-bold text-slate-900">Booking confirmed!</h1>
          <p className="mt-3 text-slate-600">Your reservation is complete and your room has been secured.</p>
          <p className="mt-4 text-slate-500">Booking ID: <span className="font-semibold text-slate-900">#{booking.bookingId}</span></p>
          <button
            onClick={handleDownloadReceipt}
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
          >
            Download receipt (PDF)
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Booking details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Guest</p>
                <p className="mt-2 font-semibold text-slate-900">{booking.fullName}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Property</p>
                <p className="mt-2 font-semibold text-slate-900">{booking.property.title}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Check-in</p>
                <p className="mt-2 font-semibold text-slate-900">{booking.checkIn}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Check-out</p>
                <p className="mt-2 font-semibold text-slate-900">{booking.checkOut}</p>
              </div>
            </div>
            <div className="mt-4 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Payment method</p>
              <p className="mt-2 font-semibold text-slate-900">{paymentMethod}</p>
            </div>
          </section>

          <aside className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Booking timeline</h2>
            <div className="mt-8 space-y-6">
              {progressSteps.map((step, index) => {
                const isComplete = index <= bookingStateIndex;
                return (
                  <div key={step.id} className="flex items-start gap-4">
                    <div
                      className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                        isComplete ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{step.label}</p>
                      <p className="text-sm text-slate-500">
                        {isComplete ? "Completed" : "Waiting for next stage"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
