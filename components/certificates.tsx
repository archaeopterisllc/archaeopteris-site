"use client";

import Image from "next/image";

const certs = [
  {
    firm: "The 5%ers",
    type: "Funded Certificate",
    date: "Jan 2026",
    amount: "$2,500",
    steps: "2-Step",
    image: "https://mahsvcqhwbxsfozflfbu.supabase.co/storage/v1/object/public/certificates/program-achievement-1768392712810.png",
  },
  {
    firm: "Audacity Capital",
    type: "Competition Winner",
    date: "Feb 2026",
    amount: "$120,000",
    steps: "Competition",
    image: "https://mahsvcqhwbxsfozflfbu.supabase.co/storage/v1/object/public/certificates/certificate-1772317504-Audacity%20Capital%20.png",
  },
  {
    firm: "Audacity Capital",
    type: "Funded Trader",
    date: "Apr 2026",
    amount: "$30,000",
    steps: "1-Step",
    image: "https://mahsvcqhwbxsfozflfbu.supabase.co/storage/v1/object/public/certificates/certificate-1776161372.png",
  },
];

export function Certificates() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Certified Trader
          </h2>
          <p className="text-muted-foreground text-lg">
            Verified by leading proprietary trading firms
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 hover:border-primary/50 transition-colors"
            >
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={cert.image}
                  alt={`${cert.firm} ${cert.type}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">{cert.date}</span>
                <h3 className="font-semibold text-foreground">{cert.firm}</h3>
                <p className="text-sm text-muted-foreground">{cert.type}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {cert.amount}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {cert.steps}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
