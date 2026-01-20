import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    age: "",
    position: "Delantero",
    goals: "",
    assists: "",
    tackles: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: Number(formData.age),
        position: formData.position,
        goals: Number(formData.goals),
        assists: Number(formData.assists),
        tackles: Number(formData.tackles)
      })
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Predicción de Futuras Estrellas ⚽</h1>

      <form onSubmit={handleSubmit}>
        <input name="age" placeholder="Edad" onChange={handleChange} /><br /><br />

        <select name="position" onChange={handleChange}>
          <option>Delantero</option>
          <option>Mediocampista</option>
          <option>Defensa</option>
        </select><br /><br />

        <input name="goals" placeholder="Goles" onChange={handleChange} /><br /><br />
        <input name="assists" placeholder="Asistencias" onChange={handleChange} /><br /><br />
        <input name="tackles" placeholder="Entradas" onChange={handleChange} /><br /><br />

        <button type="submit">Predecir</button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Resultado</h2>
          <p><b>Predicción:</b> {result.prediction}</p>
          <p><b>Probabilidad:</b> {(result.probability * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
