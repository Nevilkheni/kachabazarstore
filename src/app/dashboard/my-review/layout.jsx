import MyReview from './page';

export default function MyReviewLayout({ children }) {
  return (
    <div>
      <MyReview />
      {children}
    </div>
  );
}