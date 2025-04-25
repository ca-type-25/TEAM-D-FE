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

      <div className="space-y-2">
        {Object.entries(distribution).reverse().map(([stars, count]) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-12">{stars}⭐</span>
            <div className="w-full bg-gray-100 h-3 rounded">
              <div
                className="bg-yellow-400 h-3 rounded"
                style={{ width: `${(count / total) * 100}%` }}
              ></div>
            </div>
            <span className="w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatingStats