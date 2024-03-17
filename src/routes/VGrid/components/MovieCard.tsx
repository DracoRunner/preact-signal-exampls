import './style.css';

export type Props = {
  brand: string;
  description: string;
  id: number;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export default ({ thumbnail, title, description }: Props) => (
  <div className="movie-card">
    <img src={thumbnail} alt="movie-thumbnail" />
  </div>
);
