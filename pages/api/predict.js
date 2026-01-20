export default function handler(req, res) {
  if (req.method === 'POST') {
    const { age, position, goals, assists, tackles } = req.body;
    
    let score = 0;
    
    if (age < 25) score += 1;
    if (position === 'Delantero' && goals > 10) score += 2;
    if (position === 'Mediocampista' && assists > 8) score += 2;
    if (position === 'Defensa' && tackles > 15) score += 2;
    
    const prediction = score >= 3 ? 'SuperStar' : 'No SuperStar';
    const probability = score >= 3 ? 0.75 : 0.3;
    
    res.status(200).json({ prediction, probability });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
