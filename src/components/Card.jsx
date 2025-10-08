function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

export default Card;
