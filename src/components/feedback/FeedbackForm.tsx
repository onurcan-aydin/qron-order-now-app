
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { Star, StarIcon } from "lucide-react";

interface FeedbackFormProps {
  orderId: string;
  onSubmit: (rating: number, comment: string) => void;
}

export default function FeedbackForm({ orderId, onSubmit }: FeedbackFormProps) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg">
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <StarIcon
              key={index}
              size={32}
              className={`${
                index <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <h3 className="text-xl font-medium mb-2">{t('thank_you')}</h3>
        <p className="text-muted-foreground">
          We appreciate your feedback and will use it to improve our service!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{t('rate_experience')}</h3>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              type="button"
              className="p-1 focus:outline-none"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              <Star
                size={32}
                className={`${
                  index <= (hoverRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium mb-2">
          {t('leave_comment')} (optional)
        </label>
        <Textarea
          id="comment"
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={rating === 0}
      >
        {t('submit')}
      </Button>
    </form>
  );
}
