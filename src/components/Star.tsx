interface IProps {
  ratings: number;
}

const Star = ({ ratings }: IProps) => {
  if (!ratings) return null;
  return (
    <div className="flex items-center">
      <span className="text-yellow-500">
        {"★".repeat(Math.round(ratings))}
        {"☆".repeat(5 - Math.round(ratings))}
      </span>
      <span className="ml-2 text-gray-600">({ratings})</span>
    </div>
  );
};

export default Star;
