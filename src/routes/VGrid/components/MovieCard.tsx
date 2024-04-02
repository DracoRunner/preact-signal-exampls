import './style.css';

export type Props = {
  id: number;
  title: string;
  itemHeight: number;
  itemWidth: number;
  width: number;
};

export default ({ title, itemHeight, itemWidth, id, ...props }: Props) => {
  const thumbnail = `https://picsum.photos/${itemWidth}/${itemHeight}?random=${id}`;

  return (
    <div className="movie-card" height={itemHeight} width={itemWidth}>
      <img src={thumbnail} alt="movie-thumbnail" defer height={itemHeight} width={itemWidth} />
    </div>
  );
};
