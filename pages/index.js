import { useState } from 'react'

export default function Home() {
  const [videoLink, setVideoLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyzeVideo = async () => {
    if (!videoLink) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: videoLink })
      })

      if (!res.ok) {
        throw new Error('فشل تحليل الفيديو')
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('صار خطأ أثناء التحليل، تأكد من الرابط أو حاول مرة ثانية')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold">🍳 Chef AI</h1>
          <p className="text-gray-600 mt-2">حوّل أي فيديو طبخ إلى وصفة حقيقية باستخدام الذكاء الاصطناعي</p>
        </div>

        {/* Input */}
        <div className="bg-white shadow-xl rounded-3xl p-6 mb-8">
          <input
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="ضع رابط تيك توك أو يوتيوب"
            className="w-full p-4 rounded-2xl border border-gray-300"
          />

          <button
            onClick={analyzeVideo}
            disabled={loading}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-2xl font-bold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'جاري التحليل...' : 'تحليل الفيديو'}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🍽️ النتيجة</h2>

            <p className="mb-2"><b>الطبخة:</b> {result.title}</p>

            <h3 className="font-bold mt-4">المكونات:</h3>
            <ul className="list-disc pr-5">
              {result.ingredients?.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <h3 className="font-bold mt-4">الخطوات:</h3>
            <ol className="list-decimal pr-5">
              {result.steps?.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
