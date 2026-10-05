import { Star } from 'lucide-react';
import { REVIEWS } from '../data/products';

export function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C8477] mb-3 font-medium">
          <span>Client Letters</span>
          <span aria-hidden="true">·</span>
          <span>Verified Occasions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#181615] tracking-tight">
          Celebrated Across the World’s Grandest Rooms
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev) => (
          <div 
            key={rev.id}
            className="bg-[#FAF9F5] p-8 border border-[#E8E2D5] flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Occasion */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#D4AF37]" aria-label="5 stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[#8C8477]">{rev.date}</span>
              </div>

              {/* Event Badge */}
              <div className="text-xs uppercase tracking-wider text-[#181615] font-semibold mb-3">
                {rev.event}
              </div>

              {/* Quote */}
              <p className="font-serif text-sm text-[#474139] leading-relaxed italic mb-6">
                &ldquo;{rev.quote}&rdquo;
              </p>
            </div>

            {/* Author Attribution */}
            <div className="pt-4 border-t border-[#EFECE5]">
              <p className="text-xs font-semibold text-[#181615]">{rev.author}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#7A7266] mt-0.5">
                <span>{rev.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#3E3831]">{rev.dress}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
