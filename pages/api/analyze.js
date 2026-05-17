export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'No URL provided' })
    }

    // AI Recipe Analysis Example
    const aiRecipe = {
      title: 'شاورما دجاج',
      ingredients: [
        'دجاج مقطع إلى شرائح',
        'خبز شاورما',
        'ثوم مهروس',
        'بطاطس مقلية',
        'طماطم',
        'خيار',
        'صلصة الثوم',
        'ملح وفلفل'
      ],
      steps: [
        'تتبيل الدجاج بالملح والفلفل والثوم',
        'ترك الدجاج للتتبيل لمدة 30 دقيقة',
        'قلي البطاطس حتى تصبح ذهبية اللون',
        'شوي الدجاج على النار العالية',
        'تسخين الخبز',
        'وضع الدجاج المشوي في الخبز',
        'إضافة البطاطس والخضار',
        'إضافة صلصة الثوم',
        'لف الشاورما بإحكام',
        'تقديم الشاورما ساخنة'
      ]
    }

    return res.status(200).json(aiRecipe)

  } catch (error) {
    return res.status(500).json({ error: 'Server error' })
  }
}
