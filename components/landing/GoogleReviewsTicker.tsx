import { Star } from "lucide-react";

type Review = {
  name: string;
  role: string;
  text: string;
};

export function GoogleReviewsTicker({ reviews }: { reviews: readonly Review[] }) {
  const loopReviews = [...reviews, ...reviews];

  return (
    <div className="google-reviews mt-10 lg:mt-12" aria-label="Depoimentos do Google">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-vm-cyan-deep">
            Google Reviews
          </span>
          <h3 className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-[0] text-vm-ink">
            Depoimentos de clientes
          </h3>
        </div>
        <div className="hidden items-center gap-1 text-vm-cyan-deep sm:flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={16} fill="currentColor" strokeWidth={1.8} />
          ))}
        </div>
      </div>

      <div className="google-reviews__viewport">
        <div className="google-reviews__track">
          {loopReviews.map((review, index) => (
            <article className="google-review-card" key={`${review.name}-${index}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
                <div className="google-review-card__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" strokeWidth={1.8} />
                  ))}
                </div>
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
