import type { FaqItem } from "@/lib/page-content";

type FaqSectionProps = {
  faqs: FaqItem[];
  title?: string;
};

export function FaqSection({ faqs, title = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <section className="pulse-detail">
      <h2>{title}</h2>
      <div className="pulse-faq-list">
        {faqs.map((faq) => (
          <details key={faq.question} className="pulse-faq-item">
            <summary>
              <h3>{faq.question}</h3>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
