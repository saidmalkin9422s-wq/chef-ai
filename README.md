import { useState } from 'react'

export default function SocialRecipeApp() { const [videoLink, setVideoLink] = useState('') const [loading, setLoading] = useState(false) const [result, setResult] = useState(null) const [error, setError] = useState(null)

const analyzeVideo = async () => { if (!videoLink) return

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

return ( <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6"> <div className="max-w-6xl mx-auto">

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
        className="w-full p-4 rounded-2xl border"
      />

      <button
        onClick={analyzeVideo}
        className="w-full mt-4 bg-orange-500 text-white py-3 rounded-2xl"
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

) }

/* ========================= Backend API Example ضع هذا الملف داخل: /api/analyze.js ========================= */

export async function analyzeHandler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }) }

try { const { url } = req.body

if (!url) {
  return res.status(400).json({ error: 'No URL provided' })
}

// ذكاء اصطناعي تجريبي لتحليل الوصفات
// تقدر لاحقًا تستبدله بـ OpenAI API أو Groq API

const prompt = `حلل فيديو الطبخ التالي واستخرج:
1. اسم الطبخة
2. المكونات
3. الخطوات

رابط الفيديو: ${url}`

console.log(prompt)

// مثال نتيجة AI
const aiRecipe = {
  title: 'شاورما دجاج',
  ingredients: [
    'دجاج',
    'خبز',
    'ثوم',
    'بطاطس'
  ],
  steps: [
    'تتبيل الدجاج',
    'قلي البطاطس',
    'شوي الدجاج',
    'تقديم الشاورما'
  ]
}

return res.status(200).json(aiRecipe)

} catch (error) { return res.status(500).json({ error: 'Server error' }) } }

/* ========================= Vercel Deployment Guide

1. افتح موقع Vercel https://vercel.com


2. سجل دخول بحساب GitHub https://github.com


3. ارفع المشروع إلى GitHub


4. داخل Vercel اضغط: Add New Project


5. اختر المشروع


6. اضغط Deploy



وسيصبح التطبيق شغال برابط مباشر.

========================= Features Added

✔ واجهة احترافية ✔ تحليل روابط ✔ Backend API ✔ تجهيز للنشر ✔ تصميم متجاوب للجوال ✔ دعم TikTok و YouTube ✔ نتائج وصفات ✔ تحميل وانتظار ✔ رسائل أخطاء

========================= Future Features

تسجيل دخول

حفظ الوصفات

تحويل صوتي

ذكاء اصطناعي حقيقي

تحليل فيديوهات تلقائي

استخراج المكونات من الصوت

إعلانات للربح

APK للجوال


*/
