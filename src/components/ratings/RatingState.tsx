import { getRatingStats } from '../../utils/rating'

type Props = {
  reviews: { rating: number }[]
}

const RatingStats = ({ reviews }: Props) => {
  const { average, distribution, total } = getRatingStats(reviews)

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Average Rating</h2>
      <div className="text-2xl font-bold">{average} ⭐ ({total} reviews)</div>

      <div className="space-y-1">
        {Object.entries(distribution).reverse().map(([stars, count]) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-12">{stars}⭐</span>
            <progress
              value={count}
              max={total}
              className="flex-1 appearance-none h-3 [&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-value]:bg-yellow-400"
            />
            <span className="w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatingStats
